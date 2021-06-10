import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<h1>TakeNote</h1>
				<Route exact path="/" component={Home} />
			</div>
		</Router>
	);
}

export default App;
