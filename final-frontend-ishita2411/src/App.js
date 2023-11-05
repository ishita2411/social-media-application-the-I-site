import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import MainView from "./Main/MainView";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/main" element={<MainView />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
