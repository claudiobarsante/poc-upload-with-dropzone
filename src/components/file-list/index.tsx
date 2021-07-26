import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { UploadedFile } from '../../context/UploadContext';

import * as S from './styles';

type Props = {
	files: UploadedFile[];
	onDelete: (id: string) => void;
};

//Todo: não esquecer de limpar o preview das imagens no browser
//uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
const FileList = ({ files, onDelete }: Props) => {
	return (
		<S.Container>
			{files.map(uploadedFile => (
				<S.ListItem key={uploadedFile.id}>
					<S.FileInfo>
						<S.Preview src={uploadedFile.preview} />
						<div>
							<strong>{uploadedFile.name}</strong>
							<span>
								{uploadedFile.readableSize}{' '}
								{!!uploadedFile.url && (
									<button onClick={() => onDelete(uploadedFile.id)}>Excluir</button>
								)}
							</span>
						</div>
					</S.FileInfo>

					<div>
						{!uploadedFile.uploaded && !uploadedFile.error && (
							<CircularProgressbar
								styles={{
									root: { width: 24 },
									path: { stroke: '#ff9900' },
								}}
								strokeWidth={10}
								value={uploadedFile.progress}
							/>
						)}

						{uploadedFile.url && (
							<a href={uploadedFile.url} target='_blank' rel='noopener noreferrer'>
								<MdLink style={{ marginRight: 8 }} size={24} color='#222' />
							</a>
						)}

						{uploadedFile.uploaded && <MdCheckCircle size={24} color='#78e5d5' />}
						{uploadedFile.error && <MdError size={24} color='#e57878' />}
					</div>
				</S.ListItem>
			))}
		</S.Container>
	);
};

export default FileList;
