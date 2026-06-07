export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string; // gradient class
  accent: string;
  rating: number;
  available: number;
  pages: number;
  year: number;
  description: string;
  preface: string; // Lời nói đầu (miễn phí)
  toc: string[]; // Mục lục (miễn phí)
  fullContent: string; // Nội dung đầy đủ (cần thuê)
};

export const categories = [
  "Tất cả",
  "Văn học",
  "Tiểu thuyết",
  "Lịch sử",
  "Khoa học",
  "Thiếu nhi",
  "Kỹ năng",
];

const longSample = (title: string) =>
  `Đây là toàn bộ nội dung của "${title}". Bạn có thể đọc thoải mái trong thời gian thuê.\n\n` +
  Array.from({ length: 6 })
    .map(
      (_, i) =>
        `Chương ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ` +
        `Nulla facilisi. Mỗi trang sách là một bước chân nhỏ trên hành trình lớn của tri thức. ` +
        `Người đọc kiên nhẫn sẽ tìm thấy ánh sáng giữa những con chữ tưởng chừng quen thuộc...`,
    )
    .join("\n\n");

export const books: Book[] = [
  {
    id: "1",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    category: "Kỹ năng",
    cover: "from-amber-700 to-amber-900",
    accent: "oklch(0.55 0.16 50)",
    rating: 4.8,
    available: 5,
    pages: 320,
    year: 1936,
    description:
      "Cuốn sách kinh điển về nghệ thuật ứng xử, giao tiếp và xây dựng mối quan hệ.",
    preface:
      "Trong gần một thế kỷ qua, Đắc Nhân Tâm đã đồng hành cùng hàng triệu độc giả trên hành trình hoàn thiện bản thân. Cuốn sách không dạy bạn cách thao túng người khác — nó dạy bạn cách thấu hiểu.",
    toc: [
      "Phần 1: Nghệ thuật ứng xử căn bản",
      "Phần 2: Sáu cách tạo thiện cảm",
      "Phần 3: 12 cách thuyết phục người khác",
      "Phần 4: Trở thành nhà lãnh đạo",
    ],
    fullContent: longSample("Đắc Nhân Tâm"),
  },
  {
    id: "2",
    title: "Số Đỏ",
    author: "Vũ Trọng Phụng",
    category: "Văn học",
    cover: "from-rose-700 to-rose-900",
    accent: "oklch(0.5 0.18 25)",
    rating: 4.7,
    available: 3,
    pages: 268,
    year: 1936,
    description:
      "Tiểu thuyết trào phúng về xã hội Việt Nam thời thực dân nửa phong kiến.",
    preface:
      "Số Đỏ — bức tranh trào phúng sắc bén về một xã hội đảo điên, nơi sự giả tạo lên ngôi và những kẻ vô học bỗng chốc trở thành 'người văn minh'.",
    toc: [
      "Chương I — Xuân tóc đỏ vào nghề",
      "Chương V — Cuộc cải cách của ông Phán mọc sừng",
      "Chương X — Một đám ma gương mẫu",
      "Chương XX — Hạnh phúc của một tang gia",
    ],
    fullContent: longSample("Số Đỏ"),
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Lịch sử",
    cover: "from-stone-700 to-stone-900",
    accent: "oklch(0.4 0.04 60)",
    rating: 4.9,
    available: 2,
    pages: 512,
    year: 2011,
    description:
      "Lược sử loài người — hành trình từ thời kỳ đồ đá đến kỷ nguyên công nghệ.",
    preface:
      "100.000 năm trước, có ít nhất sáu loài người sinh sống trên Trái Đất. Hôm nay chỉ còn lại một. Cuốn sách này kể câu chuyện về việc chúng ta đã trở thành chính mình như thế nào.",
    toc: [
      "Phần 1: Cách mạng Nhận thức",
      "Phần 2: Cách mạng Nông nghiệp",
      "Phần 3: Sự thống nhất của loài người",
      "Phần 4: Cách mạng Khoa học",
    ],
    fullContent: longSample("Sapiens"),
  },
  {
    id: "4",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    category: "Tiểu thuyết",
    cover: "from-yellow-600 to-orange-800",
    accent: "oklch(0.62 0.18 60)",
    rating: 4.6,
    available: 7,
    pages: 224,
    year: 1988,
    description:
      "Câu chuyện về Santiago — chàng chăn cừu đi tìm kho báu và khám phá bản thân.",
    preface:
      "Khi bạn thực sự khao khát một điều gì đó, cả vũ trụ sẽ hợp lực giúp bạn đạt được điều đó. Đây là khởi đầu của một hành trình.",
    toc: [
      "Phần Một — Giấc mơ của Santiago",
      "Phần Hai — Sa mạc và những dấu hiệu",
      "Phần Ba — Kim tự tháp",
      "Vĩ thanh",
    ],
    fullContent: longSample("Nhà Giả Kim"),
  },
  {
    id: "5",
    title: "Vũ Trụ Trong Vỏ Hạt Dẻ",
    author: "Stephen Hawking",
    category: "Khoa học",
    cover: "from-indigo-800 to-slate-900",
    accent: "oklch(0.35 0.1 270)",
    rating: 4.7,
    available: 4,
    pages: 224,
    year: 2001,
    description:
      "Hành trình khám phá vũ trụ qua lăng kính vật lý lý thuyết hiện đại.",
    preface:
      "Có lẽ bạn nghĩ vật lý lý thuyết là khó. Nhưng vũ trụ vốn dĩ giản dị hơn ta tưởng — chỉ cần một góc nhìn đúng.",
    toc: [
      "Chương 1 — Lược sử thuyết tương đối",
      "Chương 2 — Hình dạng của thời gian",
      "Chương 3 — Vũ trụ trong vỏ hạt dẻ",
      "Chương 4 — Tiên đoán tương lai",
    ],
    fullContent: longSample("Vũ Trụ Trong Vỏ Hạt Dẻ"),
  },
  {
    id: "6",
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    category: "Thiếu nhi",
    cover: "from-emerald-700 to-emerald-900",
    accent: "oklch(0.45 0.12 160)",
    rating: 4.8,
    available: 6,
    pages: 180,
    year: 1941,
    description:
      "Cuộc phiêu lưu thú vị của chú Dế Mèn qua những vùng đất mới lạ.",
    preface:
      "Tôi sống độc lập từ thuở bé. Ấy là tục lệ lâu đời trong họ nhà dế chúng tôi...",
    toc: [
      "Chương 1 — Tuổi thơ của Dế Mèn",
      "Chương 2 — Bài học đường đời đầu tiên",
      "Chương 5 — Gặp Dế Trũi",
      "Chương 10 — Hội nghị muôn loài",
    ],
    fullContent: longSample("Dế Mèn Phiêu Lưu Ký"),
  },
  {
    id: "7",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    category: "Kỹ năng",
    cover: "from-pink-600 to-rose-800",
    accent: "oklch(0.55 0.2 15)",
    rating: 4.5,
    available: 8,
    pages: 290,
    year: 2016,
    description: "Cẩm nang truyền cảm hứng cho người trẻ trên hành trình tự khám phá.",
    preface:
      "Tuổi trẻ là khoảng thời gian đẹp nhất và cũng dễ tổn thương nhất. Cuốn sách này là một người bạn đồng hành.",
    toc: ["Học", "Đi", "Đọc", "Viết & sống"],
    fullContent: longSample("Tuổi Trẻ Đáng Giá Bao Nhiêu"),
  },
  {
    id: "8",
    title: "1984",
    author: "George Orwell",
    category: "Tiểu thuyết",
    cover: "from-zinc-700 to-zinc-900",
    accent: "oklch(0.3 0.02 250)",
    rating: 4.8,
    available: 1,
    pages: 368,
    year: 1949,
    description: "Tác phẩm dystopia kinh điển về một xã hội bị giám sát toàn trị.",
    preface:
      "Đó là một ngày tháng Tư lạnh giá và trong sáng, đồng hồ điểm mười ba giờ. Winston Smith bước vào một thế giới nơi sự thật bị viết lại mỗi ngày.",
    toc: ["Phần Một — Winston", "Phần Hai — Julia", "Phần Ba — Phòng 101", "Phụ lục — Tân ngữ"],
    fullContent: longSample("1984"),
  },
];

export const getBookById = (id: string) => books.find((b) => b.id === id);
