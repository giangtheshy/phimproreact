import React, { useState, useContext, useEffect, useCallback } from "react";

import db, { auth } from "./firebase";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [films, setFilms] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const fetchFilms = useCallback(async () => {
    await db.collection("films").onSnapshot((snapshot) => setFilms(snapshot.docs.map((doc) => doc.data())));
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(`${user.uid}`)
          .get()
          .then((doc) => setUser(doc.data()));
      }
    });
    fetchFilms();
  }, [fetchFilms]);
  useEffect(() => {
    if (user && user.uid === "qJJA1TDBfzdMXi4380OzfK5Eopw2") {
      setRole("admin");
    } else {
      setRole("");
    }
  }, [user]);
  console.log(role);
  return (
    <AppContext.Provider value={{ user, setUser, role, films, isEdit, setIsEdit }}>{children}</AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export { AppProvider };