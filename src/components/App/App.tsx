import "./App.module.css";
import { useState } from "react";
import { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { getMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (newQuery: string) => {
    try {
      setMovies([]);
      const moviesData = await getMovies(newQuery);
      if (!moviesData.length) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(moviesData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelect = () => {};

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
    </>
  );
}
