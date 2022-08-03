import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Дуршлаг
      </header>
      <LoginForm />
    </div>
  );
}

export default App;
