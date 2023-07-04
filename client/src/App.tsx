import MainView from "./components/MainView";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<div className='w-full h-full bg-[#fafafa]'>
				<MainView />
			</div>
		</BrowserRouter>
	);
}

export default App;
