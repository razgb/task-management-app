import "./index.css";
import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";

function App() {
  // theme will be placed here.

  return (
    <div className="light flex h-screen bg-primary">
      <Menu />

      <div className="flex flex-grow flex-col">
        <MainNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
