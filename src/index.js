import React from "react";
import ReactDOM from "react-dom"; //IMPORTANT: needed to remove /client to compile successfully with version 17 of React
import "./index.css";
import "./App.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import * as atatus from "atatus-spa";

atatus.config("cb1f7fa1e7c44e7d88222a117c79e7fc").install();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
//IMPORTANT: needed to comment out and replace with above to compile with v17 of React
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
