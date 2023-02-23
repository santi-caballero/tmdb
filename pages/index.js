import Head from "next/head";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import SearchBar from "../components/SearchBar";
import Card from "@/commons/card";
import GridScroll from "@/components/GridScroll";
export default function Home({ popularMovies, popularSeries }) {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    // console.log(result.user);
  };

  return (
    <>
      <Head>
        <title>TMDB</title>
      </Head>
      <div className="container-fluid">
        <SearchBar />
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Popular Movies
        </h1>

        <GridScroll titles={popularMovies} />

        <h1 style={{ textAlign: "center" }}>Popular Series</h1>

        <GridScroll titles={popularSeries} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const resMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TOKEN}&language=en-US&page=1`
  );
  const movies = await resMovies.json();

  const resSeries = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TOKEN}&language=en-US&page=1`
  );
  const series = await resSeries.json();

  return { props: { popularMovies: movies, popularSeries: series } };
}
