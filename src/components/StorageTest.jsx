import React, { useState } from 'react';
import { uploadFileToStorage } from '../firebase/storageHelpers';

const StorageTest = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    
    const uploadResult = await uploadFileToStorage(file, 'test');
    
    if (uploadResult.success) {
      setResult(uploadResult);
      console.log('Upload successful:', uploadResult.url);
    } else {
      setError(uploadResult.error);
      console.error('Upload failed:', uploadResult.error);
    }
    
    setUploading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Storage Test</h2>
      
      <div className="mb-4">
        <input 
          type="file" 
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700"
        />
      </div>
      
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {result && result.success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          <p><strong>Success!</strong></p>
          <p><strong>URL:</strong> <a href={result.url} target="_blank" rel="noopener noreferrer" className="underline">{result.url}</a></p>
          <p><strong>File Name:</strong> {result.fileName}</p>
          <div className="mt-2">
            <p><strong>Preview:</strong></p>
            <img 
              src={result.url} 
              alt="Uploaded preview" 
              className="max-w-xs max-h-64 border rounded"
              onError={(e) => console.log('Image failed to load:', e)}
              onLoad={() => console.log('Image loaded successfully')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageTest;