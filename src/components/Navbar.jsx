import React from "react";
import Nav from "react-bootstrap/Nav";

const Navbar = () => {
  return (
    <div className="navbar">
      <Nav>
        <Nav.Item>
          <Nav.Link href="/">Task List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/taskbuilder">Task Builder</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;
