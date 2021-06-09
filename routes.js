/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
const routes = [
  {
    collapse: false,
    name: "Home",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
     path: "/dashboard",
     layout: "/admin",

  },
  {
    collapse: false,
    name: "Swap",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    path: "/swap",
    layout: "",
  },
  {
    collapse: false,
    name: "Liquidity",
    icon: "ni ni-ui-04 text-info",
    state: "componentsCollapse",
    path: "/pools",
    layout: "",
  },
  {
    collapse: false,
    name: "Farms",
    icon: "ni ni-single-copy-04 text-pink",
    state: "formsCollapse",
    path: "/",
     layout: "",
  },
  // {
  //   collapse: true,
  //   name: "Farms",
  //   icon: "ni ni-align-left-2 text-default",
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/tables",
  //       name: "Tables",
  //       miniName: "T",
  //       layout: "/admin",
  //     }
  //   ],
  // },
];

export default routes;
