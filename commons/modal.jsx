import "@picocss/pico";

const Modal = ({ toggleModal, title, clasificacion, descripcion }) => {
  return (
    <>
      <dialog id="modal-example">
        <article>
          <a
            href="#close"
            aria-label="Close"
            class="close"
            data-target="modal-example"
            onClick={toggleModal}
          ></a>
          <h3>{title}</h3>
          <h5>Clasificación: {clasificacion}</h5>
          <p>Descripción: </p>
          <p>{descripcion ? descripcion : "Descripción no disponible"} </p>
          <footer>
            <a
              href="#confirm"
              role="button"
              data-target="modal-example"
              onClick={toggleModal}
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
