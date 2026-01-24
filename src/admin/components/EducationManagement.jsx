import React, { useState, useEffect } from 'react';
import { fetchCollection, addDocument, updateDocument, deleteDocument } from '../../firebase/firebaseUtils';

const EducationManagement = () => {
  const [educationList, setEducationList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    degree: '',
    institute: '',
    duration: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducationData();
  }, []);

  const loadEducationData = async () => {
    try {
      setLoading(true);
      const data = await fetchCollection('education');
      setEducationList(data);
    } catch (error) {
      console.error('Error loading education data:', error);
      alert('Error loading education data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDocument('education', formData);
      setFormData({
        degree: '',
        institute: '',
        duration: '',
        description: ''
      });
      setIsAdding(false);
      loadEducationData(); // Reload the data
      alert('Education record added successfully!');
    } catch (error) {
      console.error('Error adding education:', error);
      alert('Error adding education: ' + error.message);
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      await updateDocument('education', id, editFormData);
      setEditingId(null);
      loadEducationData(); // Reload the data
      alert('Education record updated successfully!');
    } catch (error) {
      console.error('Error updating education:', error);
      alert('Error updating education: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      try {
        await deleteDocument('education', id);
        loadEducationData(); // Reload the data
        alert('Education record deleted successfully!');
      } catch (error) {
        console.error('Error deleting education:', error);
        alert('Error deleting education: ' + error.message);
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
        <h2 className="text-2xl font-bold text-gray-800">Education Management</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isAdding ? 'Cancel' : 'Add Education'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Add New Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Institute</label>
              <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
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
              Add Education
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
        <h3 className="text-lg font-medium text-gray-800">Existing Education Records</h3>
        {educationList.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            {editingId === item.id ? (
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-3">Edit Education</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={editFormData.degree}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institute</label>
                    <input
                      type="text"
                      name="institute"
                      value={editFormData.institute}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={editFormData.duration}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
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
                <h4 className="text-lg font-semibold text-gray-800">{item.degree}</h4>
                <p className="text-gray-600">{item.institute}</p>
                <p className="text-gray-600 text-sm">{item.duration}</p>
                <p className="mt-2 text-gray-700">{item.description}</p>
                <div className="mt-3 flex space-x-2">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManagement;