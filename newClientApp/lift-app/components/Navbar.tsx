import React, { useState } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading
} from '@chakra-ui/react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export const DashboardC: React.FC = (props) => {

  const [navSize, changeNavSize] = useState("large")
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand  to="/">LiftApi</NavbarBrand>
          <NavbarToggler  className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse"  navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink  className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}