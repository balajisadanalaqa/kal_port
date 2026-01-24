import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";

// Fetch data from a collection
export const fetchCollection = async (name) => {
  try {
    const q = query(collection(db, name), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching ${name}:`, error);
    throw error;
  }
};

// Add a new document to a collection
export const addDocument = async (name, data) => {
  try {
    const docRef = await addDoc(collection(db, name), {
      ...data,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding to ${name}:`, error);
    throw error;
  }
};

// Update an existing document
export const updateDocument = async (name, id, data) => {
  try {
    const docRef = doc(db, name, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating ${name} with id ${id}:`, error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (name, id) => {
  try {
    const docRef = doc(db, name, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting ${name} with id ${id}:`, error);
    throw error;
  }
};