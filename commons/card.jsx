import "@picocss/pico";

const Card = ({ title }) => {
  return (
    <>
      <article style={{ width: 300, height: 520 }}>
        <p>{title.title}</p>
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face${title.poster_path}`}
        />
      </article>
    </>
  );
};

export default Card;
