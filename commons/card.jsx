import "@picocss/pico";

const Card = ({ title }) => {
  // console.log(title);
  return (
    <>
      <div style={{ width: 300, height: 520 }}>
        <img
          style={{ height: "100%" }}
          src={`https://image.tmdb.org/t/p/original${title.poster_path}`}
          // data-target="modal-example"
          // onClick={toggleModal}
        ></img>
      </div>
    </>
  );
};

export default Card;
