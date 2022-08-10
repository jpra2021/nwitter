import { dbService } from "fbase";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("onsubmit작동");
    await addDoc(collection(dbService, "nweets"), {
      nweet: nweet,
      createdAt: Date.now(),
    });
    console.log("됨?");
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
    </div>
  );
};
//will activate when it called

export default Home;
