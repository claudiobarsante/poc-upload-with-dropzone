import styled from 'styled-components';

type PreviewProps = {
	src: string;
};
export const Container = styled.ul`
	margin-top: 20px;
`;

export const ListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;

	color: #444;

	& + li {
		// -- a partir do 2o <li>
		margin-top: 15px;
	}
`;

export const FileInfo = styled.div`
	display: flex;
	align-items: center;

	div {
		display: flex;
		flex-direction: column;

		span {
			font-size: 12px;
			color: #999;
			margin-top: 5px;

			button {
				border: 0;
				background: transparent;
				color: #e57878;
				margin-left: 5px;
				cursor: pointer;
			}
		}
	}
`;

export const Preview = styled.div<PreviewProps>`
	width: 100px;
	height: 100px;
	border-radius: 5px;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%; // -- alinha ao centro da imagem
	margin-right: 10px;
`;
