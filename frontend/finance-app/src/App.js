import React from "react"
import Layout from "./components/Layout"
import HttpClient from './helpers/HttpClient'
import { AuthProvider } from "./components/AuthProvider";

export const ClientContext = React.createContext();
const client = new HttpClient();

export default function App() {

  return (
     <ClientContext.Provider value={client}>
       <AuthProvider>
        <Layout></Layout>
       </AuthProvider>
     </ClientContext.Provider>
  )

}
