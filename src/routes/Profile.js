import App from "components/App";
import Nweet from "components/Nweets";
import { authService, dbService, storageSerivce } from "fbase";
import { updateProfile } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  uploadString,
  ref,
  getStorage,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Profile = ({ userObj, refreshUser }) => {
  const [newName, setnewName] = useState(userObj.displayName);
  const [newPhoto, setNewPhoto] = useState("");
  const [isToggleEdit, setIsToggleEdit] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [myNweets, setMyNweets] = useState([]);

  const navigate = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigate("/", { replace: true });
  };

  const getMyNweets = async () => {
    //dbService, "nweets", `${nweetObj.id}`
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );
    const myNweets = await getDocs(q);
    const nweetsArr = myNweets.docs.map((item) => ({ ...item.data() }));
    setMyNweets(nweetsArr);
  };

  useEffect(() => {
    //calling function to get Nweets
    getMyNweets();
  }, []);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setnewName(value);
    }
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theNewFile = files[0];
    const reader = new FileReader();
    reader.onloadend = async (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
      setNewPhoto(result);
      console.log("newPho타입?", typeof newPhoto);
    };
    reader.readAsDataURL(theNewFile);
  };

  const onClearAttachment = () => setAttachment(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";

    if (userObj.displayName == newName && newPhoto == "") {
      console.log("You didn't change anything!");
    } else {
      if (userObj.displayName !== newName) {
        console.log("updated Profile name!");
      }

      if (typeof newPhoto === "string") {
        const ProfileFolder = `${userObj.uid}/ProfileImage`;
        const attachmentRef = ref(storageSerivce, ProfileFolder);
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        console.log("사진 링크:", response);
        attachmentURL = await getDownloadURL(attachmentRef);
        console.log("photo is updated!", attachmentURL);
        setNewPhoto("");
      }

      await updateProfile(authService.currentUser, {
        displayName: newName,
        photoURL: attachmentURL,
      }).then(() => {
        console.log(
          "updated to Server! \n displayname:",
          userObj.displayName,
          " photoURL:",
          userObj.photoURL
        );
        ToggleEditing();
        refreshUser();
      });
    }
  };

  const ToggleEditing = () => {
    console.log("edit my profile is clicked,", isToggleEdit);
    setIsToggleEdit((prev) => !prev);
  };

  return (
    <>
      {isToggleEdit ? (
        <>
          <div className="container">
            <button
              onClick={ToggleEditing}
              className="formBtn cancelBtn logOut"
            >
              Cancel
            </button>
            <form className="profileForm" onSubmit={onSubmit}>
              <input
                name="name"
                placeholder="displayname"
                type="text"
                value={newName}
                onChange={onChange}
                autoFocus
                className="formInput"
              />
              <input
                name="photo"
                placeholder={userObj.photoURL}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                autoFocus
                className="formInput"
              />
              <input
                name="Submit"
                value="Update Profile"
                className="formBtn"
                style={{
                  marginTop: 10,
                }}
              />
              {attachment && (
                <div>
                  <img src={attachment} width="50px" height="50px" />
                  <button onClick={onClearAttachment}>Clear Photo</button>
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <span onClick={ToggleEditing} className="formBtn editBtn edit">
              Edit my Profile
            </span>
            <span className="formBtn cancelBtn logOut" onClick={onLogOut}>
              Log Out
            </span>

            <div style={{ marginTop: 30 }}>
              {myNweets.map((nweet) => (
                <Nweet nweetObj={nweet} isOwner={true} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
