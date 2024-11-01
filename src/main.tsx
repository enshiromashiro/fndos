import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const setup = () => {
	const root = document.getElementById("root");
	if (!root) {
		console.error("#root is not found.");
		return;
	}

	createRoot(root).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
};
setup();
