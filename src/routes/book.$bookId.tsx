import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, Heart, Lock, Star, Users } from "lucide-react";
import { format } from "date-fns";
import { Layout } from "@/components/Layout";
import { getBookById, books } from "@/data/books";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useFavorites } from "@/lib/favorites";
import { useRentals } from "@/lib/rentals";
import { BookCard } from "@/components/BookCard";
import { RentDialog } from "@/components/RentDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$bookId")({
  component: BookDetail,
  loader: ({ params }) => {
    const book = getBookById(params.bookId);
    if (!book) throw notFound();
    return book;
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Không tìm thấy sách</h1>
        <Button asChild className="mt-6">
          <Link to="/catalog">Về danh mục</Link>
        </Button>
      </div>
    </Layout>
  ),
});

function BookDetail() {
  const book = Route.useLoaderData();
  const { toggle, has } = useFavorites();
  const { get: getRental, hasAccess, cancel } = useRentals();
  const fav = has(book.id);
  const rental = getRental(book.id);
  const access = hasAccess(book.id);
  const expired = !!rental && !access;

  const related = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <Layout>
      <section className="container mx-auto px-6 py-10">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Quay lại danh mục
        </Link>

        <div className="mt-8 grid md:grid-cols-[300px_1fr] gap-10">
          <div>
            <div
              className={`aspect-[2/3] rounded-2xl bg-gradient-to-br ${book.cover} shadow-[var(--shadow-book)] p-6 flex flex-col justify-between text-white`}
            >
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">
                  {book.category}
                </div>
                <h2 className="font-serif text-2xl mt-2">{book.title}</h2>
              </div>
              <div className="text-xs opacity-80">{book.author}</div>
            </div>

            {rental && (
              <div
                className={`mt-4 rounded-xl border p-4 text-sm ${
                  access
                    ? "border-primary/40 bg-primary/5"
                    : "border-destructive/40 bg-destructive/5"
                }`}
              >
                <div className="font-medium">
                  {access ? "Đang thuê" : "Đã hết hạn"}
                </div>
                <div className="text-muted-foreground mt-1">
                  {format(new Date(rental.start), "dd/MM/yyyy")} —{" "}
                  {format(new Date(rental.end), "dd/MM/yyyy")}
                </div>
                {access && (
                  <button
                    onClick={() => {
                      cancel(book.id);
                      toast("Đã hủy thuê");
                    }}
                    className="mt-2 text-xs text-muted-foreground underline hover:text-foreground"
                  >
                    Hủy thuê
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-medium">
              {book.category}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mt-2 leading-tight">
              {book.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              bởi <span className="text-foreground">{book.author}</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" />
                <span className="font-medium">{book.rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="size-4" /> {book.pages} trang
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="size-4" /> {book.year}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="size-4" /> Còn {book.available} bản
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {access ? (
                <Button size="lg" className="rounded-full" disabled>
                  Đang trong thời gian thuê
                </Button>
              ) : (
                <RentDialog
                  bookId={book.id}
                  bookTitle={book.title}
                  trigger={
                    <Button size="lg" className="rounded-full">
                      {expired ? "Gia hạn thuê" : "Thuê sách"}
                    </Button>
                  }
                />
              )}
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  toggle(book.id);
                  toast(fav ? "Đã bỏ khỏi yêu thích" : "Đã thêm vào yêu thích");
                }}
              >
                <Heart className={`mr-1 size-4 ${fav ? "fill-primary text-primary" : ""}`} />
                {fav ? "Đã yêu thích" : "Yêu thích"}
              </Button>
            </div>

            <Tabs defaultValue="preface" className="mt-10">
              <TabsList>
                <TabsTrigger value="preface">Lời nói đầu</TabsTrigger>
                <TabsTrigger value="toc">Mục lục</TabsTrigger>
                <TabsTrigger value="full">Nội dung đầy đủ</TabsTrigger>
              </TabsList>

              <TabsContent
                value="preface"
                className="mt-6 text-muted-foreground leading-relaxed"
              >
                <p className="font-serif text-lg italic">{book.preface}</p>
                <p className="mt-3 text-xs">Phần này miễn phí cho mọi người đọc.</p>
              </TabsContent>

              <TabsContent value="toc" className="mt-6">
                <ol className="space-y-2">
                  {book.toc.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex gap-3 py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-muted-foreground">
                  Phần này miễn phí cho mọi người đọc.
                </p>
              </TabsContent>

              <TabsContent value="full" className="mt-6">
                {access ? (
                  <div className="rounded-xl bg-secondary/60 p-6 font-serif text-base leading-relaxed whitespace-pre-line">
                    {book.fullContent}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border p-10 text-center">
                    <div className="size-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-3">
                      <Lock className="size-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-serif text-xl">
                      {expired ? "Thuê sách đã hết hạn" : "Nội dung dành cho người thuê"}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                      {expired
                        ? "Vui lòng gia hạn để tiếp tục đọc toàn bộ nội dung."
                        : "Thuê sách để mở khóa toàn bộ nội dung. Bạn vẫn được đọc miễn phí Lời nói đầu và Mục lục."}
                    </p>
                    <div className="mt-5">
                      <RentDialog
                        bookId={book.id}
                        bookTitle={book.title}
                        trigger={
                          <Button className="rounded-full">
                            {expired ? "Gia hạn ngay" : "Thuê ngay"}
                          </Button>
                        }
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">Cùng thể loại</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
