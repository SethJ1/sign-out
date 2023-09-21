import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import signOut as firebaseSignOut from 'firebase/auth'.
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm9ziukZyWUWBqMK3R2LPqiG8UiSG5V9w",
  authDomain: "devlink-marketplace-fd67d.firebaseapp.com",
  projectId: "devlink-marketplace-fd67d",
  storageBucket: "devlink-marketplace-fd67d.appspot.com",
  messagingSenderId: "1061929378730",
  appId: "1:1061929378730:web:98c4d490fbc2b7bb2dc1d3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const storage = getStorage(firebaseApp); // Initialize Firebase Storage

// Function to get the current user
export const getCurrentUser = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    }, reject);
  });
};

// Example export of signOut function
export const signOut = () => {
  return firebaseSignOut(auth); // Use firebaseSignOut to sign out the user.
};

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth.email) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error in creating user document', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createJobInFirebase = async (jobData) => {
  try {
    const jobsCollectionRef = collection(db, 'jobs');
    await addDoc(jobsCollectionRef, jobData);
    console.log('Job created successfully');
  } catch (error) {
    console.log('Error creating job', error.message);
  }
};

export const uploadImageAndGetURL = async (image) => {
  const imageRef = ref(storage, 'job_images/' + image.name);

  return new Promise(async (resolve, reject) => {
    try {
      // Upload the image to Firebase Storage
      const uploadTask = await uploadBytes(imageRef, image);

      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(uploadTask.ref);
      resolve(downloadURL);
    } catch (error) {
      reject(error);
    }
  });
};
