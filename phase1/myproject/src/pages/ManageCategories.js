import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate
import './ManageCategories.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // <-- Initialize navigate

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://backend-app:8080/api/categories');
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

  // Add a new category
  const addCategory = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      const newCategory = await response.json();
      setCategories((prev) => [...prev, newCategory]);
      setCategoryName('');
      setShowModal(false);
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Category name must be unique.');
    }
  };

  // Modal handlers
  const openModal = () => {
    setError('');
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // Handler for button that navigates to /designer
  const goToDesigner = () => {
    // Replaces the current entry in the history stack
    navigate('/designer', { replace: true });
    // or: window.location.replace('http://backend-app:3000/designer');
  };

  return (
    <div className="manage-categories-page">
      <header className="categories-header">
        <div className="header-left">
          <h1>Manage Categories</h1>
          <p className="header-description">
            Create and organize quiz categories to keep your questions structured 
            and easy to find. Group questions by topics, difficulty, or any theme you like!
          </p>
        </div>
        <div className="header-right">
          <button className="primary-btn" onClick={openModal}>
            + New Category
          </button>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      <section className="categories-card">
        <h2>Existing Categories</h2>
        {categories.length === 0 ? (
          <p className="no-categories-text">No categories found.</p>
        ) : (
          <ul className="categories-list">
            {categories.map((cat) => (
              <li key={cat._id} className="category-item">{cat.name}</li>
            ))}
          </ul>
        )}
      </section>

      {/* NEW: Button to go to /designer */}
      <div className="back-to-designer">
        <button className="secondary-btn" onClick={goToDesigner}>
          Homepage
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-body"
            onClick={(e) => e.stopPropagation()} 
          >
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>Create a New Category</h2>
            <form onSubmit={addCategory}>
              <label htmlFor="categoryName">Category Name</label>
              <input
                id="categoryName"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g. Science, Music, or Geography"
                required
              />
              <button type="submit" className="primary-btn">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
