import React, { useEffect, useState, Fragment } from "react";
import style from "./feed.module";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import { Card, Layout, TopLayout } from "components";
import { AUDIO_POST } from "constants/firebase";

const Feed = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const uid = auth && auth.uid;
  const [feed, setFeed] = useState({});

  useEffect(() => {
    if (uid) {
      firebase
        .getData(uid, AUDIO_POST)
        .then((snapShot) => {
          const posts = snapShot.val() ? snapShot.val() : {};
          setFeed(posts);
        })
        .catch((error) => console.log(error));
    }
  }, [firebase, uid]);

  return (
    <Fragment>
      {Object.keys(feed).length ? (
        <TopLayout>
          <div className={style.posts}>
            {Object.keys(feed).map((item) => (
              <Card
                key={item}
                title={feed[item].title}
                content={feed[item].journal}
                date={feed[item].date}
                audio={feed[item].audio}
              />
            ))}
          </div>
        </TopLayout>
      ) : (
        <Layout>Empty</Layout>
      )}
    </Fragment>
  );
};

export default Feed;
