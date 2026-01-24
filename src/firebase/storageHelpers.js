import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

/**
 * Firebase Storage Helper Functions
 * For uploading and managing files in Firebase Storage
 */

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} folder - The folder/path in storage to upload to
 * @returns {Promise<Object>} - Object containing success status, URL and filename
 */
export const uploadFileToStorage = async (file, folder) => {
  try {
    // Create a unique filename using timestamp
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL - this should return the proper URL with alt=media&token=
    const downloadURL = await getDownloadURL(storageRef);

    // Verify the URL has the correct format
    if (!downloadURL.includes('alt=media')) {
      console.warn('Generated URL might not be a proper download URL:', downloadURL);
    }

    return { success: true, url: downloadURL, fileName };
  } catch (error) {
    console.error("Error uploading file: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a file from Firebase Storage
 * @param {string} filePath - The path of the file to delete in storage
 * @returns {Promise<boolean>} - Whether the deletion was successful
 */
export const deleteFileFromStorage = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting file: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Upload multiple files to Firebase Storage
 * @param {FileList} files - List of files to upload
 * @param {string} folder - The folder/path in storage to upload to
 * @returns {Promise<Array>} - Array of download URLs
 */
export const uploadMultipleFilesToStorage = async (files, folder) => {
  try {
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadPromises.push(uploadFileToStorage(file, folder));
    }

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(result => result.success);
    const urls = successfulUploads.map(result => result.url);

    return { success: true, urls, errors: results.filter(result => !result.success) };
  } catch (error) {
    console.error("Error uploading multiple files: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get a proper download URL for an existing file in Firebase Storage
 * @param {string} filePath - The path of the file in storage
 * @returns {Promise<string>} - The proper download URL
 */
export const getDownloadUrlForFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(fileRef);

    // Verify the URL has the correct format
    if (!downloadURL.includes('alt=media')) {
      console.warn('Generated URL might not be a proper download URL:', downloadURL);
    }

    return { success: true, url: downloadURL };
  } catch (error) {
    console.error("Error getting download URL: ", error);
    return { success: false, error: error.message };
  }
};

