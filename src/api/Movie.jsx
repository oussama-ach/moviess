import React, { useState, useEffect } from "react";
import "../Movie.css";
import { Link } from "react-router-dom";

// const [Loading , setLoading] = useState(true);

const Movie = ({
  search,
  setSearch,
  movies,
  setMovies,
  page,
  setPage,
  totalPage,
  setTotalPage,
}) => {
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

  const onButtonClick = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="container">

      <section className="search-section">
        <h2>Search Your Favourite Movie</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="search movie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <button onClick={onButtonClick}>Search</button> */}
        </form>
      </section>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {movies.map((movie, key) => (
            <div className="card" key={key}>
              <div className="card-info">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    style={{ height: "350px" }}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                        : `https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg`
                    }
                    alt={movie.original_name}
                  />
                </Link>
                <h2>{movie.original_name}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {totalPage > 1 && (
        <div className="pagination">
          <button className="btn"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPage}
          </span>
          <button className="btn"
            onClick={() => setPage(page < totalPage ? page + 1 : totalPage)}
            disabled={page === totalPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Movie;
