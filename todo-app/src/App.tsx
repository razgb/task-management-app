import "./index.css";
import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";

function App() {
  return (
    <div className="flex h-screen bg-primary">
      <Menu />

      <div className="flex-grow flex flex-col">
        <MainNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
