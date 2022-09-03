import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCf2JftT4fxTlZ1OiSrA9jNTXFkykNBJo",
    authDomain: "labbooking-2f8a1.firebaseapp.com",
    projectId: "labbooking-2f8a1",
    storageBucket: "labbooking-2f8a1.appspot.com",
    messagingSenderId: "793690762220",
    appId: "1:793690762220:web:b358ed4b7f6b6be6902ec9"
  };



// initialize firebase app
const app = initializeApp(firebaseConfig);
 
// export
export const auth = getAuth(app);
 
export const googleAuthProvider = new GoogleAuthProvider();


