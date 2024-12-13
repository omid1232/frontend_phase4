import React from 'react';
import './ManageCategories.css'; // Ensure this file is in the same directory

const ManageCategories = () => {
  return (
    <>
      <nav>
        <div className="navbar">
          <i className='bx bx-menu'></i>
          <div className="logo">Manage Categories</div>
          <div className="nav-links">
            <div className="sidebar-logo">
              <span className="logo-name">Manage Cateogries</span>
              <i className='bx bx-x'></i>
            </div>
            <ul className="links">
              <li>
                <a href="#">Cateogries</a>
                <i className='bx bxs-chevron-down htmlcss-arrow arrow'></i>
                <ul className="htmlCss-sub-menu sub-menu">
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
              <li><a href="Designer">Main Menu</a></li>
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

      {/* Modal */}
      <div id="createCategoryModal" className="modal">
        <div className="modal-content">
          <a href="#" className="close">&times;</a>
          <h2>Create New Category</h2>
          <form id="createCategoryForm" action="#">
            <label htmlFor="categoryName">Category Name:</label>
            <input type="text" id="categoryName" name="categoryName" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
