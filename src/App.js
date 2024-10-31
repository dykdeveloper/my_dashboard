import "./App.css";
import "./file/script.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar.js";
import Task from "./component/Task.js";
import ExpireTask from "./component/ExpireTask.js";
import CompleteTask from "./component/CompleteTask.js";
import User from "./component/User.js";
import Form from "./component/Form.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          <Sidebar />
          <div className="main">
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Task />} />
                <Route path="/expireTask" element={<ExpireTask />} />
                <Route path="/completeTask" element={<CompleteTask />} />
                <Route path="/user" element={<User />} />
                <Route path="/form" element={<Form />} />
              </Routes>
              
            </main>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
