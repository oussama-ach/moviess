import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

function Show({ movies }) {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true); // Nouvel état pour le chargement

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        const movieFound = movies.find((m) => m.id === parseInt(id));
        if (movieFound) {
          setMovie(movieFound);
        }
        setLoading(false);
      }, 2000); // Délai de 2 secondes pour simuler le chargement
      return () => clearTimeout(timer); // Nettoyage du timer
  }, [movies, id]);
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                  : `https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg`
              }
              style={{ width: "300px" }}
              alt={movie?.name}
            />
          </figure>
          <div className="card-content">
            <p className="title">{movie?.name}</p>
            <p >{movie?.overview}</p>
            <p className="card-text">{movie?.first_air_date}</p>
            <p className="card-text">{movie?.vote_average} / 10</p>
            <p className="card-text">{movie?.origin_country}</p>
          </div>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default Show;
