import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/lab" className="nav-link">
          Lab
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/labs" className="nav-link">
          Labs
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/lab/genQrCode" className="nav-link">
          QrCode Gen
        </Link>
      </li>


      
    </ul>
  </nav>
);

export default AdminNav;
