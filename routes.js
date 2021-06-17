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
import HomeIcon from './assets/img/icons/home.svg';
import SwapIcon from './assets/img/icons/swap.svg';
import LiquidityIcon from './assets/img/icons/liquidity.svg';
import StakeIcon from './assets/img/icons/stake.svg';
import FarmsIcon from './assets/img/icons/farms.svg';
import StatsIcon from './assets/img/icons/stats.svg';

const routes = [
  {
    collapse: false,
    name: "Home",
    icon: HomeIcon,
    state: "dashboardsCollapse",
    path: "/homepage",
    layout: "",
  },
  {
    collapse: false,
    name: "Swap",
    icon: SwapIcon,
    state: "examplesCollapse",
    path: "/swap",
    layout: "",
  },
  {
    collapse: false,
    name: "Liquidity",
    icon: LiquidityIcon,
    state: "componentsCollapse",
    path: "/pools",
    layout: "",
  },
  {
    collapse: false,
    name: "Farms",
    icon: FarmsIcon,
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
