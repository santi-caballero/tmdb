import "@picocss/pico";
import { useEffect } from "react";

const Modal = ({ data, close }) => {
  const isOpenClass = "modal-is-open";
  useEffect(() => {
    if (data) document.documentElement.classList.add(isOpenClass);
    else document.documentElement.classList.remove(isOpenClass);
  }, [data]);
  return (
    <>
      <dialog id="modal-example" open={!!data}>
        <article>
          <a
            href="#close"
            aria-label="Close"
            class="close"
            data-target="modal-example"
            onClick={close}
          ></a>
          <h3>{data?.title}</h3>
          <h5>Clasificación: {data?.clasificacion}</h5>
          <p>Descripción: </p>
          <p>{data?.descripcion || "Descripción no disponible"} </p>
          <footer>
            <a
              href="#confirm"
              role="button"
              data-target="modal-example"
              onClick={close}
            >
              Cerrar
            </a>
          </footer>
        </article>
      </dialog>
    </>
  );
};

export default Modal;
