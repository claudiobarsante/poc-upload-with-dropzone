import { useDropzone } from 'react-dropzone';
import * as S from './styles';

type Props = {
	onUpload: (file: File[]) => void;
};

const Upload = ({ onUpload }: Props) => {
	const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
		if (!isDragActive) {
			return <S.UploadMessage>Arraste arquivos aqui...</S.UploadMessage>;
		}

		if (isDragReject) {
			return <S.UploadMessage type='error'>Arquivo não suportado</S.UploadMessage>;
		}

		return <S.UploadMessage type='success'>Solte os arquivos aqui</S.UploadMessage>;
	};

	const maxFileSize = 10; // 10 MB

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: ['image/jpeg', 'image/png'],
		onDrop: (acceptedFiles, rejectedFiles) => {
			// As we are manually generating the preview of selected images, so we don't need to free memory of rejected files.
			const maxLength = 15;
			const maxErrorTime = 3200; // 3.2 sec.
			//  max file size handled already.
			console.log('Accepted Files', acceptedFiles);
			console.log('Rejected Files', rejectedFiles);

			// handle errors.
			// handle blank drag and drop also.
			// TODO: Handle error of rejected mime type on drag and drop.
			//     if (rejectedFiles.length > 0 && rejectedFiles[0].name) {
			// 	   setError(`Max file size limit is ${maxFileSize}MB`)
			// 	   setTimeout(() => {
			// 		  setError(null);
			// 	   }, maxErrorTime);

			//     }

			//     if (images.length + acceptedFiles.length > maxLength) {
			// 	   setError(`Max files dropped must not be greater than ${maxLength}`)
			// 	   setTimeout(() => {
			// 		  setError(null);
			// 	   }, maxErrorTime);
			//     }

			// now set the state
			onUpload(acceptedFiles);
			// props.storeImages(acceptedFiles, maxLength);

			// console.log('Images', images);
			// console.log('New Files', newFiles);
		},
		multiple: true,
		maxSize: maxFileSize * 1024 * 1024,
	});

	return (
		<>
			<S.DropContainer {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
				<input {...getInputProps()} />
				{renderDragMessage(isDragActive, isDragReject)}
			</S.DropContainer>
		</>
	);
};

export default Upload;
