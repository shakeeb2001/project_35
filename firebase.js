// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
import { getStorage, ref} from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByHB1HrBE1VZ7OUpmw6-hRmlu0YIHHGpM",
  authDomain: "lsmnsbm.firebaseapp.com",
  projectId: "lsmnsbm",
  storageBucket: "lsmnsbm.appspot.com",
  messagingSenderId: "1082642229470",
  appId: "1:1082642229470:web:5d5df66e9d38da92fa3a4f"
};


// Initialize Firebase
let app
if (firebase.apps.length === 0) 
{
app = firebase.initializeApp(firebaseConfig) ;
}

else 
{ 
    app = firebase.app()
}
const auth = firebase.auth ()

export { auth };
export const storage = getStorage (app);