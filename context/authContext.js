import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { db, auth } from "@/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearStates = () => {
    setCurrentUser(null);
    setIsLoading(false);
  };

  const signOut = () => {
    authSignOut(auth).then(() => {
      clearStates();
    });
  };
  const authStateChanged = async (user) => {
    setIsLoading(true);

    if (!user) {
      return clearStates();
    }
    const userDoc = await getDoc(doc(db, "users", user.uid));
    setCurrentUser(userDoc.data());
    setIsLoading(false);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, setIsLoading, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
