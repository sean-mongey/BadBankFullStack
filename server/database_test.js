// firebase_test.js
import { db } from './firebase.js';  //***** Import Firestore from the Firebase setup
import { collection, addDoc, getDocs } from 'firebase/firestore';  //***** Import Firestore functions

async function run() {
    try {
        console.log("Connected successfully to Firebase");

        // Generate a new user
        const name = 'user' + Math.floor(Math.random() * 10000);
        const email = `${name}@mit.edu`;

        // Insert into the users collection
        const docRef = await addDoc(collection(db, 'customers'), { name, email });

        console.log('Document inserted with ID:', docRef.id);

        // Retrieve all documents in the customers collection
        const querySnapshot = await getDocs(collection(db, 'customers'));
        const customers = querySnapshot.docs.map(doc => doc.data());
        console.log('Collection:', customers);

    } catch (err) {
        console.error('An error occurred:', err);
    }
}

run().catch(console.dir);
