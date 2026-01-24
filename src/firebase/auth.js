import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Store the user in localStorage to persist the session
    localStorage.setItem('isAdminLoggedIn', 'true');
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message);
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = '/admin/login';
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error(error.message);
  }
};

export const checkAdminAuth = () => {
  return localStorage.getItem('isAdminLoggedIn') === 'true';
};