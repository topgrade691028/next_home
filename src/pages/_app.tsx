import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { Inter } from "next/font/google";
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <ReactQueryProvider>
          <Component {...pageProps} />
        </ReactQueryProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
