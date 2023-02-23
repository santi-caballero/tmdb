import Card from "@/commons/card";
import "@picocss/pico";

//Grid x20 titles

const Grid = ({ titles }) => {
  return (
    <>
      <div className="grid">
        {titles.results.map((title, i) => (
          <div key={i}>
            <Card title={title} />
          </div>
        ))}
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

export default Grid;
