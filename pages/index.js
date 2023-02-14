import Head from "next/head";
import Card from "@/commons/card";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Home({ popularMovies, popularSeries }) {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  // console.log("hola", auth);

  // if (loading) {
  //   return <div>Cargandoo...</div>;
  // }
  // if (user) {
  //   router.push("/hola");
  //   return <div>Cargandoo...</div>;
  // }

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  return (
    <>
      <Head>
        <title>TMDB</title>
      </Head>
      <div className="container-fluid">
        <div>
          <nav>
            <ul>
              <li>
                <h2>
                  <strong>The Movie Database</strong>
                </h2>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">Movies</a>
              </li>
              <li>
                <a href="#">Series</a>
              </li>
              <li>
                {user ? (
                  <button onClick={() => auth.signOut()} role="button">
                    Logout
                  </button>
                ) : (
                  <button onClick={login} role="button">
                    Login
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
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
                  <th>
                    <Card title={movie} key={i} />
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
                {popularSeries.results.map((movie, i) => (
                  <th>
                    <Card title={movie} key={i} />
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
