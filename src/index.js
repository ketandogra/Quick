import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="light"
    />

   
      <AuthContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
      </AuthContextProvider>
 
  </BrowserRouter>
);
