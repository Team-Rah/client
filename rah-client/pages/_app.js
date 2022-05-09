import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        <CssBaseline />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

export default MyApp
