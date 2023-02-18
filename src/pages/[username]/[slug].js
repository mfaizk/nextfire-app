import style from "../../styles/Post.module.css";
import PostContent from "../../../components/PostContent";
import { firestore, getUserWithUsername, postToJSON } from "lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  let post;
  let path;
  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc("slug");
    post = postToJSON(await postRef.get());
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

//function to tell nextjs to make static path for available slugs from db

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { slug, username },
    };
  });

  return {
    paths,
    fallback: "blocking", //this tells next to fallback on ssr while new data get process
  };
}

export default function PostPage(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={style.container}>
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <strong>{post.heartCount || 0}heart</strong>
        </p>
      </aside>
    </main>
  );
}
