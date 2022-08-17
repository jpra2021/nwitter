import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageSerivce } from "fbase";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
  /*preparing Hooks*/
  const [attachment, setAttachment] = useState("");
  const [nweet, setNweet] = useState(""); //for CREATE/CRUD/Post

  /*attach*/

  const onFileChange = (event) => {
    if (nweet === "") {
      return;
    }
    //add file triggered by onchange
    console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0]; //get the file
    const reader = new FileReader(); //constructor
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  /*keep Clean*/

  const onClearAttachment = () => setAttachment("");

  /*submit the form*/

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = "";

    if (attachment !== "") {
      const attachmentRef = ref(storageSerivce, `${userObj.uid}/${uuidv4()}`); //child
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      console.log(response);
      attachmentURL = await getDownloadURL(attachmentRef);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };

    await addDoc(collection(dbService, "nweets"), nweetObj);
    //console.log("ok?");

    setNweet(""); //text
    setAttachment(""); //image
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          //   onChange={onChange}
          //   value={nweet}
          //   type="text"
          //   placeholder="What's on your mind?"
          //   maxLength={140}
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />

        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default NweetFactory;
