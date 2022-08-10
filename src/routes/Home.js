import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";

const Home = () => {
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
    //for C
    event.preventDefault();
    //console.log("onsubmit working");
    await addDoc(collection(dbService, "nweets"), {
      nweet: nweet,
      createdAt: Date.now(),
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

  console.log(nweets);
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
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
//will activate when it called

export default Home;
