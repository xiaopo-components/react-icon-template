import * as React from "react";
import { Header } from "./header";
import Menu, { MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const [activeMenu, setActiveMenu] = React.useState<string>("icon");
  const history = useHistory();
  useEffect(() => history.push(`/${activeMenu}`), [activeMenu]);
  const handleMenuSelect: MenuClickEventHandler = React.useCallback((menu) => {
    setActiveMenu(menu.key as string);
  }, []);

  return (
    <div className="container flex-col">
      <Header />
      <div className="container">
        <div className="nav" style={{ padding: "0 10px" }}>
          <Menu activeKey={activeMenu} onClick={handleMenuSelect}>
            <MenuItem key={"icon"}>icon</MenuItem>
            <MenuItem key={"read-me"}>Read-me</MenuItem>
          </Menu>
        </div>
        <div className="content">
          <React.Suspense fallback={null}>
            <Switch>
              <Route
                path="/icon"
                component={React.lazy(() => import("./icon-preview"))}
              />
              <Route
                path="/read-me"
                component={React.lazy(() => import("./readme-preview"))}
              />
              <Redirect to="/icon" />
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
