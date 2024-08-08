import NiceModal from "@ebay/nice-modal-react";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Hydrate,QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
//import { config } from 'react-query-config';

import "../styles/globals.css";

// TODO mover a archivo propio para registrar los modales
// NiceModal.register("CreateAlbumModal", CreateAlbumModal);
// NiceModal.register("UploadPhotosModal", UploadPhotosModal, { albumId: 23 });

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
         <Hydrate state={pageProps.dehydratedState}>
        <NiceModal.Provider>
          {getLayout(<Component {...pageProps} />)}
        </NiceModal.Provider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
