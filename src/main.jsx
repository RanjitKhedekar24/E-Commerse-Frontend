// main.jsx or index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/Cart";
import { SearchProvider } from "./context/Search";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
