import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./Auth/Login";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/Home";
import Cra from './Calendar/ReactCalendar/Cra'

function AppWrapper() {
  const location = useLocation(); 

  return (
    <>
 
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Cra" element={<Cra/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;






