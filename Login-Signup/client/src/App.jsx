import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
