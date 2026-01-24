import React, { useState, useEffect } from 'react';
import PatientForm from '../../components/PatientForm';
import { getPatients, deletePatient, fixDocumentUrls } from '../../services/firestoreService';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const result = await getPatients();
    if (result.success) {
      setPatients(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      const result = await deletePatient(id);
      if (result.success) {
        fetchPatients(); // Refresh the list
      } else {
        alert(`Error deleting patient: ${result.error}`);
      }
    }
  };

  const handleFixUrls = async (id) => {
    const result = await fixDocumentUrls('patients', id, ['photo', 'beforeAfterImages']);
    if (result.success) {
      alert('URLs fixed successfully!');
      fetchPatients(); // Refresh the list
    } else {
      alert(`Error fixing URLs: ${result.error}`);
    }
  };

  if (loading) return <div className="text-center py-10">Loading patients...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Patient Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Patient</h2>
          <PatientForm />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Patient List</h2>
          {patients.length === 0 ? (
            <p className="text-gray-600">No patients found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Name</th>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Age</th>
                    <th className="py-2 px-4 border-b text-left">Photo</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{patient.name}</td>
                      <td className="py-2 px-4 border-b">{patient.email}</td>
                      <td className="py-2 px-4 border-b">{patient.age}</td>
                      <td className="py-2 px-4 border-b">
                        {patient.photo ? (
                          <img
                            src={patient.photo}
                            alt={patient.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              console.log('Image failed to load:', patient.photo);
                            }}
                          />
                        ) : (
                          <span className="text-gray-400">No photo</span>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="text-red-500 hover:text-red-700 mr-4"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleFixUrls(patient.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Fix URLs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;