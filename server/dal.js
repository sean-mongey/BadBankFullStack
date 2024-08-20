//dal.js
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore"; //***** Import necessary Firestore functions

// Create user account
async function create(name, email, password) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
      password,
      balance: 0,
      role: "client",
    });
    return { id: docRef.id, name, email, password, balance: 0 };
  } catch (e) {
    throw new Error("Error adding document: " + e.message);
  }
}

// Find user account
async function find(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let users = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
}

// Find one user by email
async function findOne(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let user = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
}
//This updates account balances Deposit/Withdraw/Transfer
async function update(email, amount) {
  const collectionRef = collection(db, "users");

  const q = query(collectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  let userDoc = null;
  querySnapshot.forEach((doc) => {
    userDoc = doc;
  });

  if (userDoc) {
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, {
      balance: userDoc.data().balance + amount,
    });

    return await getDoc(userRef);
  } else {
    throw new Error("User not found");
  }
}

// Get balance of a user
async function getBalance(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let userBalance = null;
  querySnapshot.forEach((doc) => {
    userBalance = doc.data().balance;
  });

  return userBalance;
}

// Get all users
async function all() {
  const querySnapshot = await getDocs(collection(db, "users"));
  let users = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
}

// Get transaction history
async function getTransactionHistory(email) {
  try {
    const q = query(
      collection(db, "transactions"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    // Collect all transactions in an array
    let transactions = [];
    querySnapshot.forEach((doc) => {
      transactions.push(doc.data());
    });

    // Sort transactions by timestamp descending @@@@@
    transactions.sort((a, b) => b.timestamp - a.timestamp);

    return transactions;
  } catch (error) {
    throw new Error("Failed to retrieve transaction history");
  }
}

// Record a transaction
async function recordTransaction(email, amount, type, timestamp) {
  try {
    // Use the provided timestamp or the current date and time
    const currentTimestamp = timestamp || new Date();

    // Extract date and time from the timestamp
    const date = currentTimestamp.toISOString().split("T")[0]; // YYYY-MM-DD format
    const time = currentTimestamp.toISOString().split("T")[1].split(".")[0]; // HH:MM:SS format

    // Add a new document in the 'transactions' collection
    const docRef = await addDoc(collection(db, "transactions"), {
      email,
      amount,
      type,
      date, // Separate date field
      time, // Separate time field
    });

    return { id: docRef.id, email, amount, type, date, time };
  } catch (e) {
    throw new Error("Error recording transaction: " + e.message);
  }
}

export {
  create,
  find,
  findOne,
  update,
  all,
  getBalance,
  getTransactionHistory,
  recordTransaction,
};
