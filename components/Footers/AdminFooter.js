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
import React from "react";

// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  NavbarBrand,
  Navbar,
  UncontrolledTooltip,
} from "reactstrap";
import Link from "next/link";
import styled from "styled-components";

const GrayText = styled.p`
  color: ${({ theme }) => theme.color.gray};
  font-size: 12px;
`;
const GrayLink = styled(NavLink)`
  color: ${({ theme }) => theme.color.gray};
  font-size: 12px;
`;

function AdminFooter() {
  return (
    <div className="bg-white admin-footer">
      <Container>
        <Row>
          <Col lg={5} className="brand-col">
            <Link href="/">
              <div className="brand mb-3">
                <img
                  alt="SingularityDAO"
                  src={require("assets/img/brand/singdao.svg")}
                />
              </div>
            </Link>
            <GrayText className="mb-2">SingularityDAO 2021</GrayText>
            <GrayText>A project powered by SingularityNET</GrayText>
          </Col>
          <Col lg={7}>
            <Row className="justify-content-between d-lg-flex d-md-block">
         

              <Col className="col-auto social-links">
                <Nav className="align-items-lg-center">
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      id="tooltip601201423"
                      target="_blank"
                      href="https://www.facebook.com/SingularityDAO"
                    >
                      <i className="fab fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip601201423" href="https://www.facebook.com/SingularityDAO">
                      Like us on Facebook
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      id="tooltip871243015"
                      target="_blank"
                      href="https://www.instagram.com/singularitydao/"
                    >
                      <i className="fab fa-instagram" />
                      <span className="nav-link-inner--text d-lg-none">
                        Instagram
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip871243015">
                      Follow us on Instagram
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      id="tooltip366258619"
                      target="_blank"
                      href="https://twitter.com/SingularityDao"
                    >
                      <i className="fab fa-twitter-square" />
                      <span className="nav-link-inner--text d-lg-none">
                        Twitter
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip366258619">
                      Follow us on Twitter
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      id="tooltip931502898"
                      target="_blank"
                      href="https://github.com/Singularity-DAO/"
                    >
                      <i className="fab fa-github" />
                      <span className="nav-link-inner--text d-lg-none">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip931502898">
                      Star us on Github
                    </UncontrolledTooltip>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminFooter;
