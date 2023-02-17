import Head from "next/head";
import Card from "@/commons/card";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "@/commons/modal";
import SearchBar from "../components/SearchBar";

export default function Home({ popularMovies, popularSeries }) {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [title, setTitle] = useState();
  const [clasificacion, setClasificacion] = useState();
  const [descripcion, setDescripcion] = useState();

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    // console.log(result.user);
  };
  const isOpenClass = "modal-is-open";
  const openingClass = "modal-is-opening";
  const closingClass = "modal-is-closing";
  const animationDuration = 400; // ms
  let visibleModal = null;

  const toggleModal = (event) => {
    event.preventDefault();
    const modal = document.getElementById(
      event.currentTarget.getAttribute("data-target")
    );
    typeof modal != "undefined" && modal != null && isModalOpen(modal)
      ? closeModal(modal)
      : openModal(modal);
  };

  const isModalOpen = (modal) => {
    return modal.hasAttribute("open") && modal.getAttribute("open") != "false"
      ? true
      : false;
  };

  const openModal = (modal) => {
    if (isScrollbarVisible()) {
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${getScrollbarWidth()}px`
      );
    }
    document.documentElement.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
      visibleModal = modal;
      document.documentElement.classList.remove(openingClass);
    }, animationDuration);
    modal.setAttribute("open", true);
  };

  const closeModal = (modal) => {
    visibleModal = null;
    document.documentElement.classList.add(closingClass);
    setTimeout(() => {
      document.documentElement.classList.remove(closingClass, isOpenClass);
      document.documentElement.style.removeProperty("--scrollbar-width");
      modal.removeAttribute("open");
    }, animationDuration);
  };
  const isScrollbarVisible = () => {
    return document.body.scrollHeight > screen.height;
  };
  const getScrollbarWidth = () => {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  };
  return (
    <>
      <Head>
        <title>TMDB</title>
      </Head>
      <div className="container-fluid">
        <SearchBar />
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Popular Movies
        </h1>

        <figure>
          <table>
            <thead>
              <tr>
                {popularMovies.results.map((movie, i) => (
                  <th key={i}>
                    <div style={{ width: 300, height: 520 }}>
                      <img
                        style={{ height: "100%" }}
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        data-target="modal-example"
                        onClick={(event) => {
                          setTitle(movie.title);
                          setClasificacion(movie.vote_average);
                          setDescripcion(movie.overview);
                          toggleModal(event);
                        }}
                      ></img>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </figure>

        <h1 style={{ textAlign: "center" }}>Popular Series</h1>

        <figure>
          <table>
            <thead>
              <tr>
                {popularSeries.results.map((serie, j) => (
                  <th key={j}>
                    <div style={{ width: 300, height: 520 }}>
                      <img
                        style={{ height: "100%" }}
                        src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                        data-target="modal-example"
                        onClick={(event) => {
                          setTitle(serie.name);
                          setClasificacion(serie.vote_average);
                          setDescripcion(serie.overview);
                          toggleModal(event);
                        }}
                      ></img>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <Modal
            toggleModal={toggleModal}
            title={title}
            clasificacion={clasificacion}
            descripcion={descripcion}
            // title={title.title ? title.title : title.name}
            // clasificacion={title.vote_average}
            // descripcion={title.overview ? title.overview : "No disponible"}
          />
        </figure>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const resMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TOKEN}&language=en-US&page=1`
  );
  const movies = await resMovies.json();

  const resSeries = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TOKEN}&language=en-US&page=1`
  );
  const series = await resSeries.json();

  return { props: { popularMovies: movies, popularSeries: series } };
}
