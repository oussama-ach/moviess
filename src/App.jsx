import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./api/Movie";
import Show from "./api/Show";
import { useEffect, useState } from "react";
export default function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
   
  useEffect(() => {
    if (search.trim() === "") {
      return;
    }
    const apiUrl =
      "https://api.themoviedb.org/3/search/tv?api_key=fef55a6754f2f6d00a0038388915039c&include_adult=false&query=" +
      search +
      "&page=" +
      page;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((resp) => {
        setMovies(resp.results);
        setTotalPage(resp.total_pages);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [search, page]);
  console.log(movies);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Movie
                search={search}
                setSearch={setSearch}
                movies={movies}
                setMovies={setMovies}
                page={page}
                setPage={setPage}
                totalPage={totalPage}
                setTotalPage={setTotalPage}
              />
            }
          />
          <Route path="/movie/:id" element={<Show movies={movies} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
