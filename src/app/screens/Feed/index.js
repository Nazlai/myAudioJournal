import React, { useEffect, useState, Fragment } from "react";
import style from "./feed.module";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import { Card, Layout, TopLayout } from "components";
import { AUDIO_POST } from "constants/firebase";
// 3/9 TODO
// fix Feed styles

const dummy = [
  {
    title: "hello",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, natus obcaecati. Incidunt necessitatibus adipisci dicta debitis deserunt sit atque, aliquam accusantium excepturi! Pariatur veniam consectetur earum amet quam dignissimos sed.",
    date: new Date().toISOString(),
  },
  {
    title: "world",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur laborum quam nostrum tempore perspiciatis quo officia? Quod aperiam excepturi explicabo molestias esse perspiciatis, deleniti totam sint doloribus necessitatibus rerum culpa?",
    date: new Date().toISOString(),
  },
  {
    title: "january",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ex repellat nihil non dolorem perferendis laboriosam autem ea delectus tenetur, nisi ipsa sint itaque cumque ab! Voluptas, dignissimos alias! Iste?",
    date: new Date().toISOString(),
  },
  {
    title: "feb",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing ea delectus tenetur, nisi ipsa sint itaque cumque ab! Voluptas, dignissimos alias! Iste?",
    date: new Date().toISOString(),
  },
  {
    title: "march",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing ea delectus tenetur, nisi ipsa sint itaque cumque ab! Voluptas, dignissimos alias! Iste?",
    date: new Date().toISOString(),
  },
];

const Feed = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const uid = auth && auth.uid;
  const [feed, setFeed] = useState(dummy);

  // useEffect(() => {
  //   if (uid) {
  //     firebase
  //       .getData(uid, AUDIO_POST)
  //       .then((snapShot) => {
  //         console.log(snapShot, snapShot.val());
  //         setFeed(snapShot.val());
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [firebase, uid]);

  return (
    <Fragment>
      {feed ? (
        <TopLayout>
          <div className={style.posts}>
            {/* {Object.keys(feed).map((item) => (
              <Card
                key={item}
                title={feed[item].title}
                content={feed[item].journal}
              />
            ))} */}
            {feed.map((i, index) => (
              <Card {...i} key={index} />
            ))}
          </div>
        </TopLayout>
      ) : (
        <Layout>empty</Layout>
      )}
    </Fragment>
  );
};

export default Feed;
