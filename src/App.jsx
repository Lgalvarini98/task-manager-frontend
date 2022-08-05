import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TasksForm from "./components/TasksForm";
import TasksViewer from "./components/TasksViewer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TasksViewer />} />
          <Route path="/taskbuilder" element={<TasksForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
