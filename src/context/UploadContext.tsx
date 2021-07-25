import { createContext, useCallback, useContext, useState } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

export type UploadedFile = {
	file: File;
	id: string;
	name: string;
	readableSize: string;
	preview: string;
	progress: number;
	uploaded: boolean;
	error: boolean;
	url?: string;
};

type Props = {
	children: React.ReactNode;
};

type UploadContextData = {
	teste: string;
	handleUpload: (file: File[]) => void;
	uploadedFiles: UploadedFile[];
	updateFileProgress: (id: string, progress: number) => void;
	uploadedComplete: (id: string, url: string) => void;
	setError: (id: string) => void;
};

const UploadContext = createContext({} as UploadContextData);

const UploadProvider = ({ children }: Props) => {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

	const handleUpload = useCallback(
		(files: File[]) => {
			const currentUplodedFiles: any = files.map(file => ({
				file, // -- this is the uploadedFile.file in processUpload
				id: uniqueId(),
				name: file.name,
				readableSize: filesize(file.size),
				preview: URL.createObjectURL(file), // -- create a preview even before the upload is completed
				progress: 0,
				uploaded: false,
				error: false,

				url: null, // -- url to access the link of the image
			}));

			setUploadedFiles([...uploadedFiles, ...currentUplodedFiles]);
		},
		[uploadedFiles]
	);

	const updateFileProgress = useCallback((id: string, progress: number) => {
		setUploadedFiles(uploadedFiles =>
			uploadedFiles.map(uploadedFile => {
				return id === uploadedFile.id ? { ...uploadedFile, progress } : uploadedFile;
			})
		);
	}, []);

	const uploadedComplete = useCallback((id: string, url: string) => {
		setUploadedFiles(uploadedFiles =>
			uploadedFiles.map(uploadedFile => {
				return id === uploadedFile.id
					? { ...uploadedFile, ...{ url, uploaded: true } }
					: uploadedFile;
			})
		);
	}, []);

	const setError = useCallback((id: string) => {
		setUploadedFiles(uploadedFiles =>
			uploadedFiles.map(uploadedFile => {
				return id === uploadedFile.id ? { ...uploadedFile, error: true } : uploadedFile;
			})
		);
	}, []);

	const qqCoisa = 'ohyw';
	return (
		<UploadContext.Provider
			value={{
				setError,
				uploadedComplete,
				updateFileProgress,
				teste: qqCoisa,
				handleUpload,
				uploadedFiles,
			}}
		>
			{children}
		</UploadContext.Provider>
	);
};

const useUpload = () => useContext(UploadContext);

export { UploadProvider, useUpload };
