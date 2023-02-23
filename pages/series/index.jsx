import Card from "@/commons/card";
import "@picocss/pico";
import { useRouter } from "next/router";
import Grid from "@/components/Grid";
const Series = ({ series, query }) => {
  const router = useRouter();

  return (
    <>
      <h1>Series</h1>
      <Grid titles={series} />
      <div class="grid">
        <div>
          <button
            role="button"
            onClick={() =>
              router.push(`/series?page=${Number(query.page) - 1}`)
            }
          >
            Anterior
          </button>
        </div>
        <div>
          <button
            role="button"
            onClick={() =>
              router.push(`/series?page=${Number(query.page) + 1}`)
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

export default Series;

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TOKEN}&certification_country=US&certification.lte=G&sort_by=popularity.desc&page=${query.page}`
  );
  const series = await res.json();

  return { props: { series: series, query: query } };
}
