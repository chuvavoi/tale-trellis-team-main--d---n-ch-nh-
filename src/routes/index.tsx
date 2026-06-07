import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search, BookOpen, Library, User, Calendar as CalIcon, X, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, List, Check, Clock, Filter, Phone, GraduationCap,
  Home, Star, FileText, MapPin, Download, ShieldCheck, AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: HustLibraryApp });

// ============================================================
// DATA — HUST academic textbooks
// ============================================================
type RentType = "Online" | "Offline" | "Cả hai";
type Book = {
  id: string; title: string; code: string; author: string; category: string;
  institute: string; status: "Còn sách" | "Hết sách"; stock: number;
  description: string; type: RentType; pages: number; rating: number; cover: string;
  toc: string[]; sample: string[];
};

const INITIAL_BOOKS: Book[] = [
  { id: "b1", title: "Giải tích I", code: "MI1111", author: "Viện Toán ứng dụng và Tin học - HUST",
    category: "Toán đại cương", institute: "Viện Toán", status: "Còn sách", stock: 8,
    description: "Giáo trình nền tảng về giới hạn, đạo hàm, tích phân hàm một biến. Tài liệu bắt buộc cho kỳ thi giữa kỳ và cuối kỳ K68+.",
    type: "Cả hai", pages: 320, rating: 4.8, cover: "from-red-700 to-rose-900",
    toc: ["Chương 1: Số thực & dãy số", "Chương 2: Giới hạn hàm số", "Chương 3: Đạo hàm & vi phân", "Chương 4: Tích phân bất định", "Chương 5: Tích phân xác định", "Chương 6: Chuỗi số"],
    sample: ["GIẢI TÍCH I — MI1111", "Chương 1: Số thực và dãy số", "1.1 Tập hợp số thực ℝ được xây dựng từ các tiên đề Dedekind, đảm bảo tính đầy đủ và liên tục...", "Định nghĩa 1.1: Một dãy số {aₙ} được gọi là hội tụ về L nếu với mọi ε > 0, tồn tại N sao cho |aₙ − L| < ε khi n ≥ N.", "Ví dụ minh hoạ: lim (1 + 1/n)ⁿ = e ≈ 2.71828..."],
  },
  { id: "b2", title: "Giải tích II", code: "MI1121", author: "Viện Toán ứng dụng và Tin học - HUST",
    category: "Toán đại cương", institute: "Viện Toán", status: "Còn sách", stock: 5,
    description: "Hàm nhiều biến, tích phân bội, tích phân đường - mặt và phương trình vi phân. Học phần tiếp nối MI1111.",
    type: "Cả hai", pages: 280, rating: 4.7, cover: "from-rose-600 to-red-800",
    toc: ["Hàm nhiều biến", "Tích phân kép", "Tích phân bội ba", "Tích phân đường loại I, II", "Tích phân mặt", "Phương trình vi phân"],
    sample: ["GIẢI TÍCH II — MI1121", "Chương 1: Hàm số nhiều biến số", "Xét hàm f: D ⊂ ℝⁿ → ℝ. Đạo hàm riêng theo biến xᵢ tại điểm M₀..."] },
  { id: "b3", title: "Đại số tuyến tính", code: "MI1141", author: "Viện Toán ứng dụng và Tin học - HUST",
    category: "Toán đại cương", institute: "Viện Toán", status: "Còn sách", stock: 12,
    description: "Ma trận, định thức, không gian vector, ánh xạ tuyến tính, dạng song tuyến và toàn phương. Tài liệu trọng tâm cho ngành kỹ thuật.",
    type: "Cả hai", pages: 250, rating: 4.9, cover: "from-red-800 to-stone-900",
    toc: ["Ma trận & định thức", "Hệ phương trình tuyến tính", "Không gian vector", "Ánh xạ tuyến tính", "Trị riêng - vector riêng", "Dạng toàn phương"],
    sample: ["ĐẠI SỐ TUYẾN TÍNH — MI1141", "Chương 1: Ma trận và định thức", "Định nghĩa: Ma trận A cỡ m×n là bảng số thực gồm m hàng và n cột...", "Định lý Laplace về khai triển định thức theo hàng/cột bất kỳ."] },
  { id: "b4", title: "Vật lý đại cương I (Cơ - Nhiệt)", code: "PH1110", author: "Viện Vật lý kỹ thuật - HUST",
    category: "Vật lý", institute: "Viện Vật lý kỹ thuật", status: "Còn sách", stock: 6,
    description: "Cơ học chất điểm, cơ học vật rắn, nhiệt động lực học và thuyết động học phân tử. Bài tập có lời giải kèm theo.",
    type: "Cả hai", pages: 340, rating: 4.6, cover: "from-stone-700 to-red-900",
    toc: ["Động học chất điểm", "Động lực học", "Công - Năng lượng", "Cơ học vật rắn", "Thuyết động học phân tử", "Nguyên lý I & II nhiệt động lực học"],
    sample: ["VẬT LÝ ĐẠI CƯƠNG I — PH1110", "Phần I: Cơ học", "Định luật II Newton: F = ma. Phương trình chuyển động của chất điểm trong hệ quy chiếu quán tính..."] },
  { id: "b5", title: "Vật lý đại cương II (Điện - Từ)", code: "PH1120", author: "Viện Vật lý kỹ thuật - HUST",
    category: "Vật lý", institute: "Viện Vật lý kỹ thuật", status: "Hết sách", stock: 0,
    description: "Điện trường, từ trường, cảm ứng điện từ, sóng điện từ và quang học sóng.",
    type: "Online", pages: 310, rating: 4.5, cover: "from-red-900 to-zinc-800",
    toc: ["Điện trường tĩnh", "Vật dẫn - Tụ điện", "Dòng điện không đổi", "Từ trường", "Cảm ứng điện từ", "Sóng điện từ"],
    sample: ["VẬT LÝ ĐẠI CƯƠNG II — PH1120", "Chương 1: Trường tĩnh điện", "Định luật Coulomb: F = k·q₁q₂/r²..."] },
  { id: "b6", title: "Kỹ thuật lập trình C/C++", code: "IT1110", author: "Viện Công nghệ thông tin và Truyền thông - SoICT",
    category: "Công nghệ thông tin", institute: "SoICT", status: "Còn sách", stock: 15,
    description: "Nền tảng lập trình thủ tục và hướng đối tượng bằng C/C++. Bao gồm con trỏ, cấu trúc dữ liệu cơ bản và OOP.",
    type: "Cả hai", pages: 420, rating: 4.9, cover: "from-red-700 to-stone-800",
    toc: ["Cấu trúc chương trình C", "Biến - Toán tử - Biểu thức", "Cấu trúc điều khiển", "Hàm và con trỏ", "Mảng - Chuỗi - Struct", "Lập trình hướng đối tượng C++", "Template & STL"],
    sample: ["KỸ THUẬT LẬP TRÌNH — IT1110", "#include <iostream>", "int main() {", "    std::cout << \"Hello, HUST!\" << std::endl;", "    return 0;", "}", "Ngôn ngữ C++ kết hợp lập trình thủ tục với hướng đối tượng, hỗ trợ template metaprogramming..."] },
  { id: "b7", title: "Cấu trúc dữ liệu và Giải thuật", code: "IT3170", author: "Viện CNTT & TT - SoICT",
    category: "Công nghệ thông tin", institute: "SoICT", status: "Còn sách", stock: 9,
    description: "Phân tích độ phức tạp, danh sách liên kết, stack, queue, cây, đồ thị và các thuật toán cơ bản.",
    type: "Cả hai", pages: 380, rating: 4.8, cover: "from-rose-700 to-red-950",
    toc: ["Phân tích thuật toán - Big O", "Mảng & Danh sách liên kết", "Stack & Queue", "Cây nhị phân & BST", "Heap & Hash Table", "Đồ thị: BFS, DFS, Dijkstra", "Quy hoạch động"],
    sample: ["CTDL & GIẢI THUẬT — IT3170", "Big O Notation: T(n) = O(f(n)) ⇔ ∃c, n₀ : T(n) ≤ c·f(n) ∀n ≥ n₀", "Thuật toán Dijkstra tìm đường đi ngắn nhất từ một đỉnh nguồn..."] },
  { id: "b8", title: "Triết học Mác - Lênin", code: "SSH1110", author: "Khoa Lý luận chính trị - HUST",
    category: "Lý luận chính trị", institute: "Khoa LLCT", status: "Còn sách", stock: 20,
    description: "Thế giới quan và phương pháp luận của chủ nghĩa duy vật biện chứng, duy vật lịch sử. Học phần bắt buộc.",
    type: "Cả hai", pages: 260, rating: 4.3, cover: "from-red-800 to-red-950",
    toc: ["Khái lược về Triết học", "Chủ nghĩa duy vật biện chứng", "Phép biện chứng duy vật", "Lý luận nhận thức", "Chủ nghĩa duy vật lịch sử"],
    sample: ["TRIẾT HỌC MÁC - LÊNIN — SSH1110", "Chương 1: Khái lược về triết học", "Triết học ra đời ở cả phương Đông và phương Tây gần như cùng thời gian (TK VIII - VI TCN)..."] },
  { id: "b9", title: "Kinh tế chính trị Mác - Lênin", code: "SSH1120", author: "Khoa Lý luận chính trị - HUST",
    category: "Lý luận chính trị", institute: "Khoa LLCT", status: "Còn sách", stock: 18,
    description: "Học thuyết giá trị, học thuyết giá trị thặng dư và đặc điểm của chủ nghĩa tư bản hiện đại.",
    type: "Cả hai", pages: 220, rating: 4.2, cover: "from-stone-800 to-red-900",
    toc: ["Đối tượng & phương pháp nghiên cứu", "Hàng hoá - Thị trường", "Giá trị thặng dư", "Cạnh tranh & độc quyền", "Kinh tế thị trường định hướng XHCN"],
    sample: ["KINH TẾ CHÍNH TRỊ — SSH1120", "Chương 2: Học thuyết giá trị", "Hàng hoá có hai thuộc tính: giá trị sử dụng và giá trị..."] },
  { id: "b10", title: "Tiếng Anh kỹ thuật I", code: "FL1100", author: "Khoa Ngoại ngữ - HUST",
    category: "Ngoại ngữ", institute: "Khoa Ngoại ngữ", status: "Còn sách", stock: 11,
    description: "Tài liệu luyện kỹ năng đọc - viết tiếng Anh chuyên ngành kỹ thuật, đạt chuẩn TOEIC 450+.",
    type: "Cả hai", pages: 180, rating: 4.4, cover: "from-red-600 to-rose-900",
    toc: ["Unit 1: Engineering basics", "Unit 2: Materials", "Unit 3: Mechanisms", "Unit 4: Forces", "Unit 5: Electricity", "TOEIC practice tests"],
    sample: ["ENGLISH FOR ENGINEERING — FL1100", "Unit 1: Engineering is the application of scientific principles to design or develop structures, machines, and processes..."] },
  { id: "b11", title: "Xác suất thống kê", code: "MI2020", author: "Viện Toán ứng dụng và Tin học - HUST",
    category: "Toán đại cương", institute: "Viện Toán", status: "Còn sách", stock: 7,
    description: "Biến cố ngẫu nhiên, phân phối xác suất, ước lượng tham số và kiểm định giả thiết thống kê.",
    type: "Cả hai", pages: 240, rating: 4.6, cover: "from-red-700 to-zinc-900",
    toc: ["Biến cố & xác suất", "Biến ngẫu nhiên", "Phân phối thường gặp", "Mẫu & ước lượng", "Kiểm định giả thuyết", "Hồi quy tuyến tính"],
    sample: ["XÁC SUẤT THỐNG KÊ — MI2020", "Định nghĩa cổ điển: P(A) = |A| / |Ω|", "Phân phối Chuẩn N(μ, σ²) có hàm mật độ: f(x) = (1/σ√2π)·exp(−(x−μ)²/2σ²)"] },
  { id: "b12", title: "Tin học đại cương", code: "IT1110E", author: "Viện CNTT & TT - SoICT",
    category: "Công nghệ thông tin", institute: "SoICT", status: "Hết sách", stock: 0,
    description: "Kiến thức cơ sở về máy tính, hệ điều hành, mạng và ứng dụng văn phòng. Học phần đại cương K68+.",
    type: "Online", pages: 200, rating: 4.1, cover: "from-rose-800 to-red-950",
    toc: ["Thông tin & biểu diễn dữ liệu", "Phần cứng máy tính", "Hệ điều hành", "Mạng máy tính", "Văn phòng & Internet"],
    sample: ["TIN HỌC ĐẠI CƯƠNG — IT1110E", "Chương 1: Mọi dữ liệu trong máy tính đều được biểu diễn dưới dạng nhị phân (bit)..."] },
];

