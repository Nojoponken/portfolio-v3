import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Login from "./Login";
import Register from "./Register";
import PageNotFound from "./PageNotFound";
import Projects from "./Projects";
import ProjectDetails from "./ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="admin" element={<CreatePost />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="admin/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
