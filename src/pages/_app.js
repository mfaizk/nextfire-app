import "@/styles/globals.css";
import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "lib/context";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "lib/firebase";
import { useUserData } from "lib/hooks";
export default function App({ Component, pageProps }) {
  const { user, username } = useUserData();
  return (
    <>
      <UserContext.Provider value={{ user, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}
