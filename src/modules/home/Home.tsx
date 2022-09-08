import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuthentication } from "@context/AuthContext";

import { loginCallback } from "@api/login";

import logo from "@assets/logo.png";

export default function Home() {
  const { user, setUser, setIdToken } = useAuthentication();

  useEffect(() => {
    async function onSignIn(res: { credential: string }) {
      try {
        const data = await loginCallback(res.credential)

        localStorage.setItem("trivia-access-token", res.credential);

        setUser(data);
        setIdToken(res.credential);
      } catch (e) {
        console.log("failed");
      }
    }

    //@ts-ignore
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
      callback: onSignIn,
      auto_select: true,
      context: "signin",
    });
    //@ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("sign-in") as HTMLElement,
      { theme: "outline", size: "large" }
    );

    const accessToken = localStorage.getItem("triv-access-token");

    if (accessToken) {
      onSignIn({ credential: accessToken });
    }
  }, [setUser, setIdToken]);

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
