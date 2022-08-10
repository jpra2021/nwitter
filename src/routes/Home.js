import React, { useState } from "react";

const Home = () => {
  const [nWeet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
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
          value={nWeet}
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
