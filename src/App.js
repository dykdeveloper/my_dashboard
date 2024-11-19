import "./App.css";
import "./file/script.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar.js";
import Task from "./component/Task.js";
import ExpireTask from "./component/ExpireTask.js";
import History from "./component/History.js";
import User from "./component/User.js";
import Form from "./component/Form.js";
import TaskDetail from "./component/TaskDetail.js";
import Login from "./layout/Login.js";

function App() {
  const location = useLocation();

  const showSidebarAndNavbar = [
    "/dashboard",
    "/expiretask",
    "/history",
    "/user",
    "/form",
    "/taskdetail/:id",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <div className="wrapper">
      {showSidebarAndNavbar && <Sidebar />}
      <div className="main">
        {showSidebarAndNavbar && <Navbar />}
        <main className="content">
          <Routes>
            <Route path="/dashboard" element={<Task />} />
            <Route path="/expiretask" element={<ExpireTask />} />
            <Route path="/history" element={<History />} />
            <Route path="/user" element={<User />} />
            <Route path="/form" element={<Form />} />
            <Route path="/taskdetail/:id" element={<TaskDetail />} />
          </Routes>
        </main>
      </div>
      <div className="login-form">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

function Wrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Wrapper;
