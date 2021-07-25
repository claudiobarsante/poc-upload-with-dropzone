import Upload from '../upload';
import FileList from '../file-list';
import * as S from './styles';
import apiClient from '../../api/apiClient';

import { useUpload, UploadedFile } from '../../context/UploadContext';

const Main = () => {
	const { setError, handleUpload, uploadedFiles, updateFileProgress, uploadedComplete } =
		useUpload();

	// const handleUpload = (files: File[]) => {
	// 	const currentUplodedFiles: any = files.map(file => ({
	// 		file, // -- this is the uploadedFile.file in processUpload
	// 		id: uniqueId(),
	// 		name: file.name,
	// 		readableSize: filesize(file.size),
	// 		preview: URL.createObjectURL(file), // -- create a preview even before the upload is completed
	// 		progress: 0,
	// 		uploaded: false,
	// 		error: false,

	// 		url: null, // -- url to access the link of the image
	// 	}));

	// 	setUploadedFiles([...uploadedFiles, ...currentUplodedFiles]);
	// 	// const merged = uploadedFiles.concat(currentUplodedFiles);
	// 	// console.log('merged', merged);
	// 	// setUploadedFiles(merged);
	// 	// for (let u of merged) {
	// 	// 	processUpload(u);
	// 	// }
	// 	//console.log('uploade', uploadedFiles);
	// 	//uploadedFiles.forEach(u => processUpload(u));
	// 	//uploadedFiles.forEach(uploadedFile => console.log('process', uploadedFile));
	// };

	const handleDelete = async (id: string) => {
		await apiClient.delete(`posts/${id}`);

		//const files = uploadedFiles.filter(file => file.id !== id);
	};

	// function updateFileProgress(id: string, data: any) {
	// 	const updatedFiles = uploadedFiles.map(uploadedFile => {
	// 		return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
	// 	});
	// 	//updateUploadedFiles(id, data);
	// 	setUploadedFiles(updatedFiles);
	// 	//console.log('updatedFiles', updatedFiles);
	// }

	function processUpload(uploadedFile: UploadedFile) {
		/**
		 * The FormData object lets you compile a set of key/value pairs to send 
		 * using XMLHttpRequest. It is primarily intended for use in sending 
		 * form data, but can be used independently from forms in order to transmit 
		 * keyed data. The transmitted data is in the same format that the form's 
		 * submit() method would use to send the data if the form's encoding type 
		 * were set to multipart/form-data.
		!!! You can build a FormData object yourself, instantiating it then appending 
		*fields to it by calling its append() 
		*/
		const data = new FormData();

		data.append('file', uploadedFile.file);
		data.append('filename', uploadedFile.name);
		data.append('fileid', uploadedFile.id);

		apiClient
			.post('images', data, {
				onUploadProgress: e => {
					const temp: number = Math.round((e.loaded * 100) / e.total);
					const progress = temp;

					updateFileProgress(uploadedFile.id, progress);
				},
			})
			.then(response => {
				const { url } = JSON.parse(response.data);

				uploadedComplete(uploadedFile.id, url);
			})
			.catch(() => {
				setError(uploadedFile.id);
			});
	}

	function handleProc() {
		uploadedFiles.forEach(uploadedFile => processUpload(uploadedFile));
	}

	return (
		<>
			<S.Container>
				<S.Content>
					<Upload onUpload={handleUpload} />
					{<FileList files={uploadedFiles} onDelete={handleDelete} />}
					<button onClick={handleProc}>Processar</button>
				</S.Content>
			</S.Container>
		</>
	);
};

export default Main;
