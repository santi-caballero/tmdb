import Head from "next/head";

import Card from "@/commons/card";

export default function Home({ popularMovies, popularSeries }) {
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
                <strong>The Movie Database</strong>
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
                <a href="#" role="button">
                  Registrarse
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <h1>Popular Movies</h1>

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
