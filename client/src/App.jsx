import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
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
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="admin/create" element={<CreateProject />} />
          <Route path="admin/edit/:projectId" element={<EditProject />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="admin/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
