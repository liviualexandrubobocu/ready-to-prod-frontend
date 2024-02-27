// Internal
import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";

const MainLayout = () => {
  return (
    <div>
      <Menu />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