const CATEGORIES = ["Tất cả", "Toán đại cương", "Vật lý", "Công nghệ thông tin", "Lý luận chính trị", "Ngoại ngữ"];
const INSTITUTES = ["Tất cả", "Viện Toán", "Viện Vật lý kỹ thuật", "SoICT", "Khoa LLCT", "Khoa Ngoại ngữ"];
const RENT_TYPES: ("Tất cả" | RentType)[] = ["Tất cả", "Online", "Offline", "Cả hai"];

// ============================================================
// Custom toast system
// ============================================================
type Toast = { id: number; title: string; description?: string; variant: "success" | "error" | "info" };
let toastSeq = 0;
const toastListeners = new Set<(t: Toast[]) => void>();
let toasts: Toast[] = [];
function pushToast(t: Omit<Toast, "id">) {
  const item = { ...t, id: ++toastSeq };
  toasts = [...toasts, item];
  toastListeners.forEach((l) => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter((x) => x.id !== item.id);
    toastListeners.forEach((l) => l(toasts));
  }, 4000);
}
function useToasts() {
  const [list, setList] = useState<Toast[]>(toasts);
  useEffect(() => { toastListeners.add(setList); return () => { toastListeners.delete(setList); }; }, []);
  return list;
}
function ToastViewport() {
  const list = useToasts();
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] sm:w-96 pointer-events-none">
      {list.map((t) => (
        <div key={t.id} className={`pointer-events-auto rounded-xl shadow-2xl border backdrop-blur bg-white/95 px-4 py-3 flex gap-3 items-start animate-in slide-in-from-right
          ${t.variant === "success" ? "border-emerald-200" : t.variant === "error" ? "border-red-300" : "border-stone-200"}`}>
          <div className={`mt-0.5 size-7 rounded-full flex items-center justify-center text-white flex-shrink-0
            ${t.variant === "success" ? "bg-emerald-500" : t.variant === "error" ? "bg-red-600" : "bg-stone-700"}`}>
            {t.variant === "success" ? <Check className="size-4" /> : t.variant === "error" ? <AlertCircle className="size-4" /> : <ShieldCheck className="size-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-stone-900">{t.title}</div>
            {t.description && <div className="text-xs text-stone-600 mt-0.5">{t.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Storage hooks
// ============================================================
function useLocalState<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal] as const;
}

type OfflineRental = {
  id: string; bookId: string; pickupDate: string; duration: string;
  fullName: string; mssv: string; phone: string; email: string;
  status: "Chờ đến lấy" | "Đang mượn" | "Đã trả"; qr: string;
};
type Purchase = {
  id: string; bookId: string; createdAt: string;
  fullName: string; phone: string; email: string; address: string;
  payment: "COD" | "Chuyển khoản"; price: number;
  status: "Đang xử lý" | "Đang giao" | "Đã giao";
};
type OnlineRental = {
  id: string; bookId: string; startAt: string; endAt: string;
  days: number; price: number; email: string;
};

function isRentalActive(r: OnlineRental, now = Date.now()): boolean {
  return now >= new Date(r.startAt).getTime() && now <= new Date(r.endAt).getTime();
}

// ============================================================
// Modal shell
// ============================================================
function Modal({ open, onClose, children, size = "md" }: { open: boolean; onClose: () => void; children: React.ReactNode; size?: "md" | "lg" | "xl" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  const w = size === "xl" ? "max-w-5xl" : size === "lg" ? "max-w-2xl" : "max-w-lg";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className={`relative w-full ${w} max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col animate-in zoom-in-95`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// ============================================================
// PDF Reader modal
// ============================================================
function PdfReader({ book, onClose }: { book: Book; onClose: () => void }) {
  const pages = useMemo(() => {
    const out: string[][] = [];
    const intro = ["MỤC LỤC", ...book.toc];
    out.push(intro);
    const chunks: string[] = [];
    book.sample.forEach((s) => chunks.push(s));
    while (chunks.length < 18) chunks.push("Nội dung học phần được biên soạn theo chuẩn đầu ra của Đại học Bách Khoa Hà Nội, phục vụ kỳ thi cuối kỳ K68+. Sinh viên cần nắm vững lý thuyết và làm đủ bài tập trong giáo trình.");
    for (let i = 0; i < chunks.length; i += 3) out.push(chunks.slice(i, i + 3));
    return out;
  }, [book]);
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [showToc, setShowToc] = useState(false);

  const current = pages[page] ?? [];

  return (
    <Modal open onClose={onClose} size="xl">
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-stone-900 text-white">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="size-4 flex-shrink-0" />
          <div className="truncate">
            <div className="text-sm font-semibold truncate">{book.title}</div>
            <div className="text-[10px] text-stone-400 truncate">{book.code} · {book.author}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="size-4" /></button>
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-stone-100 border-b text-xs">
        <div className="flex items-center gap-1">
          <button onClick={() => setShowToc((s) => !s)} className="px-2 py-1 rounded hover:bg-stone-200 flex items-center gap-1"><List className="size-3.5" /> Mục lục</button>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom((z) => Math.max(70, z - 10))} className="p-1.5 rounded hover:bg-stone-200"><ZoomOut className="size-3.5" /></button>
          <span className="w-12 text-center font-medium">{zoom}%</span>
          <button onClick={() => setZoom((z) => Math.min(160, z + 10))} className="p-1.5 rounded hover:bg-stone-200"><ZoomIn className="size-3.5" /></button>
        </div>
        <div className="flex items-center gap-1">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30"><ChevronLeft className="size-3.5" /></button>
          <span className="font-medium">{page + 1}/{pages.length}</span>
          <button disabled={page === pages.length - 1} onClick={() => setPage((p) => p + 1)} className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30"><ChevronRight className="size-3.5" /></button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden bg-stone-200">
        {showToc && (
          <aside className="hidden sm:block w-60 bg-white border-r overflow-y-auto p-3">
            <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">Mục lục tài liệu</div>
            {book.toc.map((t, i) => (
              <button key={i} onClick={() => { setPage(0); setShowToc(false); }} className="block w-full text-left text-sm py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-700">{t}</button>
            ))}
          </aside>
        )}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="mx-auto bg-white shadow-xl rounded-sm aspect-[1/1.414] p-8 sm:p-12 transition-all" style={{ width: `${zoom * 5.5}px`, maxWidth: "100%" }}>
            {current.map((line, i) => (
              <p key={i} className={`${i === 0 ? "font-bold text-lg sm:text-xl text-red-800 mb-4" : "text-stone-800 text-sm sm:text-base leading-relaxed mb-3"} font-serif`}>{line}</p>
            ))}
            <div className="mt-8 pt-4 border-t text-center text-[10px] text-stone-400">— Trang {page + 1} · HUST E-Library —</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}


// ============================================================
// Buy Book modal
// ============================================================
function BuyModal({ book, onClose, onConfirm }: { book: Book; onClose: () => void; onConfirm: (p: Purchase) => void }) {
  const price = useMemo(() => 35000 + book.pages * 350, [book]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<"COD" | "Chuyển khoản">("COD");
  const [receipt, setReceipt] = useState<Purchase | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return pushToast({ variant: "error", title: "Vui lòng nhập họ tên" });
    if (!/^\d{9,11}$/.test(phone)) return pushToast({ variant: "error", title: "SĐT không hợp lệ", description: "Nhập 9–11 chữ số." });
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return pushToast({ variant: "error", title: "Email không hợp lệ" });
    if (address.trim().length < 8) return pushToast({ variant: "error", title: "Địa chỉ quá ngắn", description: "Vui lòng nhập địa chỉ giao hàng đầy đủ." });
    const p: Purchase = {
      id: "OD" + Date.now().toString(36).toUpperCase(),
      bookId: book.id, createdAt: new Date().toISOString(),
      fullName: fullName.trim(), phone, email: email.trim(), address: address.trim(),
      payment, price, status: "Đang xử lý",
    };
    setReceipt(p);
    onConfirm(p);
  };

  if (receipt) {
    return (
      <Modal open onClose={onClose} size="lg">
        <div className="p-6 text-center">
          <div className="mx-auto size-14 rounded-full bg-emerald-100 flex items-center justify-center"><Check className="size-7 text-emerald-600" /></div>
          <h3 className="mt-3 font-bold text-2xl">Đặt mua thành công</h3>
          <p className="text-sm text-stone-500 mt-1">Đơn hàng của bạn đã được ghi nhận</p>
          <div className="mt-5 rounded-2xl border-2 border-dashed border-red-300 bg-gradient-to-br from-red-50 to-white p-5 text-left text-sm space-y-1.5">
            <div className="flex justify-between"><span className="text-stone-500">Mã đơn</span><span className="font-mono font-bold text-red-700">{receipt.id}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Sách</span><span className="font-semibold text-right">{book.title}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Người nhận</span><span className="font-semibold">{receipt.fullName}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">SĐT</span><span className="font-mono">{receipt.phone}</span></div>
            <div className="flex justify-between gap-3"><span className="text-stone-500 flex-shrink-0">Địa chỉ</span><span className="font-medium text-right">{receipt.address}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Thanh toán</span><span className="font-semibold">{receipt.payment}</span></div>
            <div className="flex justify-between border-t border-red-200 pt-2 mt-2"><span className="text-stone-700 font-semibold">Tổng tiền</span><span className="font-bold text-red-700">{receipt.price.toLocaleString("vi-VN")}₫</span></div>
          </div>
          <button onClick={onClose} className="mt-5 w-full h-11 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold">Hoàn tất</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open onClose={onClose} size="lg">
      <form onSubmit={submit} className="overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="size-12 rounded-xl bg-red-100 flex items-center justify-center"><Download className="size-6 text-red-700" /></div>
            <div>
              <h3 className="font-bold text-xl">Mua sách giấy</h3>
              <p className="text-sm text-stone-500 mt-0.5">{book.title} · {book.code}</p>
            </div>
            <button type="button" onClick={onClose} className="ml-auto p-1 hover:bg-stone-100 rounded"><X className="size-4" /></button>
          </div>
          <div className="mt-5 rounded-xl border bg-stone-50 p-4 flex items-center justify-between">
            <div className="text-sm text-stone-600">Giá bán</div>
            <div className="text-xl font-bold text-red-700">{price.toLocaleString("vi-VN")}₫</div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Họ và tên" className="sm:col-span-2">
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn A" className="input" required />
            </Field>
            <Field label="Số điện thoại">
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="0987654321" className="input font-mono" required />
            </Field>
            <Field label="Email (tuỳ chọn)">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@email.com" className="input" />
            </Field>
            <Field label="Địa chỉ giao hàng" className="sm:col-span-2">
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" className="input" required />
            </Field>
            <Field label="Phương thức thanh toán" className="sm:col-span-2">
              <div className="flex gap-2">
                {(["COD", "Chuyển khoản"] as const).map((p) => (
                  <button key={p} type="button" onClick={() => setPayment(p)} className={`flex-1 h-10 rounded-lg border text-sm font-medium ${payment === p ? "bg-red-700 border-red-700 text-white" : "bg-white border-stone-300 hover:border-red-400"}`}>{p}</button>
                ))}
              </div>
            </Field>
          </div>
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex gap-2">
            <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
            Sách sẽ được gửi từ kho thư viện Tạ Quang Bửu trong 2–5 ngày làm việc.
          </div>
        </div>
        <div className="px-6 py-4 bg-stone-50 border-t flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-stone-300 hover:bg-white font-medium text-sm">Huỷ</button>
          <button type="submit" className="flex-1 h-11 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-sm shadow-lg shadow-red-700/30">Xác nhận đặt mua</button>
        </div>
      </form>
    </Modal>
  );
}

// ============================================================
// Rent Offline modal
// ============================================================
function RentOfflineModal({ book, onClose, onConfirm }: { book: Book; onClose: () => void; onConfirm: (data: OfflineRental) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const [pickupDate, setPickupDate] = useState(today);
  const [duration, setDuration] = useState("2 tuần");
  const [fullName, setFullName] = useState("");
  const [mssv, setMssv] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState<OfflineRental | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{8}$/.test(mssv)) return pushToast({ variant: "error", title: "MSSV không hợp lệ", description: "MSSV HUST gồm đúng 8 chữ số." });
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return pushToast({ variant: "error", title: "Email không hợp lệ", description: "Định dạng email chưa đúng." });
    if (!/^\d{9,11}$/.test(phone)) return pushToast({ variant: "error", title: "SĐT không hợp lệ", description: "Nhập 9–11 chữ số." });
    if (!fullName.trim()) return pushToast({ variant: "error", title: "Vui lòng nhập họ tên" });
    if (pickupDate < today) return pushToast({ variant: "error", title: "Ngày nhận phải ≥ hôm nay" });
    const r: OfflineRental = {
      id: "RV" + Date.now().toString(36).toUpperCase(),
      bookId: book.id, pickupDate, duration, fullName: fullName.trim(), mssv, phone, email,
      status: "Chờ đến lấy", qr: Math.random().toString(36).slice(2, 10).toUpperCase(),
    };
    setReceipt(r);
    onConfirm(r);
  };

  if (receipt) {
    return (
      <Modal open onClose={onClose} size="lg">
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto size-14 rounded-full bg-emerald-100 flex items-center justify-center"><Check className="size-7 text-emerald-600" /></div>
            <h3 className="mt-3 font-bold text-2xl">Đặt lịch thành công</h3>
            <p className="text-sm text-stone-500 mt-1">Mang QR Code dưới đây đến thư viện để nhận sách nhanh</p>
          </div>
          <div className="mt-6 rounded-2xl border-2 border-dashed border-red-300 bg-gradient-to-br from-red-50 to-white p-5">
            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <div className="size-40 bg-white rounded-lg p-2 shadow-md flex items-center justify-center flex-shrink-0">
                <QrPattern seed={receipt.qr} />
              </div>
              <div className="flex-1 text-sm space-y-1.5 w-full">
                <div className="flex justify-between"><span className="text-stone-500">Mã đặt</span><span className="font-mono font-bold text-red-700">{receipt.id}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Sách</span><span className="font-semibold text-right">{book.code}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Người nhận</span><span className="font-semibold">{receipt.fullName}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">MSSV</span><span className="font-mono">{receipt.mssv}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Ngày nhận</span><span className="font-semibold">{new Date(receipt.pickupDate).toLocaleDateString("vi-VN")}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Thời gian thuê</span><span className="font-semibold">{receipt.duration}</span></div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-200 text-xs text-stone-600 flex items-center gap-2">
              <MapPin className="size-3.5 text-red-700" /> Thư viện Tạ Quang Bửu — Đại học Bách khoa Hà Nội, Số 1 Đại Cồ Việt, HBT, HN
            </div>
          </div>
          <button onClick={onClose} className="mt-5 w-full h-11 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold">Hoàn tất</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open onClose={onClose} size="lg">
      <form onSubmit={submit} className="overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="size-12 rounded-xl bg-red-100 flex items-center justify-center"><Library className="size-6 text-red-700" /></div>
            <div>
              <h3 className="font-bold text-xl">Đặt lịch thuê sách Offline</h3>
              <p className="text-sm text-stone-500 mt-0.5">{book.title} · {book.code}</p>
            </div>
            <button type="button" onClick={onClose} className="ml-auto p-1 hover:bg-stone-100 rounded"><X className="size-4" /></button>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Ngày đến nhận sách">
              <input type="date" min={today} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="input" required />
            </Field>
            <Field label="Thời gian thuê">
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className="input">
                <option>1 tuần</option><option>2 tuần</option><option>1 tháng</option>
              </select>
            </Field>
            <Field label="Họ và tên" className="sm:col-span-2">
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn A" className="input" required />
            </Field>
            <Field label="MSSV (8 chữ số)">
              <input value={mssv} onChange={(e) => setMssv(e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="20230001" className="input font-mono" required />
            </Field>
            <Field label="Số điện thoại">
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="0987654321" className="input font-mono" required />
            </Field>
            <Field label="Email (tuỳ chọn)" className="sm:col-span-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com (không bắt buộc đuôi HUST)" className="input" />
            </Field>
          </div>
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex gap-2">
            <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
            Số lượng sách trong kho sẽ tự động giảm sau khi đặt lịch thành công. Vui lòng đến đúng hẹn.
          </div>
        </div>
        <div className="px-6 py-4 bg-stone-50 border-t flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-stone-300 hover:bg-white font-medium text-sm">Huỷ</button>
          <button type="submit" className="flex-1 h-11 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-sm shadow-lg shadow-red-700/30">Xác nhận đặt lịch</button>
        </div>
      </form>
    </Modal>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold text-stone-700 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function QrPattern({ seed }: { seed: string }) {
  const grid = useMemo(() => {
    let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const size = 13; const cells: boolean[] = [];
    for (let i = 0; i < size * size; i++) { h = (h * 1103515245 + 12345) >>> 0; cells.push((h & 1) === 1); }
    // corners
    const setBlock = (r0: number, c0: number) => {
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells[(r0 + r) * size + (c0 + c)] = true;
    };
    setBlock(0, 0); setBlock(0, size - 3); setBlock(size - 3, 0);
    return { size, cells };
  }, [seed]);
  return (
    <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${grid.size}, 1fr)` }}>
      {grid.cells.map((on, i) => <div key={i} className={on ? "bg-stone-900" : "bg-white"} />)}
    </div>
  );
}

// ============================================================
// Book card
// ============================================================
function BookCard({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) {
  return (
    <button onClick={() => onOpen(book)} className="group text-left bg-white rounded-2xl border border-stone-200 hover:border-red-300 hover:shadow-xl hover:shadow-red-700/5 transition-all overflow-hidden">
      <div className={`relative aspect-[3/4] bg-gradient-to-br ${book.cover} p-4 flex flex-col justify-between text-white`}>
        <div>
          <div className="inline-block text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-white/15 backdrop-blur">{book.code}</div>
          <h3 className="mt-3 font-serif text-lg leading-tight line-clamp-3">{book.title}</h3>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1"><Star className="size-3 fill-amber-300 text-amber-300" />{book.rating}</span>
          <span className="px-2 py-0.5 rounded bg-white/15 backdrop-blur">{book.type}</span>
        </div>
        <div className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full ${book.status === "Còn sách" ? "bg-emerald-500/90" : "bg-stone-900/80"}`}>
          {book.status === "Còn sách" ? `Còn ${book.stock}` : "Hết"}
        </div>
      </div>
      <div className="p-3">
        <div className="text-[11px] text-red-700 font-semibold">{book.category}</div>
        <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">{book.author}</div>
      </div>
    </button>
  );
}

// ============================================================
// Book detail modal
// ============================================================
function BookDetail({ book, onClose, onFreeRead, onBuy, onRentOffline, onRentOnline }: {
  book: Book; onClose: () => void;
  onFreeRead: () => void; onBuy: () => void; onRentOffline: () => void; onRentOnline: () => void;
}) {
  const canOffline = book.type !== "Online" && book.stock > 0;
  const canOnline = book.type !== "Offline";
  return (
    <Modal open onClose={onClose} size="lg">
      <div className="overflow-y-auto">
        <div className={`relative bg-gradient-to-br ${book.cover} p-6 text-white`}>
          <button onClick={onClose} className="absolute top-3 right-3 size-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center"><X className="size-4" /></button>
          <div className="text-[11px] font-bold tracking-wider opacity-80">{book.code} · {book.institute}</div>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl leading-tight">{book.title}</h2>
          <div className="mt-2 text-sm opacity-90">{book.author}</div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur flex items-center gap-1"><Star className="size-3 fill-amber-300 text-amber-300" />{book.rating}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur">{book.pages} trang</span>
            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur">{book.type}</span>
            <span className={`px-2.5 py-1 rounded-full ${book.status === "Còn sách" ? "bg-emerald-500/90" : "bg-stone-900/70"}`}>{book.status === "Còn sách" ? `Còn ${book.stock} cuốn` : "Đã hết"}</span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Giới thiệu</h4>
            <p className="text-sm text-stone-700 leading-relaxed">{book.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Mục lục</h4>
            <ul className="text-sm space-y-1.5">
              {book.toc.map((t, i) => (
                <li key={i} className="flex gap-2 text-stone-700"><span className="text-red-700 font-bold">{String(i + 1).padStart(2, "0")}</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button onClick={onFreeRead} className="h-11 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-sm flex items-center justify-center gap-2">
            <BookOpen className="size-4" /> Đọc miễn phí
          </button>
          {canOnline && (
            <button onClick={onRentOnline} className="h-11 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center justify-center gap-2">
              <Clock className="size-4" /> Thuê online
            </button>
          )}
          <button onClick={onBuy} className="h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm flex items-center justify-center gap-2">
            <Download className="size-4" /> Mua sách
          </button>
          {canOffline && (
            <button onClick={onRentOffline} className="h-11 rounded-xl border-2 border-red-700 text-red-700 hover:bg-red-50 font-semibold text-sm flex items-center justify-center gap-2">
              <Library className="size-4" /> Mượn tại thư viện
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

// ============================================================
// Rent Online modal
// ============================================================
function RentOnlineModal({ book, onClose, onConfirm }: { book: Book; onClose: () => void; onConfirm: (r: OnlineRental) => void }) {
  const PLANS = [
    { days: 7, price: 15000, label: "1 tuần" },
    { days: 14, price: 25000, label: "2 tuần" },
    { days: 30, price: 45000, label: "1 tháng" },
  ];
  const [days, setDays] = useState(14);
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState<OnlineRental | null>(null);
  const plan = PLANS.find((p) => p.days === days)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return pushToast({ variant: "error", title: "Email không hợp lệ" });
    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + plan.days);
    end.setHours(23, 59, 59, 999);
    const r: OnlineRental = {
      id: "OL" + Date.now().toString(36).toUpperCase(),
      bookId: book.id, startAt: start.toISOString(), endAt: end.toISOString(),
      days: plan.days, price: plan.price, email: email.trim(),
    };
    setReceipt(r);
    onConfirm(r);
  };

  if (receipt) {
    return (
      <Modal open onClose={onClose} size="lg">
        <div className="p-6 text-center">
          <div className="mx-auto size-14 rounded-full bg-emerald-100 flex items-center justify-center"><Check className="size-7 text-emerald-600" /></div>
          <h3 className="mt-3 font-bold text-2xl">Thuê online thành công</h3>
          <p className="text-sm text-stone-500 mt-1">Bạn có thể đọc toàn bộ tài liệu trong "Tủ sách của tôi"</p>
          <div className="mt-5 rounded-2xl border-2 border-dashed border-red-300 bg-gradient-to-br from-red-50 to-white p-5 text-left text-sm space-y-1.5">
            <div className="flex justify-between"><span className="text-stone-500">Mã thuê</span><span className="font-mono font-bold text-red-700">{receipt.id}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Sách</span><span className="font-semibold text-right">{book.title}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Thời hạn</span><span className="font-semibold">{receipt.days} ngày</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Hết hạn</span><span className="font-semibold">{new Date(receipt.endAt).toLocaleDateString("vi-VN")}</span></div>
            <div className="flex justify-between border-t border-red-200 pt-2 mt-2"><span className="text-stone-700 font-semibold">Tổng tiền</span><span className="font-bold text-red-700">{receipt.price.toLocaleString("vi-VN")}₫</span></div>
          </div>
          <button onClick={onClose} className="mt-5 w-full h-11 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold">Hoàn tất</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open onClose={onClose} size="lg">
      <form onSubmit={submit} className="overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="size-12 rounded-xl bg-stone-900 flex items-center justify-center"><Clock className="size-6 text-white" /></div>
            <div>
              <h3 className="font-bold text-xl">Thuê đọc online</h3>
              <p className="text-sm text-stone-500 mt-0.5">{book.title} · {book.code}</p>
            </div>
            <button type="button" onClick={onClose} className="ml-auto p-1 hover:bg-stone-100 rounded"><X className="size-4" /></button>
          </div>
          <div className="mt-5">
            <div className="text-xs font-semibold text-stone-700 mb-2">Chọn gói thời hạn</div>
            <div className="grid grid-cols-3 gap-2">
              {PLANS.map((p) => (
                <button key={p.days} type="button" onClick={() => setDays(p.days)}
                  className={`rounded-xl border-2 p-3 text-center ${days === p.days ? "border-red-700 bg-red-50" : "border-stone-200 hover:border-red-300"}`}>
                  <div className="font-bold text-sm">{p.label}</div>
                  <div className={`text-xs mt-1 ${days === p.days ? "text-red-700 font-semibold" : "text-stone-500"}`}>{p.price.toLocaleString("vi-VN")}₫</div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <Field label="Email nhận biên lai (tuỳ chọn)">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="input" />
            </Field>
          </div>
          <div className="mt-4 rounded-xl bg-stone-50 border p-4 flex items-center justify-between">
            <div className="text-sm text-stone-600">Tổng thanh toán</div>
            <div className="text-xl font-bold text-red-700">{plan.price.toLocaleString("vi-VN")}₫</div>
          </div>
          <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex gap-2">
            <ShieldCheck className="size-4 flex-shrink-0 mt-0.5" />
            Đọc toàn bộ nội dung, không có quảng cáo trong suốt thời gian thuê.
          </div>
        </div>
        <div className="px-6 py-4 bg-stone-50 border-t flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-stone-300 hover:bg-white font-medium text-sm">Huỷ</button>
          <button type="submit" className="flex-1 h-11 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-sm shadow-lg shadow-red-700/30">Xác nhận thuê</button>
        </div>
      </form>
    </Modal>
  );
}


// ============================================================
// Main App
// ============================================================
function HustLibraryApp() {
  const [stockMap, setStockMap] = useLocalState<Record<string, number>>("hust.stock", {});
  const [purchases, setPurchases] = useLocalState<Purchase[]>("hust.purchases", []);
  const [offlineRentals, setOfflineRentals] = useLocalState<OfflineRental[]>("hust.offline", []);
  const [onlineRentals, setOnlineRentals] = useLocalState<OnlineRental[]>("hust.online", []);

  const books: Book[] = useMemo(() => INITIAL_BOOKS.map((b) => {
    const s = stockMap[b.id] ?? b.stock;
    return { ...b, stock: s, status: s > 0 ? "Còn sách" : "Hết sách" };
  }), [stockMap]);

  const [tab, setTab] = useState<"home" | "catalog" | "my">("home");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Tất cả");
  const [inst, setInst] = useState("Tất cả");
  const [rentType, setRentType] = useState<"Tất cả" | RentType>("Tất cả");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [selected, setSelected] = useState<Book | null>(null);
  const [buyFor, setBuyFor] = useState<Book | null>(null);
  const [rentOfflineFor, setRentOfflineFor] = useState<Book | null>(null);
  const [rentOnlineFor, setRentOnlineFor] = useState<Book | null>(null);
  const [reading, setReading] = useState<Book | null>(null);


  const filtered = useMemo(() => books.filter((b) => {
    if (cat !== "Tất cả" && b.category !== cat) return false;
    if (inst !== "Tất cả" && b.institute !== inst) return false;
    if (rentType !== "Tất cả" && b.type !== rentType && b.type !== "Cả hai") return false;
    if (query) {
      const q = query.toLowerCase();
      if (!b.title.toLowerCase().includes(q) && !b.code.toLowerCase().includes(q) && !b.author.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [books, cat, inst, rentType, query]);

  const confirmBuy = (p: Purchase) => {
    setPurchases([p, ...purchases]);
    pushToast({ variant: "success", title: "Đã đặt mua sách", description: `Mã đơn ${p.id} · ${p.price.toLocaleString("vi-VN")}₫` });
  };

  const confirmOffline = (r: OfflineRental) => {
    setOfflineRentals([r, ...offlineRentals]);
    const base = INITIAL_BOOKS.find((x) => x.id === r.bookId)?.stock ?? 0;
    setStockMap({ ...stockMap, [r.bookId]: Math.max(0, (stockMap[r.bookId] ?? base) - 1) });
    pushToast({ variant: "success", title: "Đã đặt lịch mượn sách", description: `Mã đặt ${r.id} · Nhận ngày ${new Date(r.pickupDate).toLocaleDateString("vi-VN")}` });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <style>{`
        .input { @apply w-full h-10 px-3 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600; }
        .input { width:100%; height:2.5rem; padding:0 .75rem; border-radius:.5rem; border:1px solid #d6d3d1; background:#fff; font-size:.875rem; outline:none; }
        .input:focus { border-color:#b31a1a; box-shadow:0 0 0 3px rgba(179,26,26,.15); }
        @keyframes inAnim { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform:none; } }
        .animate-in { animation: inAnim .2s ease-out; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={() => setTab("home")} className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-red-700/30">HU</div>
            <div className="leading-tight hidden sm:block">
              <div className="font-bold text-sm">HUST Library</div>
              <div className="text-[10px] text-stone-500">Thư viện học liệu Bách Khoa</div>
            </div>
          </button>
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {([["home", "Trang chủ", Home], ["catalog", "Học liệu", Library], ["my", "Tủ sách", User]] as const).map(([k, l, I]) => (
              <button key={k} onClick={() => setTab(k)} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 ${tab === k ? "bg-red-50 text-red-700" : "text-stone-600 hover:bg-stone-100"}`}>
                <I className="size-4" />{l}
              </button>
            ))}
          </nav>
          <div className="flex-1 max-w-md ml-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); setTab("catalog"); }} placeholder="Tìm theo mã / tên học phần..." className="w-full h-10 pl-9 pr-3 rounded-full bg-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-10">
        {tab === "home" && <HomeView books={books} setTab={setTab} onOpen={setSelected} />}
        {tab === "catalog" && (
          <CatalogView
            books={filtered} total={books.length}
            cat={cat} setCat={setCat} inst={inst} setInst={setInst}
            rentType={rentType} setRentType={setRentType}
            filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen}
            onOpen={setSelected}
          />
        )}
        {tab === "my" && (
          <MyShelf
            books={books} purchases={purchases}
            offlineRentals={offlineRentals} setOfflineRentals={setOfflineRentals}
            onlineRentals={onlineRentals} setOnlineRentals={setOnlineRentals}
            setStockMap={setStockMap} stockMap={stockMap}
            onRead={setReading}
          />
        )}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30">
        <div className="grid grid-cols-3">
          {([["home", "Trang chủ", Home], ["catalog", "Học liệu", Library], ["my", "Tủ sách", User]] as const).map(([k, l, I]) => (
            <button key={k} onClick={() => setTab(k)} className={`py-3 flex flex-col items-center gap-1 text-[11px] ${tab === k ? "text-red-700" : "text-stone-500"}`}>
              <I className="size-5" />{l}
            </button>
          ))}
        </div>
      </nav>

      {selected && (
        <BookDetail
          book={selected} onClose={() => setSelected(null)}
          onFreeRead={() => { setReading(selected); setSelected(null); }}
          onBuy={() => { setBuyFor(selected); setSelected(null); }}
          onRentOffline={() => { setRentOfflineFor(selected); setSelected(null); }}
          onRentOnline={() => { setRentOnlineFor(selected); setSelected(null); }}
        />
      )}
      {buyFor && <BuyModal book={buyFor} onClose={() => setBuyFor(null)} onConfirm={confirmBuy} />}
      {rentOfflineFor && <RentOfflineModal book={rentOfflineFor} onClose={() => setRentOfflineFor(null)} onConfirm={confirmOffline} />}
      {rentOnlineFor && (
        <RentOnlineModal
          book={rentOnlineFor}
          onClose={() => setRentOnlineFor(null)}
          onConfirm={(r) => {
            setOnlineRentals([r, ...onlineRentals]);
            pushToast({ variant: "success", title: "Đã thuê online thành công", description: `Đọc đến ${new Date(r.endAt).toLocaleDateString("vi-VN")}` });
          }}
        />
      )}
      {reading && <PdfReader book={reading} onClose={() => setReading(null)} />}
      <ToastViewport />
    </div>
  );
}


function HomeView({ books, setTab, onOpen }: { books: Book[]; setTab: (t: "home" | "catalog" | "my") => void; onOpen: (b: Book) => void }) {
  const featured = books.slice(0, 4);
  const popular = books.slice(4, 8);
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-red-900 to-stone-900 p-8 sm:p-12 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/15 backdrop-blur px-3 py-1.5 rounded-full"><GraduationCap className="size-3.5" /> Đại học Bách khoa Hà Nội</div>
          <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold leading-tight">Thư viện học liệu<br />dành cho sinh viên HUST</h1>
          <p className="mt-3 text-sm sm:text-base text-red-100 max-w-lg">Truy cập kho giáo trình chính thống các môn đại cương, chuyên ngành. Thuê đọc online hoặc đặt lịch mượn sách giấy tại thư viện Tạ Quang Bửu.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => setTab("catalog")} className="px-5 h-11 rounded-xl bg-white text-red-800 font-semibold text-sm hover:bg-stone-100 flex items-center gap-2"><Library className="size-4" /> Duyệt học liệu</button>
            <button onClick={() => setTab("my")} className="px-5 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/30 text-white font-semibold text-sm hover:bg-white/20 flex items-center gap-2"><User className="size-4" /> Tủ sách của tôi</button>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-md">
            <Stat k={books.length + "+"} l="Giáo trình" />
            <Stat k="24/7" l="Đọc online" />
            <Stat k="HUST" l="Chính thống" />
          </div>
        </div>
      </section>

      <Section title="Học liệu tiêu biểu" subtitle="Bộ giáo trình bắt buộc cho sinh viên K68+">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((b) => <BookCard key={b.id} book={b} onOpen={onOpen} />)}
        </div>
      </Section>

      <Section title="Được mượn nhiều" subtitle="Các tài liệu phổ biến nhất kỳ này">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popular.map((b) => <BookCard key={b.id} book={b} onOpen={onOpen} />)}
        </div>
      </Section>
    </div>
  );
}

function Stat({ k, l }: { k: string; l: string }) {
  return <div><div className="font-serif text-2xl sm:text-3xl font-bold">{k}</div><div className="text-[11px] text-red-200 uppercase tracking-wider">{l}</div></div>;
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">{title}</h2>
        {subtitle && <p className="text-sm text-stone-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function CatalogView(props: {
  books: Book[]; total: number;
  cat: string; setCat: (v: string) => void;
  inst: string; setInst: (v: string) => void;
  rentType: "Tất cả" | RentType; setRentType: (v: "Tất cả" | RentType) => void;
  filtersOpen: boolean; setFiltersOpen: (v: boolean) => void;
  onOpen: (b: Book) => void;
}) {
  const { books, total, cat, setCat, inst, setInst, rentType, setRentType, filtersOpen, setFiltersOpen, onOpen } = props;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Danh mục học liệu</h1>
          <p className="text-sm text-stone-500 mt-1">Hiển thị {books.length}/{total} tài liệu</p>
        </div>
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden h-10 px-4 rounded-lg border border-stone-300 bg-white flex items-center gap-2 text-sm font-medium"><Filter className="size-4" /> Lọc</button>
      </div>

      <div className={`${filtersOpen ? "block" : "hidden"} md:block bg-white rounded-2xl border border-stone-200 p-4 mb-6 space-y-4`}>
        <FilterRow label="Phân loại học phần" options={CATEGORIES} value={cat} onChange={setCat} />
        <FilterRow label="Viện đào tạo" options={INSTITUTES} value={inst} onChange={setInst} />
        <FilterRow label="Hình thức thuê" options={RENT_TYPES as readonly string[]} value={rentType} onChange={(v) => setRentType(v as "Tất cả" | RentType)} />
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20 text-stone-500">Không tìm thấy tài liệu phù hợp với bộ lọc.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((b) => <BookCard key={b.id} book={b} onOpen={onOpen} />)}
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)} className={`px-3 py-1.5 text-xs font-medium rounded-full border ${value === o ? "bg-red-700 border-red-700 text-white" : "bg-white border-stone-300 text-stone-700 hover:border-red-400"}`}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function MyShelf({ books, purchases, offlineRentals, setOfflineRentals, onlineRentals, setOnlineRentals, setStockMap, stockMap, onRead }: {
  books: Book[]; purchases: Purchase[];
  offlineRentals: OfflineRental[]; setOfflineRentals: (r: OfflineRental[]) => void;
  onlineRentals: OnlineRental[]; setOnlineRentals: (r: OnlineRental[]) => void;
  setStockMap: (m: Record<string, number>) => void;
  stockMap: Record<string, number>;
  onRead: (b: Book) => void;
}) {
  const findBook = (id: string) => books.find((b) => b.id === id);

  const updateOfflineStatus = (id: string, status: OfflineRental["status"]) => {
    const next = offlineRentals.map((r) => r.id === id ? { ...r, status } : r);
    setOfflineRentals(next);
    if (status === "Đã trả") {
      const r = offlineRentals.find((x) => x.id === id);
      if (r) {
        const base = INITIAL_BOOKS.find((b) => b.id === r.bookId)?.stock ?? 0;
        setStockMap({ ...stockMap, [r.bookId]: Math.min(base, (stockMap[r.bookId] ?? base) + 1) });
      }
      pushToast({ variant: "info", title: "Đã trả sách thành công" });
    } else {
      pushToast({ variant: "info", title: "Đã cập nhật trạng thái", description: status });
    }
  };

  const paymentMap = { "Đang xử lý": "bg-amber-100 text-amber-800", "Đang giao": "bg-blue-100 text-blue-800", "Đã giao": "bg-emerald-100 text-emerald-800" } as const;

  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-red-900 p-6 sm:p-8 text-white flex items-center gap-5">
        <div className="size-16 sm:size-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold">SV</div>
        <div>
          <div className="text-xs text-red-200 uppercase tracking-wider">Tài khoản của tôi</div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">Tủ sách của tôi</h1>
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-red-100">
            <span className="flex items-center gap-1"><Clock className="size-3.5" /> {onlineRentals.length} gói online</span>
            <span className="flex items-center gap-1"><Download className="size-3.5" /> {purchases.length} đơn mua</span>
            <span className="flex items-center gap-1"><Library className="size-3.5" /> {offlineRentals.length} lịch mượn</span>
          </div>
        </div>
      </div>

      <section>
        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2"><Clock className="size-5 text-red-700" /> Thuê đọc online</h2>
        {onlineRentals.length === 0 ? (
          <Empty text="Bạn chưa thuê online cuốn nào." />
        ) : (
          <div className="space-y-3">
            {onlineRentals.map((r) => {
              const b = findBook(r.bookId); if (!b) return null;
              const active = isRentalActive(r);
              const daysLeft = Math.max(0, Math.ceil((new Date(r.endAt).getTime() - Date.now()) / 86400000));
              return (
                <div key={r.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className={`size-14 rounded-lg bg-gradient-to-br ${b.cover} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-red-700">{b.code}</span>
                      <span className="text-[10px] font-mono text-stone-500">{r.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"}`}>{active ? `Còn ${daysLeft} ngày` : "Đã hết hạn"}</span>
                    </div>
                    <div className="font-semibold truncate">{b.title}</div>
                    <div className="text-xs text-stone-500 mt-1 flex flex-wrap gap-x-3">
                      <span className="flex items-center gap-1"><CalIcon className="size-3" /> Hết hạn {new Date(r.endAt).toLocaleDateString("vi-VN")}</span>
                      <span>· Gói {r.days} ngày · {r.price.toLocaleString("vi-VN")}₫</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={!active}
                      onClick={() => active && onRead(b)}
                      className="h-9 px-3 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                      <BookOpen className="size-3.5" /> {active ? "Đọc ngay" : "Hết hạn"}
                    </button>
                    {!active && (
                      <button
                        onClick={() => setOnlineRentals(onlineRentals.filter((x) => x.id !== r.id))}
                        className="h-9 px-3 rounded-lg border border-stone-300 text-stone-600 text-xs font-semibold hover:bg-stone-50"
                      >Xoá</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2"><Download className="size-5 text-red-700" /> Đơn mua sách</h2>
        {purchases.length === 0 ? (
          <Empty text="Bạn chưa có đơn mua sách nào." />
        ) : (
          <div className="space-y-3">
            {purchases.map((p) => {
              const b = findBook(p.bookId); if (!b) return null;
              return (
                <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className={`size-14 rounded-lg bg-gradient-to-br ${b.cover} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-red-700">{b.code}</span>
                      <span className="text-[10px] font-mono text-stone-500">{p.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${paymentMap[p.status]}`}>{p.status}</span>
                    </div>
                    <div className="font-semibold truncate">{b.title}</div>
                    <div className="text-xs text-stone-500 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="flex items-center gap-1"><CalIcon className="size-3" /> {new Date(p.createdAt).toLocaleDateString("vi-VN")}</span>
                      <span>· {p.payment}</span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" /> {p.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-700">{p.price.toLocaleString("vi-VN")}₫</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2"><Library className="size-5 text-red-700" /> Lịch hẹn mượn sách
        </h2>
        {offlineRentals.length === 0 ? (
          <Empty text="Chưa có lịch hẹn nào." />
        ) : (
          <div className="space-y-3">
            {offlineRentals.map((r) => {
              const b = findBook(r.bookId); if (!b) return null;
              return (
                <div key={r.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="size-12 bg-white rounded-lg border border-stone-200 p-1 flex-shrink-0"><QrPattern seed={r.qr} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-red-700">{b.code}</span>
                      <span className="text-[10px] font-mono text-stone-500">{r.id}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="font-semibold truncate">{b.title}</div>
                    <div className="text-xs text-stone-500 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="flex items-center gap-1"><CalIcon className="size-3" /> {new Date(r.pickupDate).toLocaleDateString("vi-VN")}</span>
                      <span>· {r.duration}</span>
                      <span className="flex items-center gap-1"><Phone className="size-3" /> {r.phone}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {r.status === "Chờ đến lấy" && <button onClick={() => updateOfflineStatus(r.id, "Đang mượn")} className="h-9 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold">Đã nhận</button>}
                    {r.status === "Đang mượn" && <button onClick={() => updateOfflineStatus(r.id, "Đã trả")} className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold">Trả sách</button>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: OfflineRental["status"] }) {
  const map = { "Chờ đến lấy": "bg-amber-100 text-amber-800", "Đang mượn": "bg-blue-100 text-blue-800", "Đã trả": "bg-stone-200 text-stone-700" } as const;
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${map[status]}`}>{status}</span>;
}

function Empty({ text }: { text: string }) {
  return <div className="text-center py-12 text-sm text-stone-500 bg-white rounded-2xl border border-dashed border-stone-300">{text}</div>;
}
