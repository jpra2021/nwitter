import { async } from "@firebase/util";
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";
import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const onSocialOnclick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <AuthForm />
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />

      <div className="authBtns">
        <button name="google" onClick={onSocialOnclick} className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialOnclick} className="authBtn">
          {" "}
          <FontAwesomeIcon icon={faGithub} />
          Continue with Github
        </button>
      </div>
    </div>
  );
};
//will activate when it called

export default Auth;
