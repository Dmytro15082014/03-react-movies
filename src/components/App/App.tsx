import "./App.module.css";
import { useState } from "react";
import { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { getMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleSearch = async (newQuery: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const moviesData = await getMovies(newQuery);
      if (!moviesData.length) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(moviesData);
    } catch (error) {
      if (error) setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) => {
    setIsModalOpen(true);
    setMovie(movie);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {isModalOpen && movie !== null && (
        <MovieModal onClose={closeModal} movie={movie} />
      )}
    </>
  );
}
