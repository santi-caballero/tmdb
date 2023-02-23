import "@picocss/pico";
import { useRouter } from "next/router";
import { useState } from "react";
import Grid from "./Grid";
const SearchBar = () => {
  const router = useRouter();
  const [data, setData] = useState();

  const handleSubmit = async (event) => {
    if (event.key === "Enter") {
      if (event.target.value !== "") {
        const resTitle = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TOKEN}&language=en-US&query=${event.target.value}&page=1&include_adult=false`
        );
        const results = await resTitle.json();
        setData(results);
        //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^", results);
      }
    }
  };

  return (
    <>
      {/* <label for="search">Buscar titulo</label> */}
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Busca aquí lo que quieras ver!"
        required
        onKeyDown={handleSubmit}
      ></input>
      {data ? <Grid titles={data} /> : ""}
    </>
  );
};

export default SearchBar;
