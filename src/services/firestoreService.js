import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { uploadFileToStorage, deleteFileFromStorage, uploadMultipleFilesToStorage, getDownloadUrlForFile } from "../firebase/storageHelpers";

/**
 * Firestore Service
 * Contains utility functions for Firestore operations
 */

// Patient-related functions
const addPatient = async (patientData) => {
  try {
    const docRef = await addDoc(collection(db, "patients"), patientData);
    console.log("Patient added with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding patient: ", error);
    return { success: false, error: error.message };
  }
};

const addPatientWithFiles = async (patientData) => {
  try {
    // Define which fields are file fields
    const fileFields = ['photo', 'beforeAfterImages'];

    // Process file uploads
    const updatedData = { ...patientData };
    for (const field of fileFields) {
      if (patientData[field]) {
        if (field === 'beforeAfterImages' && Array.isArray(patientData[field]) && patientData[field][0] instanceof File) {
          // Handle multiple files
          const result = await uploadMultipleFilesToStorage(patientData[field], 'patients');
          if (result.success) {
            updatedData[field] = result.urls;
          } else {
            return { success: false, error: `Error uploading ${field}: ${result.error}` };
          }
        } else if (patientData[field] instanceof File) {
          // Handle single file
          const result = await uploadFileToStorage(patientData[field], 'patients');
          if (result.success) {
            updatedData[field] = result.url;
            updatedData[`${field}FileName`] = result.fileName;
          } else {
            return { success: false, error: `Error uploading ${field}: ${result.error}` };
          }
        }
      }
    }

    const docRef = await addDoc(collection(db, "patients"), updatedData);
    console.log("Patient added with files, ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding patient with files: ", error);
    return { success: false, error: error.message };
  }
};

const getPatients = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "patients"));
    const patients = [];
    querySnapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: patients };
  } catch (error) {
    console.error("Error getting patients: ", error);
    return { success: false, error: error.message };
  }
};

const getPatientById = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "patients", id));
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Patient not found" };
    }
  } catch (error) {
    console.error("Error getting patient: ", error);
    return { success: false, error: error.message };
  }
};

const updatePatient = async (id, patientData) => {
  try {
    await updateDoc(doc(db, "patients", id), patientData);
    return { success: true };
  } catch (error) {
    console.error("Error updating patient: ", error);
    return { success: false, error: error.message };
  }
};

const deletePatient = async (id) => {
  try {
    await deleteDoc(doc(db, "patients", id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting patient: ", error);
    return { success: false, error: error.message };
  }
};

const getPatientsByField = async (field, operator, value) => {
  try {
    const q = query(collection(db, "patients"), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const patients = [];
    querySnapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: patients };
  } catch (error) {
    console.error("Error getting patients by field: ", error);
    return { success: false, error: error.message };
  }
};

// Generic functions for other collections
const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: documents };
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

const getDocumentById = async (collectionName, id) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, id));
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Document not found" };
    }
  } catch (error) {
    console.error(`Error getting document from ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

const updateDocument = async (collectionName, id, data) => {
  try {
    await updateDoc(doc(db, collectionName, id), data);
    return { success: true };
  } catch (error) {
    console.error(`Error updating document in ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

const deleteDocument = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return { success: true };
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

// Functions for handling documents with file uploads
const addDocumentWithFiles = async (collectionName, data, fileFields) => {
  try {
    // Process file uploads
    const updatedData = { ...data };
    const fileUploadResults = [];

    for (const field of fileFields) {
      if (data[field] && data[field] instanceof File) {
        const result = await uploadFileToStorage(data[field], collectionName);
        if (result.success) {
          updatedData[field] = result.url;
          updatedData[`${field}FileName`] = result.fileName; // Store original filename
        } else {
          return { success: false, error: `Error uploading ${field}: ${result.error}` };
        }
      } else if (Array.isArray(data[field]) && data[field].length > 0 && data[field][0] instanceof File) {
        // Handle multiple files
        const result = await uploadMultipleFilesToStorage(data[field], collectionName);
        if (result.success) {
          updatedData[field] = result.urls;
        } else {
          return { success: false, error: `Error uploading ${field}: ${result.error}` };
        }
      }
    }

    // Add document with updated data (file URLs instead of file objects)
    const docRef = await addDoc(collection(db, collectionName), updatedData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(`Error adding document with files to ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

const updateDocumentWithFiles = async (collectionName, id, data, fileFields) => {
  try {
    // Process file uploads
    const updatedData = { ...data };
    const filesToDelete = [];

    for (const field of fileFields) {
      if (data[field] && data[field] instanceof File) {
        // If there's a new file, we might want to delete the old one
        // First, get the current document to check for existing file URLs
        const docSnap = await getDoc(doc(db, collectionName, id));
        if (docSnap.exists()) {
          const currentData = docSnap.data();
          if (currentData[field] && currentData[`${field}FileName`]) {
            // Construct the path to delete the old file
            filesToDelete.push(`${collectionName}/${currentData[`${field}FileName`]}`);
          }
        }

        // Upload the new file
        const result = await uploadFileToStorage(data[field], collectionName);
        if (result.success) {
          updatedData[field] = result.url;
          updatedData[`${field}FileName`] = result.fileName;
          // Remove the file object from the update data
          delete updatedData[field]; // This will be re-added with the URL
        } else {
          return { success: false, error: `Error uploading ${field}: ${result.error}` };
        }
      }
    }

    // Delete old files if new ones were uploaded
    for (const filePath of filesToDelete) {
      await deleteFileFromStorage(filePath);
    }

    // Update document with updated data (file URLs instead of file objects)
    await updateDoc(doc(db, collectionName, id), updatedData);
    return { success: true };
  } catch (error) {
    console.error(`Error updating document with files in ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

// Function to fix URLs in existing documents (for documents that have incorrect URLs)
const fixDocumentUrls = async (collectionName, id, urlFields) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, id));
    if (!docSnap.exists()) {
      return { success: false, error: "Document not found" };
    }

    const currentData = docSnap.data();
    const updatedData = { ...currentData };

    for (const field of urlFields) {
      if (currentData[field] && typeof currentData[field] === 'string') {
        // Check if the URL is in the wrong format (contains ?name= instead of ?alt=media)
        if (currentData[field].includes('?name=') && !currentData[field].includes('alt=media')) {
          // Extract the file path from the URL
          const urlParts = currentData[field].split('?name=');
          if (urlParts.length > 1) {
            const filePath = urlParts[1];
            // Get the correct download URL
            const result = await getDownloadUrlForFile(decodeURIComponent(filePath));
            if (result.success) {
              updatedData[field] = result.url;
            }
          }
        }
      }
    }

    // Update the document with corrected URLs
    await updateDoc(doc(db, collectionName, id), updatedData);
    return { success: true };
  } catch (error) {
    console.error(`Error fixing URLs in document ${id} in ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};

export {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientsByField,
  addPatientWithFiles,
  addDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  addDocumentWithFiles,
  updateDocumentWithFiles,
  fixDocumentUrls
};