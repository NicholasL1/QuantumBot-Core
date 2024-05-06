import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1Bf8MJ7Tsld3nyOLXefdOquKJ0h3eobo",
  authDomain: "radical-firebase.firebaseapp.com",
  projectId: "radical-firebase",
  storageBucket: "radical-firebase.appspot.com",
  messagingSenderId: "980130967825",
  appId: "1:980130967825:web:2cf2ff6ea3dcee5eed1cb0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);