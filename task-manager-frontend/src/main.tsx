import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@crema/mockapi"; // Import mock APIs

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);
