import React, { useState, useEffect } from 'react';
import { fetchCollection, addDocument, updateDocument, deleteDocument } from '../../firebase/firebaseUtils';

const ReviewsManagement = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    treatment: '',
    feedback: '',
    rating: 5,
    photo: '',
    beforeAfter: []
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviewsData();
  }, []);

  const loadReviewsData = async () => {
    try {
      setLoading(true);
      const data = await fetchCollection('reviews');
      setReviewsList(data);
    } catch (error) {
      console.error('Error loading reviews data:', error);
      alert('Error loading reviews data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        beforeAfter: checked
          ? [...prev.beforeAfter, value]
          : prev.beforeAfter.filter(item => item !== value)
      }));
    } else if (name === 'rating') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEditFormData(prev => ({
        ...prev,
        beforeAfter: checked
          ? [...prev.beforeAfter, value]
          : prev.beforeAfter.filter(item => item !== value)
      }));
    } else if (name === 'rating') {
      setEditFormData(prev => ({
        ...prev,
        [name]: parseInt(value)
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDocument('reviews', formData);
      setFormData({
        name: '',
        treatment: '',
        feedback: '',
        rating: 5,
        photo: '',
        beforeAfter: []
      });
      setIsAdding(false);
      loadReviewsData(); // Reload the data
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Error adding review: ' + error.message);
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      await updateDocument('reviews', id, editFormData);
      setEditingId(null);
      loadReviewsData(); // Reload the data
      alert('Review updated successfully!');
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Error updating review: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteDocument('reviews', id);
        loadReviewsData(); // Reload the data
        alert('Review deleted successfully!');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Error deleting review: ' + error.message);
      }
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews Management</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isAdding ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Add New Review</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Treatment</label>
              <input
                type="text"
                name="treatment"
                value={formData.treatment}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleAddChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleAddChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Before/After Images (comma separated)</label>
            <input
              type="text"
              name="beforeAfter"
              value={formData.beforeAfter.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                beforeAfter: e.target.value.split(',').map(item => item.trim()).filter(item => item)
              }))}
              placeholder="e.g., before1.jpg, after1.jpg"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleAddChange}
              required
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Review
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Existing Reviews</h3>
        {reviewsList.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            {editingId === item.id ? (
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-3">Edit Review</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Treatment</label>
                    <input
                      type="text"
                      name="treatment"
                      value={editFormData.treatment}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <select
                      name="rating"
                      value={editFormData.rating}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <input
                      type="text"
                      name="photo"
                      value={editFormData.photo}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Before/After Images (comma separated)</label>
                  <input
                    type="text"
                    name="beforeAfter"
                    value={editFormData.beforeAfter.join(', ')}
                    onChange={(e) => setEditFormData(prev => ({
                      ...prev,
                      beforeAfter: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                    }))}
                    placeholder="e.g., before1.jpg, after1.jpg"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Feedback</label>
                  <textarea
                    name="feedback"
                    value={editFormData.feedback}
                    onChange={handleEditChange}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEditSubmit(item.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-gray-600">{item.treatment}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-700">{item.feedback}</p>
                    {item.photo && <p className="text-gray-600 text-sm mt-2">Photo: {item.photo}</p>}
                    {item.beforeAfter && item.beforeAfter.length > 0 && (
                      <p className="text-gray-600 text-sm mt-1">Before/After: {item.beforeAfter.join(', ')}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(item)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsManagement;