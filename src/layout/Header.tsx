import { useState } from "react";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faSignIn } from "@fortawesome/free-solid-svg-icons";

import { useAuthentication } from "@context/AuthContext";

import logo from "@assets/logo.svg";

import Modal from "components/Modal";

import { FirebaseAuth } from "react-firebaseui";

export default function Header() {
  const { user, signOut } = useAuthentication();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  function onLoginClick() {
    setLoginModalOpen(true);
  }

  function onLoginOrCancel() {
    setLoginModalOpen(false);
  }

  return (
    <header>
      <div>
        <img src={logo} alt="logo" />
        <h1>TRIVIA COMPANION</h1>
      </div>
      <div>
        {user ? (
          <>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/quiz">My Quizzes</Link>
                </li>
              </ul>
            </nav>
            <button type="button" onClick={signOut}>
              <FontAwesomeIcon icon={faSignOut} />
            </button>
            <img className="profile" src={user.profilePicture} alt="profile" />
          </>
        ) : (
          <button type="button" title="Sign in" onClick={onLoginClick}>
            <FontAwesomeIcon
              icon={faSignIn}
              width={50}
              height={50}
              accentHeight={50}
            />
          </button>
        )}
        <Modal open={loginModalOpen} onClose={onLoginOrCancel} title="Login">
          <FirebaseAuth
            uiConfig={{
              signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              ],
            }}
            firebaseAuth={firebase.auth()}
          />
        </Modal>
      </div>
    </header>
  );
}
