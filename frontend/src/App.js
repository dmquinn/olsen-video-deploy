import Login from "./components/Login";
import Dashboard from "./Dashboard";
import "./stylesheets/index.css";

const code = new URLSearchParams(window.location.search).get("code");

function App({ userName }) {
	return code ? <Dashboard code={code} userName={userName} /> : <Login />;
}

export default App;
