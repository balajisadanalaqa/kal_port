# Firestore Integration Guide

This project includes a complete Firebase Firestore integration for managing dynamic data. The implementation includes:

## Features

- **Patient Management**: Add, retrieve, update, and delete patient records
- **Generic Firestore Operations**: Reusable functions for any collection
- **Error Handling**: Comprehensive error handling for all operations
- **Admin Interface**: Patient management interface in the admin panel

## Setup

1. Make sure your Firebase configuration is complete in the `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

2. Install dependencies:
   ```bash
   npm install firebase
   ```

## Usage

### Adding a Patient

```javascript
import { addPatient } from './services/firestoreService';

const patientData = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 35,
  medicalHistory: 'Patient has a history of hypertension',
  createdAt: new Date()
};

const result = await addPatient(patientData);
if (result.success) {
  console.log('Patient added with ID:', result.id);
}
```

### Retrieving Patients

```javascript
import { getPatients } from './services/firestoreService';

const result = await getPatients();
if (result.success) {
  console.log('Patients:', result.data);
}
```

### Adding a Patient with Files

```javascript
import { addPatientWithFiles } from './services/firestoreService';

const patientData = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 35,
  medicalHistory: 'Patient has a history of hypertension',
  photo: fileObject, // File object from input
  beforeAfterImages: [file1, file2], // Array of file objects
  createdAt: new Date()
};

const result = await addPatientWithFiles(patientData);
if (result.success) {
  console.log('Patient with files added with ID:', result.id);
}
```

### Other Operations

The `firestoreService.js` file includes these functions:

- `addPatient(patientData)` - Add a new patient
- `addPatientWithFiles(patientData)` - Add a patient with file uploads (photo, before/after images)
- `getPatients()` - Get all patients
- `getPatientById(id)` - Get a specific patient
- `updatePatient(id, patientData)` - Update a patient
- `deletePatient(id)` - Delete a patient
- `getPatientsByField(field, operator, value)` - Query patients by field

Generic functions for any collection:
- `addDocument(collectionName, data)`
- `addDocumentWithFiles(collectionName, data, fileFields)` - Add document with file uploads
- `getDocuments(collectionName)`
- `getDocumentById(collectionName, id)`
- `updateDocument(collectionName, id, data)`
- `updateDocumentWithFiles(collectionName, id, data, fileFields)` - Update document with file uploads
- `deleteDocument(collectionName, id)`

### File Upload Functions

The system includes Firebase Storage integration:

- `uploadFileToStorage(file, folder)` - Upload single file to Firebase Storage
- `uploadMultipleFilesToStorage(files, folder)` - Upload multiple files
- `deleteFileFromStorage(filePath)` - Delete file from storage

## Security Rules

Make sure your Firestore and Firebase Storage security rules are properly configured. For development, you might use:

Firestore:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

Storage:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

⚠️ **Important**:
- Firestore rules control access to your document data
- Storage rules control access to your uploaded files
- Both are required for proper functionality
- The storage rules are especially important for resolving CORS errors when displaying images
- Update the rules for production to be more restrictive based on your security requirements

## Admin Interface

The patient management interface is available in the admin panel at `/admin/dashboard/patients`. It includes:

- Form to add new patients
- Table showing all patients
- Delete functionality
- Real-time data fetching

## Collections Structure

The system creates collections automatically. For example, when you add a patient, it creates the `patients` collection if it doesn't exist.