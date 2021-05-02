import { useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

function App({ userName }) {
	useEffect(() => {
		console.log("thee", userName);
	});

	return code ? <Dashboard code={code} userName={userName} /> : <Login />;
}

export default App;
