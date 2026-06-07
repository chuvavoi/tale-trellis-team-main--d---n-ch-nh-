import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";
import { useFavorites } from "@/lib/favorites";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
});

function Favorites() {
  const { ids } = useFavorites();
  const list = books.filter((b) => ids.includes(b.id));

  return (
    <Layout>
      <section className="container mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl md:text-5xl">Sách yêu thích</h1>
        <p className="mt-3 text-muted-foreground">
          Những cuốn sách bạn đã đánh dấu để đọc sau.
        </p>

        {list.length === 0 ? (
          <div className="mt-16 text-center max-w-md mx-auto">
            <div className="size-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
              <Heart className="size-7 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl">Chưa có sách nào</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Hãy duyệt danh mục và bấm vào trái tim để lưu sách bạn quan tâm.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/catalog">Khám phá ngay</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {list.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
