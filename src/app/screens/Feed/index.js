import React, { useEffect, useState, Fragment } from "react";
import style from "./feed.module";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import { Card, Layout, TopLayout, Modal, Overlay, Button } from "components";
import { AUDIO_POST } from "constants/firebase";

const Feed = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const uid = auth && auth.uid;
  const { email } = auth;
  const [list, setList] = useState([]);
  const [deletePost, setDeletePost] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    if (uid) {
      firebase
        .getData(uid, AUDIO_POST)
        .then((snapShot) => {
          const messageObject = snapShot.val();
          let journalPosts = [];
          if (messageObject) {
            journalPosts = Object.keys(messageObject).map((key) => ({
              ...messageObject[key],
              uid: key,
            }));
          }
          setList(journalPosts);
        })
        .catch((error) => console.log(error));
    }
  }, [uid]);

  const handleRemovePost = (post) => {
    const { postUid, fileName } = post;
    const newList = list.filter((i) => i.uid !== postUid);
    const deleteFileTask = fileName
      ? firebase.doDeleteFile
      : (param) => Promise.resolve(param);

    Promise.all([
      firebase.doDeletePost(`${uid}/${AUDIO_POST}/${postUid}`),
      deleteFileTask(`${email}/${fileName}`),
    ]).then(() => {
      setList(newList);
      setDeletePost(null);
      setDisplayModal(false);
    });
  };

  return (
    <Fragment>
      {list.length ? (
        <TopLayout>
          <div className={style.list}>
            {list.map((item) => (
              <Card
                key={item.uid}
                title={item.title}
                content={item.journal}
                date={item.date}
                audio={item.audio}
                handleDelete={() => {
                  setDeletePost({ postUid: item.uid, fileName: item.fileName });
                  setDisplayModal(true);
                }}
              />
            ))}
          </div>
        </TopLayout>
      ) : (
        <Layout>Empty</Layout>
      )}
      {displayModal ? (
        <Overlay>
          <div className={style.modalBackground}>
            <Layout>
              <Modal title="Confirm Delete">
                <Modal.Item name="body">
                  <p>Are you sure you want to delete this item?</p>
                </Modal.Item>
                <Modal.Item name="controls">
                  <Button
                    text="Cancel"
                    handleClick={() => {
                      setDeletePost(null);
                      setDisplayModal(false);
                    }}
                  />
                  <Button
                    text="Confirm"
                    handleClick={() => handleRemovePost(deletePost)}
                  />
                </Modal.Item>
              </Modal>
            </Layout>
          </div>
        </Overlay>
      ) : null}
    </Fragment>
  );
};

export default Feed;
