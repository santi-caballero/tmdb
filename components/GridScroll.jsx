import Card from "@/commons/card";
import "@picocss/pico";

const GridScroll = ({ titles }) => {
  return (
    <>
      <figure>
        <table>
          <thead>
            <tr>
              {titles.results.map((title, i) => (
                <th key={i}>
                  <Card title={title} />
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </figure>
    </>
  );
};

export default GridScroll;
