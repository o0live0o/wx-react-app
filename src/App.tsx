import { RouterProvider } from "react-router-dom"
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import {router} from "./routes"

type AppProps = {
  pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
   return (
     <MsalProvider instance={pca}>
       <RouterProvider router={router} />
     </MsalProvider>
   );
}

export default App
