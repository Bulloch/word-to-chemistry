import logo from './logo.svg';
import './App.css';
import Main from './Main.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="header-title">Word To Chemistry</h1>
        </div>
      </header>
      <Main/>
    </div>
  );
}

export default App;
