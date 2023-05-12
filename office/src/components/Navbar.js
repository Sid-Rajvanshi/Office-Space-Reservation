import React from "react";

import { Navbar, NavbarBrand } from "reactstrap";

const Nav = (props) => {
  return (
    <div>
      <Navbar color="light" expand="md">
        <NavbarBrand
          className="nav-brand"
          onClick={(_) => {
            props.setPage(0);
          }}
        >Home</NavbarBrand>
        
      </Navbar>
    </div>
  );
};

export default Nav;
