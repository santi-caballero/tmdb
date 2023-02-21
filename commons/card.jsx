import "@picocss/pico";
import { useState } from "react";
import Modal from "./modal";

const Card = ({ title }) => {
  const [data, setData] = useState();

  const toggleModal = (event) => {
    setData({
      title: title.title || title.name,
      clasificacion: title.vote_average,
      descripcion: title.overview || "No disponible",
    });
  };

  return (
    <>
      <div style={{ width: 300, height: 520 }}>
        <img
          style={{ height: "100%", paddingBottom: 40 }}
          src={`https://image.tmdb.org/t/p/original${title.poster_path}`}
          data-target="modal-example"
          onClick={toggleModal}
        ></img>
        <Modal
          data={data}
          close={() => setData(null)}
          // title={title}
          // clasificacion={clasificacion}
          // descripcion={descripcion}
          // title={title.title ? title.title : title.name}
          // clasificacion={title.vote_average}
          // descripcion={title.overview ? title.overview : "No disponible"}
        />
      </div>
    </>
  );
};

export default Card;
