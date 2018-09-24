import React from "react";
import { Navbar, NavbarBrand, Nav } from "reactstrap";
import AnimateBalance from "./AnimateBalance";
import logo from "../inc/cyber-quest-white.png";

const StatusBarHeader = (props) => {
    return (
        <Navbar className="header" color="dark" expand="md">
            <NavbarBrand className="heading text-white" href="/">
                <img src={logo} className="App-logo" alt="logo" />
                &nbsp;CyberCoin
            </NavbarBrand>
            <Nav className="ml-auto pr-3 text-white d-flex align-items-center" navbar>
                <span className="heading">Coins:</span> <AnimateBalance value={props.balance} />
            </Nav>
            <Nav className="ml-auto pr-3 text-white" navbar>
                <span className="heading">User:</span> {props.user}
            </Nav>
        </Navbar>
    );
};

export default StatusBarHeader;
