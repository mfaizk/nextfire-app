import style from "../../styles/Post.module.css";
import PostContent from "components/PostComponent";
import { firestore, getUserWithUsername, postToJSON } from "lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const useDoc = await getUserWithUsername(username);
  let post;
  let path;
  if (useDoc) {
    const postRef = useDoc.ref.collection("posts").doc("slug");
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
    const { slug, username } = doc.data;
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking", //this tells next to fallback on ssr while new data get process
  };
}

export default function PostPage(props) {
  return <main></main>;
}
