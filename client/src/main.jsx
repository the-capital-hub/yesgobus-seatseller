import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TranslateProvider } from "./pages/TranslateProvider/TranslateProvider.js";
import { Provider } from "react-redux";
import { store } from "./stores/store.js";
import { ConfigProvider } from "antd";
import { antTheme } from "./utils/antdTheme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <ConfigProvider theme={antTheme}>
      <TranslateProvider />
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </>
  //  </React.StrictMode>
);
