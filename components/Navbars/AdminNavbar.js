import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useUser } from "components/UserContext";
import formatAddress from "utils/format-address";
import Popper from "components/Popper";
import HeaderUserMenu from "components/HeaderUserMenu";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroupItem,
  ListGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Modal,
  NavbarBrand,
  UncontrolledCollapse,
  Card,
  CardHeader,
} from "reactstrap";

import Link from "next/link";
import WalletModal from "../WalletModal";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
  const { account } = useUser();
  const [walletModal, setWalletModal] = useState(false);

  const getFormattedWalletAddress = () => {
    return wallet.substring(0, 5) + "..." + wallet.substring(wallet.length - 4);
  };

  // function that on mobile devices makes the search open
  const openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  const closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main bg-white"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <Link href="/">
            <div className="header-brand mr-4">
           
            </div>
          </Link>
               <Nav className="mr-auto" navbar>
       
      
            </Nav>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >

            <span className="navbar-toggler-icon" />
          </button>

          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">

                  <Link href="/admin/dashboard">
                    <img
                      alt="SingularityDAO"
                      src={require("assets/img/brand/singdao.svg")}
                    />

                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            <hr className="d-lg-none" />

            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    { "sidenav-toggler-light": theme === "light" }
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>

              <NavItem >
                <NavLink onClick={openSearch}>
           
                Governance
                </NavLink>
                    </NavItem>
                        <NavItem >
                 <NavLink onClick={openSearch}>
                 
                  Docs
                </NavLink>
                    </NavItem>
                      <NavItem >
                 <NavLink onClick={openSearch}>
      
                 GitHub
                </NavLink>
              </NavItem>
              <NavItem >
                 <NavLink onClick={openSearch}>
                Support
                </NavLink>
              </NavItem>


              <NavItem>
                {!account && (
                  <Button
                    outline
                    color="primary"
                    onClick={() => setWalletModal(true)}
                    label={"connect wallet"}
                    sx={{ variant: "buttons.outline" }}
                  >
                    Connect Wallet
                  </Button>
                )}
                {account && (
                  <Popper Content={HeaderUserMenu}>
                    <Button
                      outline
                      color="primary"
                      label={formatAddress(account)}
                      className="btn-neutral btn-icon"
                    >
                      {formatAddress(account)}
                    </Button>
                  </Popper>
                )}
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
        <WalletModal
          walletModal={walletModal}
          setWalletModal={setWalletModal}
        />
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
  wallet: PropTypes.string,
  metamaskInstalled: PropTypes.bool,
};

export default AdminNavbar;
