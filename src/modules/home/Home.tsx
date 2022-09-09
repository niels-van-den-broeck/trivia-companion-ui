import { useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';

import { FirebaseAuth } from 'react-firebaseui';

import { useAuthentication } from "@context/AuthContext";

import { loginCallback } from "@api/login";

import logo from "@assets/logo.png";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and email as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};


export default function Home() {
  const { user, setUser, setIdToken } = useAuthentication();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        setIdToken(undefined);
        setUser(undefined);
      } else {
        const idToken = await user.getIdToken(true);

        try {
          console.log('hi')
          const data = await loginCallback(idToken);

          setUser(data)
          setIdToken(idToken);
        } catch (e) {
          console.log('failed')
        }
        
      }
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  function handleLogout() {
    setUser(undefined);
    setIdToken(undefined);
    localStorage.removeItem("triv-access-token");
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
  }

  return (
    <>
      <div id="sign-in" className={user ? "hidden" : undefined}></div>
      <FirebaseAuth 
        firebaseAuth={firebase.auth()}
        uiConfig={uiConfig}
      />
      {user && (
        <div>
          <img src={logo} alt="logo" width={75} height={75} />
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <img src={user.profilePicture} alt="profile" />
          <button type="button" onClick={handleLogout}>
            logout
          </button>
          <Link to="/">Home</Link>
          <Link to="/quiz">QuizList</Link>
        </div>
      )}
    </>
  );
}
