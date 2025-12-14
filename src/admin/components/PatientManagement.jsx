import React, { useState } from 'react';
import { patientsData } from '../../data/patientsData';

const PatientManagement = () => {
  const [patientsList, setPatientsList] = useState(patientsData);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    condition: '',
    treatment: '',
    recoveryPeriod: '',
    movementsDone: [],
    boxColor: '#3B82F6',
    images: [],
    videos: []
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});
  const [videoPreviews, setVideoPreviews] = useState({});

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

  const handleMovementsChange = (index, value, isEditing = false) => {
    if (isEditing) {
      const updated = [...editFormData.movementsDone];
      updated[index] = value;
      setEditFormData(prev => ({
        ...prev,
        movementsDone: updated
      }));
    } else {
      const updated = [...formData.movementsDone];
      updated[index] = value;
      setFormData(prev => ({
        ...prev,
        movementsDone: updated
      }));
    }
  };

  const addMovementField = (isEditing = false) => {
    if (isEditing) {
      setEditFormData(prev => ({
        ...prev,
        movementsDone: [...prev.movementsDone, '']
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        movementsDone: [...prev.movementsDone, '']
      }));
    }
  };

  const removeMovementField = (index, isEditing = false) => {
    if (isEditing) {
      const updated = [...editFormData.movementsDone];
      updated.splice(index, 1);
      setEditFormData(prev => ({
        ...prev,
        movementsDone: updated
      }));
    } else {
      const updated = [...formData.movementsDone];
      updated.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        movementsDone: updated
      }));
    }
  };

  const handleImageUpload = (e, index, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          const updated = [...editFormData.images];
          if (index < updated.length) {
            updated[index].url = reader.result;
          } else {
            updated.push({ id: Date.now(), url: reader.result, description: '' });
          }
          setEditFormData(prev => ({
            ...prev,
            images: updated
          }));
          setImagePreviews(prev => ({
            ...prev,
            [editFormData.id || 'new']: reader.result
          }));
        } else {
          const updated = [...formData.images];
          if (index < updated.length) {
            updated[index].url = reader.result;
          } else {
            updated.push({ id: Date.now(), url: reader.result, description: '' });
          }
          setFormData(prev => ({
            ...prev,
            images: updated
          }));
          setImagePreviews(prev => ({
            ...prev,
            new: reader.result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e, index, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          const updated = [...editFormData.videos];
          if (index < updated.length) {
            updated[index].url = reader.result;
          } else {
            updated.push({ id: Date.now(), url: reader.result, description: '' });
          }
          setEditFormData(prev => ({
            ...prev,
            videos: updated
          }));
          setVideoPreviews(prev => ({
            ...prev,
            [editFormData.id || 'new']: reader.result
          }));
        } else {
          const updated = [...formData.videos];
          if (index < updated.length) {
            updated[index].url = reader.result;
          } else {
            updated.push({ id: Date.now(), url: reader.result, description: '' });
          }
          setFormData(prev => ({
            ...prev,
            videos: updated
          }));
          setVideoPreviews(prev => ({
            ...prev,
            new: reader.result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      ...formData,
      id: Date.now() // temporary ID until saved to Firebase
    };
    setPatientsList(prev => [...prev, newPatient]);
    setFormData({
      patientName: '',
      condition: '',
      treatment: '',
      recoveryPeriod: '',
      movementsDone: [],
      boxColor: '#3B82F6',
      images: [],
      videos: []
    });
    setIsAdding(false);
    alert('Patient record added successfully!');
  };

  const handleEditSubmit = (id) => {
    setPatientsList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...editFormData } : item
      )
    );
    setEditingId(null);
    alert('Patient record updated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      setPatientsList(prev => prev.filter(item => item.id !== id));
      alert('Patient record deleted successfully!');
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditFormData({ 
      ...item, 
      movementsDone: [...item.movementsDone],
      images: [...item.images],
      videos: [...item.videos]
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isAdding ? 'Cancel' : 'Add Patient'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Add New Patient</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Condition</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Recovery Period</label>
              <input
                type="text"
                name="recoveryPeriod"
                value={formData.recoveryPeriod}
                onChange={handleAddChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Box Color (Hex Code)</label>
            <input
              type="color"
              name="boxColor"
              value={formData.boxColor}
              onChange={handleAddChange}
              className="mt-1 h-10 w-16 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Movements Done */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Movements Done</label>
              <button
                type="button"
                onClick={() => addMovementField(false)}
                className="text-sm bg-green-500 text-white px-2 py-1 rounded"
              >
                Add Movement
              </button>
            </div>
            {formData.movementsDone.map((movement, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={movement}
                  onChange={(e) => handleMovementsChange(index, e.target.value, false)}
                  className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
                  placeholder={`Movement ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeMovementField(index, false)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Images */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  images: [...prev.images, { id: Date.now(), url: '', description: '' }]
                }))}
                className="text-sm bg-green-500 text-white px-2 py-1 rounded"
              >
                Add Image
              </button>
            </div>
            {formData.images.map((image, index) => (
              <div key={image.id} className="mt-2 p-2 border rounded">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600">Image {index + 1}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index, false)}
                    className="mt-1"
                  />
                  {image.url && (
                    <img 
                      src={image.url} 
                      alt={`Preview ${index + 1}`} 
                      className="mt-2 h-24 w-24 object-cover border rounded"
                    />
                  )}
                  <input
                    type="text"
                    value={image.description}
                    onChange={(e) => {
                      const updated = [...formData.images];
                      updated[index].description = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        images: updated
                      }));
                    }}
                    placeholder="Image description"
                    className="mt-2 border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Videos */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Videos</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  videos: [...prev.videos, { id: Date.now(), url: '', description: '' }]
                }))}
                className="text-sm bg-green-500 text-white px-2 py-1 rounded"
              >
                Add Video
              </button>
            </div>
            {formData.videos.map((video, index) => (
              <div key={video.id} className="mt-2 p-2 border rounded">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600">Video {index + 1}</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoUpload(e, index, false)}
                    className="mt-1"
                  />
                  {video.url && (
                    <video 
                      src={video.url} 
                      controls
                      className="mt-2 h-24 w-24 object-cover border rounded"
                    />
                  )}
                  <input
                    type="text"
                    value={video.description}
                    onChange={(e) => {
                      const updated = [...formData.videos];
                      updated[index].description = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        videos: updated
                      }));
                    }}
                    placeholder="Video description"
                    className="mt-2 border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Patient
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
        <h3 className="text-lg font-medium text-gray-800">Existing Patient Records</h3>
        {patientsList.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            {editingId === item.id ? (
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-3">Edit Patient: {item.patientName}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                    <input
                      type="text"
                      name="patientName"
                      value={editFormData.patientName}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <input
                      type="text"
                      name="condition"
                      value={editFormData.condition}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recovery Period</label>
                    <input
                      type="text"
                      name="recoveryPeriod"
                      value={editFormData.recoveryPeriod}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Box Color (Hex Code)</label>
                  <input
                    type="color"
                    name="boxColor"
                    value={editFormData.boxColor}
                    onChange={handleEditChange}
                    className="mt-1 h-10 w-16 border border-gray-300 rounded-md"
                  />
                </div>
                
                {/* Movements Done */}
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Movements Done</label>
                    <button
                      type="button"
                      onClick={() => addMovementField(true)}
                      className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Add Movement
                    </button>
                  </div>
                  {editFormData.movementsDone.map((movement, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <input
                        type="text"
                        value={movement}
                        onChange={(e) => handleMovementsChange(index, e.target.value, true)}
                        className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
                        placeholder={`Movement ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeMovementField(index, true)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Images */}
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <button
                      type="button"
                      onClick={() => setEditFormData(prev => ({
                        ...prev,
                        images: [...prev.images, { id: Date.now(), url: '', description: '' }]
                      }))}
                      className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Add Image
                    </button>
                  </div>
                  {editFormData.images.map((image, index) => (
                    <div key={image.id} className="mt-2 p-2 border rounded">
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Image {index + 1}</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index, true)}
                          className="mt-1"
                        />
                        {image.url && (
                          <img 
                            src={image.url} 
                            alt={`Preview ${index + 1}`} 
                            className="mt-2 h-24 w-24 object-cover border rounded"
                          />
                        )}
                        <input
                          type="text"
                          value={image.description}
                          onChange={(e) => {
                            const updated = [...editFormData.images];
                            updated[index].description = e.target.value;
                            setEditFormData(prev => ({
                              ...prev,
                              images: updated
                            }));
                          }}
                          placeholder="Image description"
                          className="mt-2 border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Videos */}
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Videos</label>
                    <button
                      type="button"
                      onClick={() => setEditFormData(prev => ({
                        ...prev,
                        videos: [...prev.videos, { id: Date.now(), url: '', description: '' }]
                      }))}
                      className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Add Video
                    </button>
                  </div>
                  {editFormData.videos.map((video, index) => (
                    <div key={video.id} className="mt-2 p-2 border rounded">
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Video {index + 1}</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleVideoUpload(e, index, true)}
                          className="mt-1"
                        />
                        {video.url && (
                          <video 
                            src={video.url} 
                            controls
                            className="mt-2 h-24 w-24 object-cover border rounded"
                          />
                        )}
                        <input
                          type="text"
                          value={video.description}
                          onChange={(e) => {
                            const updated = [...editFormData.videos];
                            updated[index].description = e.target.value;
                            setEditFormData(prev => ({
                              ...prev,
                              videos: updated
                            }));
                          }}
                          placeholder="Video description"
                          className="mt-2 border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                  ))}
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
                <h4 className="text-lg font-semibold text-gray-800">{item.patientName}</h4>
                <p className="text-gray-600"><strong>Condition:</strong> {item.condition}</p>
                <p className="text-gray-600"><strong>Treatment:</strong> {item.treatment}</p>
                <p className="text-gray-600"><strong>Recovery Period:</strong> {item.recoveryPeriod}</p>
                
                <div className="mt-2">
                  <p className="text-gray-700"><strong>Movements Done:</strong></p>
                  <ul className="list-disc list-inside">
                    {item.movementsDone.map((movement, idx) => (
                      <li key={idx} className="text-gray-600">{movement}</li>
                    ))}
                  </ul>
                </div>
                
                {item.images && item.images.length > 0 && (
                  <div className="mt-2">
                    <p className="text-gray-700"><strong>Images:</strong> {item.images.length}</p>
                    <div className="flex flex-wrap mt-2 gap-2">
                      {item.images.slice(0, 3).map((image, idx) => (
                        <img 
                          key={image.id || idx} 
                          src={image.url} 
                          alt={image.description} 
                          className="h-16 w-16 object-cover border rounded"
                        />
                      ))}
                      {item.images.length > 3 && (
                        <span className="text-gray-500">+{item.images.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
                
                {item.videos && item.videos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-gray-700"><strong>Videos:</strong> {item.videos.length}</p>
                  </div>
                )}
                
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

export default PatientManagement;