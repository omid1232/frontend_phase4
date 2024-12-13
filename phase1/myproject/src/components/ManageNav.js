import React from 'react';
import '../pages/ManageCategories.css'; // Ensure this CSS contains the navbar and modal styles

const ManageCategoriesNav = () => {
  return (
    <nav>
      <div className="navbar">
        <i className='bx bx-menu'></i>
        <div className="logo">Manage Categories</div>
        <div className="nav-links">
          <div className="sidebar-logo">
            <span className="logo-name">Manage Categories</span>
            <i className='bx bx-x'></i>
          </div>
          <ul className="links">
            <li>
              <a href="#">Cateogries</a>
              <i className='bx bxs-chevron-down htmlcss-arrow arrow'></i>
              <ul className="htmlCss-sub-menu sub-menu">
                {/* Clicking this link updates the URL hash to #createCategoryModal, triggering the modal via CSS */}
                <li><a href="#createCategoryModal">Create new category</a></li>
                <li className="more">
                  <span>
                    <a href="#">Show cateogries</a>
                    <i className='bx bxs-chevron-right arrow more-arrow'></i>
                  </span>
                  <ul className="more-sub-menu sub-menu">
                    <li><a href="#">Scientific</a></li>
                    <li><a href="#">historical</a></li>
                    <li><a href="#">literature</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="Designer.html">Main Menu</a></li>
          </ul>
        </div>
        <div className="search-box">
          <i className='bx bx-search'></i>
          <div className="input-box">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ManageCategoriesNav;
