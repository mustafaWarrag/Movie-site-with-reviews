import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
/*
const client = new ApolloClient({
  uri:"http://localhost:8080/graphql",
  cache:new InMemoryCache()
})
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
    
  </StrictMode>,
)
