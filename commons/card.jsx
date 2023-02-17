import "@picocss/pico";

const Card = ({ title }) => {
  return (
    <>
      <div style={{ width: 300, height: 520 }}>
        <img
          style={{ height: "100%", paddingBottom: 40 }}
          src={`https://image.tmdb.org/t/p/original${title.poster_path}`}
        ></img>
      </div>
    </>
  );
};

export default Card;
