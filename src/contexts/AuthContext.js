import React, { useEffect, useState, useCallback } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = React.createContext({ user: null, logout: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 되었습니다.");
      })
      .catch((error) => {
        console.error("로그아웃 실패: ", error);
      });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
