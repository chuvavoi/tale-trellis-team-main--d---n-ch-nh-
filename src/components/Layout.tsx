import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, Heart, User, BookOpen } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/catalog", label: "Danh mục", icon: LayoutGrid },
  { to: "/favorites", label: "Yêu thích", icon: Heart },
  { to: "/profile", label: "Cá nhân", icon: User },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-card)] group-hover:scale-105 transition-transform">
              <BookOpen className="size-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight">
              Trạm Sách
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="grid grid-cols-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <footer className="hidden md:block border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Trạm Sách — Nơi sách tìm về với người đọc.
      </footer>
    </div>
  );
}
