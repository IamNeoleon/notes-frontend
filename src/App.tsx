import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import './styles/index.scss'
import Dashboard from "./pages/Dashboard";
import NotePage from "./pages/NotePage";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header/Header";
import Welcome from "./pages/Welcome";


function App() {
	return (
		<>
			<div className="App">
				<Header />
				<AnimatePresence mode="wait">
					<Routes>
						<Route path="/" element={<Welcome />}></Route>
						<Route path="/auth" element={<Auth />}></Route>
						<Route path="/dashboard" element={<Dashboard />}></Route>
						<Route path="/note/:id" element={<NotePage />}></Route>
					</Routes>
				</AnimatePresence>
			</div>
		</>
	)
}

export default App
