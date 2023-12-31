import { RouterProvider } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/globalContext";
import router from "./pages/router";
import { Web3Provider } from "./contexts/web3context";
import { Web5Provider } from "./contexts/web5context";

export default function App() {
  return (
    <GlobalContextProvider>
      <Web3Provider>
        <Web5Provider>
          <RouterProvider router={router} />
        </Web5Provider>
      </Web3Provider>
    </GlobalContextProvider>
  );
}
