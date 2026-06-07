import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { books, categories } from "@/data/books";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/catalog")({
  component: Catalog,
});

function Catalog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Tất cả");

  const filtered = books.filter((b) => {
    const matchCat = cat === "Tất cả" || b.category === cat;
    const matchQ =
      !query ||
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <Layout>
      <section className="container mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl md:text-5xl">Danh mục sách</h1>
        <p className="mt-3 text-muted-foreground">
          Duyệt qua bộ sưu tập sách đa dạng theo chủ đề bạn yêu thích.
        </p>

        <div className="mt-8 relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên sách hoặc tác giả..."
            className="pl-10 h-12 rounded-full bg-card"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                cat === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Không tìm thấy sách phù hợp.
          </div>
        )}
      </section>
    </Layout>
  );
}
