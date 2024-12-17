import React, { useState, useEffect } from 'react';
import './ManageCategories.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Could not fetch categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <nav>
        <div className="navbar">
          <i className="bx bx-menu"></i>
          <div className="logo">Manage Categories</div>
          <div className="nav-links">
            <ul className="links">
              <li>
                <a href="#">Categories</a>
                <i className="bx bxs-chevron-down htmlcss-arrow arrow"></i>
                <ul className="htmlCss-sub-menu sub-menu">
                  <li>
                    <a href="#createCategoryModal" className="modal-link">Create New Category</a>
                  </li>
                  <li className="more">
                    <span>
                      <a href="#">Show Categories</a>
                      <i className="bx bxs-chevron-right arrow more-arrow"></i>
                    </span>
                    <ul className="more-sub-menu sub-menu">
                      {categories.map((category) => (
                        <li key={category._id}>
                          <a href="#">{category.name}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a href="Designer">Main Menu</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Modal */}
      <div id="createCategoryModal" className="modal">
        <div className="modal-content">
          <button className="close" onClick={() => closeModal()}>&times;</button>
          <h2>Create New Category</h2>
          <form
            id="createCategoryForm"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Category created successfully!');
              closeModal();
            }}
          >
            <label htmlFor="categoryName">Category Name:</label>
            <input type="text" id="categoryName" name="categoryName" required />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper function to close the modal
const closeModal = () => {
  const modal = document.getElementById('createCategoryModal');
  if (modal) {
    modal.style.display = 'none';
  }
};

export default ManageCategories;
