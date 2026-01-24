# Firebase Integration for Dynamic Data

This document describes how to integrate Firebase into the React portfolio project to support:

✅ Admin login
✅ Dynamic data storage
✅ File uploads
✅ Live content on frontend
✅ Hosted on Netlify

---

## 1. Firebase Setup

### Create Firebase Project
1. Go to: https://console.firebase.google.com
2. Click **Add Project** → give it a name (e.g., *Portfolio Backend*)
3. Enable:
   - **Firestore Database**
   - **Authentication (Email/Password)**
   - **Storage**

---

## 2. Install Firebase SDK

Inside the React project directory:

```bash
npm install firebase
```

---

## 3. Add Firebase Config

Create:
```
src/firebase.js
```

Paste:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_APIKEY",
  authDomain: "YOUR_AUTHDOMAIN",
  projectId: "YOUR_PROJECTID",
  storageBucket: "YOUR_STORAGEBUCKET",
  messagingSenderId: "YOUR_MESSAGINGID",
  appId: "YOUR_APPID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
```

Replace config values with Firebase Console → Project Settings.

---

## 4. Admin Authentication

### Login Function

```js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

Use in React, e.g.,

```jsx
<form onSubmit={handleLogin}>
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Login</button>
</form>
```

---

## 5. Firestore – Dynamic Data

Collections will replace static files.

### Suggested Collections
| Section     | Firestore Collection |
|-------------|----------------------|
| Patients    | `patients`           |
| Reviews     | `reviews`            |
| Education   | `education`          |
| Experience  | `experience`         |
| About Info  | `about`              |

### Fetch Data Example

```js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchCollection = async (name) => {
  const querySnapshot = await getDocs(collection(db, name));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

---

## 6. File Uploads (Images & Videos)

### Upload Function

```js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile = async (file, folder) => {
  const fileRef = ref(storage, `${folder}/${file.name}-${Date.now()}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
```

---

## 7. Add Data via Forms

Example: Add Patient

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const file = e.target.photo.files[0];
  const photoUrl = await uploadFile(file, "patients");

  await addDoc(collection(db, "patients"), {
    name: e.target.name.value,
    desc: e.target.desc.value,
    photoUrl,
  });
};
```

---

## 8. Delete & Update

Delete:

```js
import { doc, deleteDoc } from "firebase/firestore";
export const deleteItem = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};
```

Update:

```js
import { doc, updateDoc } from "firebase/firestore";
export const updateItem = async (collectionName, id, data) => {
  const ref = doc(db, collectionName, id);
  await updateDoc(ref, data);
};
```

---

## 9. Firestore Rules

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

---

## 10. Deploy

No backend server. Just:

```
npm run build
```

Deploy on Netlify.

---

## 11. Replace Static Imports

Instead of:

```js
import { education } from "./data";
```

Use Firestore:

```js
const [education, setEducation] = useState([]);
useEffect(() => {
  fetchCollection("education").then(setEducation);
}, []);
```

---

✔ All dynamic content stored in Firestore
✔ Images stored in Firebase Storage
✔ Admin login protects editing
✔ Free tier covers usage

```
