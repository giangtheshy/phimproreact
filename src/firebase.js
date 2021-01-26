import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCln_3vggZ3EC5Q9oCluWscDS08WWwdrkg",
  authDomain: "webphim-7ec17.firebaseapp.com",
  projectId: "webphim-7ec17",
  storageBucket: "webphim-7ec17.appspot.com",
  messagingSenderId: "885568892840",
  appId: "1:885568892840:web:d9cbe3b71fd18238df379d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, storage };
export default db;
