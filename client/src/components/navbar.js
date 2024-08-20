// NavBar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useCurrentUser } from "./context.js";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  const { currentUser } = useCurrentUser();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/" style={{ paddingLeft: "20px" }}>
        BadBank
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {!currentUser || !currentUser.loginStatus ? (
            <>
              <LinkContainer to="/createAccount">
                <Nav.Link>Create Account</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="/deposit">
                <Nav.Link>Deposit</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/withdraw">
                <Nav.Link>Withdraw</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/transfer">
                <Nav.Link>Transfer</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/transactionHistory">
                <Nav.Link>Transaction History</Nav.Link>
              </LinkContainer>
              {currentUser.role === "admin" && (
                <LinkContainer to="/allData">
                  <Nav.Link>All Data</Nav.Link>
                </LinkContainer>
              )}
            </>
          )}
        </Nav>
        <Nav className="ms-auto" style={{ paddingRight: "40px" }}>
          <LinkContainer to="/login">
            <Nav.Link>
              {!currentUser || !currentUser.loginStatus ? "Login" : "Logout"}
            </Nav.Link>
          </LinkContainer>
          <Nav.Link
            style={{
              border: "4px solid grey",
              padding: "5px",
              borderRadius: "50px",
              color: "white",
            }}
          >
            {!currentUser || !currentUser.loginStatus
              ? ""
              : `${currentUser.name}`}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
