import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  // Fungsi untuk menentukan apakah sidebar-item aktif
  const isItemActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">AdminKit</span>
        </a>
        <ul className="sidebar-nav">
          <li className="sidebar-header">
            Pages
          </li>
          <li className={`sidebar-item ${isItemActive("/dashboard")}`}>
            <Link className="sidebar-link" to="/dashboard">
              <i className="align-middle" data-feather="sliders"></i>
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isItemActive("/income")}`}>
            <Link className="sidebar-link" to="/income">
              <i className="align-middle" data-feather="user"></i>
              <span className="align-middle">Income</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isItemActive("/outcome")}`}>
            <Link className="sidebar-link" to="/outcome">
              <i className="align-middle" data-feather="log-in"></i>
              <span className="align-middle">Outcome</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isItemActive("/category")}`}>
            <Link className="sidebar-link" to="/category">
              <i className="align-middle" data-feather="user-plus"></i>
              <span className="align-middle">Category</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isItemActive("/wallet")}`}>
            <Link className="sidebar-link" to="/wallet">
              <i className="align-middle" data-feather="book"></i>
              <span className="align-middle">Wallet</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;