import * as React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

const pages = [
    { title: "Products", path: "/products" },
    { title: "Orders", path: "/orders" },
    { title: "Clients", path: "/clients" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/Register" }

]

export const NavBar = () => {
    return (
        <header className="navbar-header">
            
            <h1><Link to='/' className="navbar-link">TIN Project</Link></h1>
            <nav className="navbar-nav">
                {pages.slice(0, 3).map(page => (
                    <Link key={page.path} to={page.path} className="navbar-link">
                        {page.title}
                    </Link>
                ))}
            </nav>
            <div className="navbar-right">
                {pages.slice(3).map(page => (
                    <Link key={page.path} to={page.path} className="navbar-link">
                        {page.title}
                    </Link>
                ))}
            </div>
        </header>
    );
};