import Card from "@/commons/card";
import "@picocss/pico";
import Modal from "@/commons/modal";
import { useRouter } from "next/router";

const Movies = ({ movies, query }) => {
  const router = useRouter();

  //   const siguiente = async () => {

  //     router.push(`/movies?page=${page}`);
  //     const res = await fetch(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TOKEN}&language=en-US&page=${page}`
  //     );
  //     movies = await res.json();
  //     console.log(movies);
  //   };
  //console.log(movies);

  return (
    <>
      <h1>Movies</h1>
      <div className="grid">
        {movies.results.map((movie, i) => (
          <div key={i}>
            <Card title={movie} />
          </div>
        ))}
      </div>
      <div class="grid">
        <div>
          <button
            role="button"
            onClick={() =>
              router.push(`/movies?page=${Number(query.page) - 1}`)
            }
          >
            Anterior
          </button>
        </div>
        <div>
          <button
            role="button"
            onClick={() =>
              router.push(`/movies?page=${Number(query.page) + 1}`)
            }
          >
            Siguiente
          </button>
        </div>
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(4, 2fr);
          grid-column-gap: 20px;
          grid-row-gap: 20px;
        }
      `}</style>
    </>
  );
};

export default Movies;

export async function getServerSideProps({ query }) {
  // console.log(query);
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TOKEN}&language=en-US&page=${query.page}`
  );
  const movies = await res.json();

  return { props: { movies: movies, query: query } };
}
