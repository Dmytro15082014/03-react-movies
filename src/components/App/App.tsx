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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movie, setMovie] = useState<Movie>();

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

  const openModal = (id: number) => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    const movieObj: Movie | undefined = movies.find((item) => {
      if (item.id === id) return item;
    });
    setMovie(movieObj);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {isModalOpen && <MovieModal onClose={closeModal} movie={movie} />}
    </>
  );
}
