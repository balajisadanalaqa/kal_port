import React, { useState, useEffect } from 'react';
import { fetchCollection, updateDocument, addDocument } from '../../firebase/firebaseUtils';

const SummaryManagement = () => {
  const [formData, setFormData] = useState({
    short_name: '',
    name: '',
    title: '',
    bio: '',
    profileLinks: {
      linkedin: '',
      instagram: '',
      email: ''
    },
    profileImage: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummaryData();
  }, []);

  const loadSummaryData = async () => {
    try {
      setLoading(true);
      const summaryData = await fetchCollection('about');
      if (summaryData.length > 0) {
        const summary = summaryData[0]; // Assuming only one summary document
        setFormData({
          short_name: summary.short_name || '',
          name: summary.name || '',
          title: summary.title || '',
          bio: summary.bio || '',
          profileLinks: summary.profileLinks || {
            linkedin: '',
            instagram: '',
            email: ''
          },
          profileImage: summary.profileImage || ''
        });
      }
    } catch (error) {
      console.error('Error loading summary data:', error);
      alert('Error loading summary data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileLinkChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      profileLinks: {
        ...prev.profileLinks,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // We'll create or update the summary document
      const summaryData = await fetchCollection('about');
      if (summaryData.length > 0) {
        // Update existing document
        await updateDocument('about', summaryData[0].id, formData);
      } else {
        // Create new document if none exists
        await addDocument('about', formData);
      }
      alert('Summary data updated successfully!');
      setIsEditing(false);
      // Reload the data to reflect changes
      loadSummaryData();
    } catch (error) {
      console.error('Error updating summary:', error);
      alert('Error updating summary: ' + error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Summary Management</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Short Name</label>
              <input
                type="text"
                name="short_name"
                value={formData.short_name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Profile Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input
                  type="text"
                  value={formData.profileLinks.linkedin}
                  onChange={(e) => handleProfileLinkChange('linkedin', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  type="text"
                  value={formData.profileLinks.instagram}
                  onChange={(e) => handleProfileLinkChange('instagram', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  value={formData.profileLinks.email}
                  onChange={(e) => handleProfileLinkChange('email', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">Current Summary</h3>
          </div>
          <div className="space-y-4">
            <p><strong>Short Name:</strong> {formData.short_name}</p>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Title:</strong> {formData.title}</p>
            <p><strong>Bio:</strong> {formData.bio}</p>
            <p><strong>LinkedIn:</strong> {formData.profileLinks.linkedin}</p>
            <p><strong>Instagram:</strong> {formData.profileLinks.instagram}</p>
            <p><strong>Email:</strong> {formData.profileLinks.email}</p>
            <p><strong>Profile Image:</strong> {formData.profileImage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryManagement;