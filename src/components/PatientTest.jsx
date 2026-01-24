import React, { useState, useEffect } from 'react';
import { addPatient, getPatients, deletePatient } from '../services/firestoreService';

const PatientTest = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const result = await getPatients();
    if (result.success) {
      setPatients(result.data);
    } else {
      setMessage(`Error: ${result.error}`);
    }
    setLoading(false);
  };

  const addTestPatient = async () => {
    setLoading(true);
    setMessage('');
    
    const testPatient = {
      name: 'Test Patient',
      email: 'test@example.com',
      age: 30,
      medicalHistory: 'Test patient for verification',
      createdAt: new Date()
    };

    const result = await addPatient(testPatient);
    
    if (result.success) {
      setMessage(`Test patient added with ID: ${result.id}`);
      fetchPatients(); // Refresh the list
    } else {
      setMessage(`Error: ${result.error}`);
    }
    
    setLoading(false);
  };

  const deletePatientById = async (id) => {
    if (window.confirm('Are you sure you want to delete this test patient?')) {
      setLoading(true);
      const result = await deletePatient(id);
      if (result.success) {
        setMessage('Patient deleted successfully');
        fetchPatients(); // Refresh the list
      } else {
        setMessage(`Error deleting patient: ${result.error}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Firestore Test</h2>
      
      <div className="mb-4">
        <button
          onClick={addTestPatient}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Add Test Patient
        </button>
      </div>
      
      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}
      
      {loading && <div className="mb-4">Loading...</div>}
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Current Patients ({patients.length})</h3>
        {patients.length > 0 ? (
          <ul className="space-y-2">
            {patients.map(patient => (
              <li key={patient.id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{patient.name}</span> - {patient.email} - Age: {patient.age}
                </div>
                <button
                  onClick={() => deletePatientById(patient.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientTest;