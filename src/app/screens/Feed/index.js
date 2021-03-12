import React, { useEffect, useState, Fragment } from "react";
import Card from "components/Card";
import style from "./feed.module";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import Layout, { TopLayout } from "components/Layouts";
// 3/9 TODO
// fix Feed styles

const Feed = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const uid = auth && auth.uid;
  const [feed, setFeed] = useState(null);

  // useEffect(() => {
  //   if (uid) {
  //     firebase
  //       .getAllPosts(uid)
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
          {Object.keys(feed).map((item) => (
            <Card
              key={item}
              title={feed[item].title}
              content={feed[item].journal}
            />
          ))}
        </TopLayout>
      ) : (
        // <Layout>empty</Layout>
        <TopLayout>
          <div className={style.posts}>
            {[
              {
                title: "hello",
                content:
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, natus obcaecati. Incidunt necessitatibus adipisci dicta debitis deserunt sit atque, aliquam accusantium excepturi! Pariatur veniam consectetur earum amet quam dignissimos sed.",
              },
              {
                title: "world",
                content:
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur laborum quam nostrum tempore perspiciatis quo officia? Quod aperiam excepturi explicabo molestias esse perspiciatis, deleniti totam sint doloribus necessitatibus rerum culpa?",
              },
              {
                title: "january",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ex repellat nihil non dolorem perferendis laboriosam autem ea delectus tenetur, nisi ipsa sint itaque cumque ab! Voluptas, dignissimos alias! Iste?",
              },
              {
                title: "feb",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing ea delectus tenetur, nisi ipsa sint itaque cumque ab! Voluptas, dignissimos alias! Iste?",
              },
              {
                title: "march",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing ea delectus tenetur, nisi ipsa sint itaque cumque ab! Voluptas, dignissimos alias! Iste?",
              },
            ].map((i, index) => (
              <Card {...i} key={index} />
            ))}
          </div>
        </TopLayout>
      )}
    </Fragment>
  );
};

export default Feed;
