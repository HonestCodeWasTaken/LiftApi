import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastProvider, useToasts } from 'react-toast-notifications'
function MyApp({ Component, pageProps }: AppProps) {

  return (<ToastProvider>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </ToastProvider>)

}
