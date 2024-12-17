import React, { useState, useEffect } from 'react';
import './ManageCategories.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]); // Holds the list of categories
  const [categoryName, setCategoryName] = useState(''); // Holds the new category input
  const [error, setError] = useState(''); // Handles error messages

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data); // Update state with fetched categories
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Could not fetch categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  // Function to add a new category
  const addCategory = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category. Please try again.');
      }

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setCategoryName('');
      closeModal();
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Category name must be unique.');
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('createCategoryModal');
    if (modal) modal.style.display = 'none';
  };

  return (
    <div className="manage-categories">
      {/* Navigation */}
      <nav>
        <div className="navbar">
          <div className="logo">Manage Categories</div>
          <ul className="links">
            <li>
              <a href="#createCategoryModal">Create New Category</a>
            </li>
            <li className="dropdown">
              <a href="#">Show Categories</a>
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category._id}>{category.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Modal for creating new category */}
      <div id="createCategoryModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Create New Category</h2>
          <form onSubmit={addCategory}>
            <label htmlFor="categoryName">Category Name:</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
