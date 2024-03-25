import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";
import JobPage from "./pages/Jobs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/home" Component={MainPage} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/jobs" Component={JobPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
