import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import './styles.css';

const Home: React.FC = () => <div>Home Page</div>;
const About: React.FC = () => <div>About Page</div>;
const Services: React.FC = () => <div>Services Page</div>;
const Contact: React.FC = () => <div>Contact Page</div>;

const SubMenu = ({ children, ...props }) => (
    <div {...props} className="submenu">
        <ul>{children}</ul>
    </div>
);

const SubMenuItem = ({ to, children, handleClick, ...props }) => (
    <Link {...props} className="submenu" to={to} onClick={handleClick}>
        <li className="sub-nav-item">{children}</li>
    </Link>
);
const MenuItem = ({
    to,
    children,
    label,
    handleMouseEnter,
    handleMouseLeave,
    ...props
}) => (
    <li
        className="navbar-item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <Link {...props} to={to} style={{ textDecoration: 'none' }} color='primary'>
            <span className="tab">{label}</span>
        </Link>
        {children}
    </li>
);

const HorizontalMenubar: React.FC = () => {
    //   const classes = useStyles();
    const [showUnderlay, setShowUnderlay] = useState(false);
    const [hideUnderlay, setHideUnderlay] = useState(false);

    return (
        <header>
                    <ul className="navbar">
                        <MenuItem
                            data-test-id="nav-to-home"
                            to="/"
                            label="Home"
                            id="dashboard"
                        />
                        <MenuItem
                            handleMouseEnter={showUnderlay}
                            handleMouseLeave={hideUnderlay}
                            to="/browse"
                            id="browse"
                            label="Explore"
                        >
                            <SubMenu>
                                <SubMenuItem to="/browse">Kill Chains</SubMenuItem>
                                <SubMenuItem to="/browse/unmapped">Unmapped</SubMenuItem>
                            </SubMenu>
                        </MenuItem>
                        <MenuItem
                            data-test-id="nav-to-customers"
                            to="/customers"
                            id="customers"
                            label="Customers"
                        />
                       
                    </ul>
        </header>
    );
};

export default HorizontalMenubar;
