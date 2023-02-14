import Head from "next/head";
import Loader from "components/Loader";

export default function Home() {
  return (
    <div>
      <Loader show={true} />
    </div>
  );
}
