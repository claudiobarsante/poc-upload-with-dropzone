import type { AppProps } from 'next/app';
import { UploadProvider } from '../context/UploadContext';
import GlobalStyles from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UploadProvider>
			<GlobalStyles />
			<Component {...pageProps} />
		</UploadProvider>
	);
}
export default MyApp;
