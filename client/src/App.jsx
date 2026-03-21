import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

import { Cloudinary } from "@cloudinary/url-gen";
import useCld from "./hooks/useCld";

function App() {
  const { setCld } = useCld();

  useEffect(() => {
    const cld = new Cloudinary({
      cloud: { cloudName: "dbgzn2j1t" },
    });
    setCld(cld);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="admin" element={<CreateProject />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="admin/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
