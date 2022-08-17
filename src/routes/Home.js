import { dbService, storageSerivce } from "fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//import Nweet from "components/Nweets";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Nweet from "components/Nweets";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); //for CREATE/CRUD/Post
  const [nweets, setNweets] = useState([]); //for READ/CRUD/Get 재료
  const [attachment, setAttachment] = useState("");

  //new
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

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

  const onFileChange = (event) => {
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

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={nweet}
          type="text"
          placeholder="What's on your mind?"
          maxLength={140}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear Photo</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
//will activate when it called

export default Home;
