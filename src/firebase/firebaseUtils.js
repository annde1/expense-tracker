import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { firestore } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (err) {
    throw err;
  }
};
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user.user;
  } catch (err) {
    throw err;
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (err) {
    throw err;
  }
};

export const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (err) {
    throw err;
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};

export const createNewExpense = async (expense) => {
  try {
    const docRef = await addDoc(collection(firestore, "expenses"), expense);
    return docRef;
  } catch (err) {
    throw err;
  }
};

export const fetchUserExpenses = async (userId) => {
  try {
    const q = query(
      collection(firestore, "expenses"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const expensesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return expensesData;
  } catch (err) {
    throw err;
  }
};

export const fetchExpenseById = async (expenseId) => {
  try {
    const docRef = doc(firestore, "expenses", expenseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Document Not Found.");
    }
  } catch (err) {
    throw err;
  }
};

export const editExpense = async (expenseId, expenseData) => {
  try {
    const docRef = doc(firestore, "expenses", expenseId);
    await updateDoc(docRef, expenseData);
    return "Expense updated";
  } catch (err) {
    throw err;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const docRef = doc(firestore, "expenses", expenseId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    throw err;
  }
};
