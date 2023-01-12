import './App.css';
import Background from './components/background';
import { Page } from './pages';
import Home from './views/home';

function App() {
  return (
    <div className="App">
      <Background width={window.innerWidth} height={window.innerHeight} style={{position: 'fixed', top: '0px', left: '0px'}} />
      {/* <Home /> */}
      <Page />
    </div>
  );
}

export default App;
