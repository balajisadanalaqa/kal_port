import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export const uploadFile = async (file, folder) => {
  try {
    const fileName = `${folder}/${file.name}-${Date.now()}`;
    const fileRef = ref(storage, fileName);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (fileUrl) => {
  try {
    // Extract the file path from the URL to create a reference
    // The URL format is typically like: https://firebasestorage.googleapis.com/v0/b/kalrt.appspot.com/o/folder/filename.jpg?...
    const url = new URL(fileUrl);
    const pathname = url.pathname;
    const pathStart = pathname.indexOf('/o/') + 3; // Skip '/o/'
    const filePath = pathname.substring(pathStart);
    const fileRef = ref(storage, decodeURIComponent(filePath));
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};