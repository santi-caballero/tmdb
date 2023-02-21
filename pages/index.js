import Head from "next/head";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import SearchBar from "../components/SearchBar";
import Card from "@/commons/card";

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

        <figure>
          <table>
            <thead>
              <tr>
                {popularMovies.results.map((movie, i) => (
                  <th key={i}>
                    <Card title={movie} />
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </figure>

        <h1 style={{ textAlign: "center" }}>Popular Series</h1>

        <figure>
          <table>
            <thead>
              <tr>
                {popularSeries.results.map((serie, j) => (
                  <th key={j}>
                    <div style={{ width: 300, height: 520 }}>
                      <Card title={serie} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </figure>
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
