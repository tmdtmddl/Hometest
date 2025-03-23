import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AUTH } from ".";
import { authService, db, FBCollection } from "../lib/firebase";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(AUTH.initialState.user);
  const [initialized, setInitialized] = useState(false);

  const fetchUser = useCallback(async (uid: string) => {
    const snap = await db.collection(FBCollection.USERS).doc(uid).get();
    const data = snap.data() as null | User;

    if (!data) {
      return;
    }
    setUser(data);
  }, []);

  useEffect(() => {
    const subscribe = authService.onAuthStateChanged((fbUser) => {
      if (!fbUser) {
        return setUser(null);
      } else {
        fetchUser(fbUser.uid);
      }
      setTimeout(() => setInitialized(true), 1000);
    });

    subscribe;

    return subscribe;
  }, [fetchUser]);

  const signup = useCallback(
    async (
      newUser: User,
      password: string
    ): Promise<{ success?: boolean; message?: string }> => {
      try {
        //파이어베이스에서 유저가 회원가입하는 로직
        const { user } = await authService.createUserWithEmailAndPassword(
          newUser.email,
          password
        );
        if (!user) {
          return { success: false, message: "실패" };
        }
        const storedUser: User = { ...newUser, uid: user.uid };

        await db.collection(FBCollection.USERS).doc(user.uid).set(storedUser);

        setUser(storedUser);
        return { success: true };
      } catch (error: any) {
        return { success: false, message: error.message };
      }
    },
    []
  );

  return (
    <AUTH.Context.Provider value={{ user, initialized, signup }}>
      {children}
    </AUTH.Context.Provider>
  );
};
