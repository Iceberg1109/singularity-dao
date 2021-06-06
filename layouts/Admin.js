import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";


import routes from "routes.js";
import Web3 from "web3";

function Admin({ router, children }) {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [walletModal, setWalletModal] = useState(false);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (router.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };

  const getNavbarTheme = () => {
    return router.pathname.indexOf("admin/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };

  return (
    <>
    <>
       <Sidebar
          routes={routes}
          logo={{
            innerLink: "/",
            imgSrc: require("assets/img/brand/singdao-white.svg"),
            imgAlt: "...",
          }}
         
        />
    <div className="main-content">
 
      <AdminNavbar
        theme={getNavbarTheme()}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        brandText={getBrandText(router.pathname)}
      />
      <div className="p-4 minh-100">{children}</div>
      <AdminFooter />
    </div>
    </>
    </>
  );
}

export default withRouter(Admin);
