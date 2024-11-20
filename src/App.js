import "./App.css";
import "./file/script.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar.js";
import Task from "./component/Task.js";
import ExpireTask from "./component/ExpireTask.js";
import History from "./component/History.js";
import User from "./component/User.js";
import Form from "./component/Form.js";
import TaskDetail from "./component/TaskDetail.js";
import Login from "./layout/Login.js";
import ProtectedRoute from "./component/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const showSidebarAndNavbar = [
    "/dashboard",
    "/expiretask",
    "/history",
    "/user",
    "/form",
    "/dashboard/taskdetail/:id",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <div className="wrapper">
      {user && showSidebarAndNavbar && <Sidebar />}
      <div className="main">
        {user && showSidebarAndNavbar && <Navbar />}
        <main className="content">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Task />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/expiretask" element={<ExpireTask />} />
            <Route path="/history" element={<History />} />
            <Route path="/user" element={<User />} />
            <Route path="/form" element={<Form />} />
            <Route path="/dashboard/taskdetail/:id" element={<TaskDetail />} />
            {!user && (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </main>
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
