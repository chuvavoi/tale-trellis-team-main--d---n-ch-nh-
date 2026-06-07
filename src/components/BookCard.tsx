import { Link } from "@tanstack/react-router";
import { Star, Heart } from "lucide-react";
import type { Book } from "@/data/books";
import { useFavorites } from "@/lib/favorites";

export function BookCard({ book }: { book: Book }) {
  const { toggle, has } = useFavorites();
  const fav = has(book.id);

  return (
    <Link
      to="/book/$bookId"
      params={{ bookId: book.id }}
      className="group block"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-[var(--shadow-card)] group-hover:shadow-[var(--shadow-book)] transition-all duration-300 group-hover:-translate-y-1">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${book.cover}`}
        />
        <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">
              {book.category}
            </div>
            <h3 className="font-serif text-xl leading-tight mt-2">
              {book.title}
            </h3>
          </div>
          <div className="text-xs opacity-80">{book.author}</div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggle(book.id);
          }}
          className="absolute top-3 right-3 size-8 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Yêu thích"
        >
          <Heart
            className={`size-4 ${fav ? "fill-primary text-primary" : "text-foreground"}`}
          />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Star className="size-3.5 fill-accent text-accent" />
          {book.rating}
        </div>
        <div className="text-xs text-muted-foreground">
          Còn {book.available} cuốn
        </div>
      </div>
    </Link>
  );
}
