import { async } from "@firebase/util";
import { dbService, storageSerivce } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`); //why doc can do??

  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you wnat to delete this nweet?");
    console.log(ok);
    if (ok) {
      const NweetImgRef = ref(storageSerivce, nweetObj.attachmentURL);
      //delete nweets
      await deleteDoc(NweetTextRef);
      await deleteDoc(NweetImgRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    await updateDoc(NweetTextRef, { text: newNweet }); //check!
    setEditing(false);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              maxLength={140}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>

          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          <div>
            {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} />}
          </div>
          {isOwner && (
            // <>
            //   <button onClick={onClickDelete}>Delete Nweet</button>
            //   <button onClick={toggleEditing}>Edit Nweet</button>
            // </>
            <div class="nweet__actions">
              <span onClick={onClickDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
