import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/homepage/Homepage";
// import Header from "./components/header/Header";

function App() {
  return (
    <div className="main-container bg-titanium">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
      </BrowserRouter>
    </div>
  );
}

export default App;