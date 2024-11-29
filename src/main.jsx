import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { DrawerProvider } from "./context/DrawerContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<DrawerProvider>
				<App />
			</DrawerProvider>
		</Provider>
	</React.StrictMode>
);
