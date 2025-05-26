import { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: () => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {/* Набір елементів списку з фільмами */}
      <li>
        <div className={css.card}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500/`}
            alt="movie title"
            loading="lazy"
          />
          <h2 className={css.title}>Movie title</h2>
        </div>
      </li>
    </ul>
  );
}
