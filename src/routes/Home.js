import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); //for CREATE/CRUD/Post
  const [nweets, setNweets] = useState([]); //for READ/CRUD/Get 재료
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    //console.log("nweets는 :", dbNweets); //to check nweets
    dbNweets.forEach((document) => {
      //console.log("document의 data는:", document.data());
      const nweetObject = {
        ...document.data(), //spread attribute
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    //console.log("onsubmit working");
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    //console.log("ok?");
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

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
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={userObj.uid}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
//will activate when it called

export default Home;
