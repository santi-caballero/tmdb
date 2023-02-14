import "@picocss/pico";

const Card = ({ title }) => {
  return (
    <>
      <div style={{ width: 300, height: 520 }}>
        {/* <p>{title.title}</p> */}
        <img
          style={{ height: "100%" }}
          src={`https://image.tmdb.org/t/p/original${title.poster_path}`}
        />
      </div>
    </>
  );
};

export default Card;
