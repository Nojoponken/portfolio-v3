import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div class="lower-footer">
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
