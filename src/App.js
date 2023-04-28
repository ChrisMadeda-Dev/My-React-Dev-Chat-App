import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import ChatDesk from "./components/ChatDesk";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={localStorage.getItem('user-phone')?<ChatDesk/>:<SignIn />} />
          <Route path="/ChatDesk" element={<ChatDesk />} />
          <Route path="/ChatRoom" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
