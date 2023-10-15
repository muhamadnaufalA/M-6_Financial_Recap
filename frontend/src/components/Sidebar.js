import React from 'react';
import { BiSolidLogIn } from 'react-icons/bi';
import { BiSolidLogOut } from 'react-icons/bi';
import { BiSolidCategory } from 'react-icons/bi';
import { BiWallet } from 'react-icons/bi';
import { BiBarChartAlt2 } from 'react-icons/bi';


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
                    <li className={`sidebar-item ${currentPath === '/dashboard' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/dashboard">
                        <i className="align-middle" data-feather="sliders"></i> 
                        <span className="align-middle">Dashboard</span>
                        </a>
                    </li>

                    <li className={`sidebar-item ${currentPath === '/income' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/income">
                            <i className="align-middle" data-feather="user"></i> 
                            <span className="align-middle">Income</span>
                        </a>
                    </li>

                    <li className={`sidebar-item ${currentPath === '/outcome' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/outcome">
                            <i className="align-middle" data-feather="log-in"></i> 
                            <span className="align-middle">Outcome</span>
                        </a>
                    </li>

                    <li className={`sidebar-item ${currentPath === '/category' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="pages-sign-up.html">
                            <i className="align-middle" data-feather="user-plus"></i> 
                            <span className="align-middle">Category</span>
                        </a>
                    </li>
                        <li className={`sidebar-item ${currentPath === '/wallet' ? 'active' : ''}`}>
                            <a className="sidebar-link" href="pages-blank.html">
                            <i className="align-middle" data-feather="book"></i> 
                            <span className="align-middle">wallet</span>
                        </a>
                    </li>
            </ul>
        </div>
    </nav>
  );
}

export default Sidebar
