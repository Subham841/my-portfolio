'use client';
import { createContext, useContext } from 'react';

import { getFirebase } from '.';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

type FirebaseContextType = {
  auth: Auth;
  firestore: Firestore;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { auth, firestore } = getFirebase();

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        firestore,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
