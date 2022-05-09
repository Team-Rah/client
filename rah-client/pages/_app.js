import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import {SocketContext, socket } from '../socket/socket.js'
function MyApp({ Component, pageProps }) {

//console.log(socket, SocketContext)
{/* <SocketContext.provider></SocketContext.provider>
</SocketContext.provider> */}
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
