import {
  Building2,
  Figma,
  Headset,
  Instagram,
  ListChecks,
  MonitorSmartphone,
  PanelsTopLeft,
  Settings2,
  ShoppingCart,
  Smartphone,
  SquarePen,
  Wallet,
  ZapIcon,
} from "lucide-react";

const CONTACT_PERSON = process.env.NEXT_PUBLIC_CONTACT_PERSON!;

const contact = {
  email: "calarayaproject@gmail.com",
  phone: CONTACT_PERSON,
  address: "Tangerang Selatan & Bogor, Indonesia",
};

const socialMedia = [
  { icon: Instagram, href: "https://www.instagram.com/calarayaproject" },
];

const faqs = [
  {
    q: "Berapa lama pembuatan undangan digital?",
    a: "Pembuatan undangan digital memakan waktu 1 hari kerja setelah semua data diterima lengkap.",
  },
  {
    q: "Berapa lama pembuatan undangan digital custom?",
    a: "Pembuatan undangan digital memakan waktu 5-7 hari kerja setelah semua data diterima lengkap.",
  },
  {
    q: "Berapa lama pembuatan website?",
    a: "Pembuatan website paling cepat memakan waktu 2-3 minggu tergantung kompleksitas fitur dan jumlah halaman yang diinginkan.",
  },
  {
    q: "Apakah undangan digital dan website bisa revisi?",
    a: "Bisa, kami menyediakan unlimited revisi untuk undangan digital dan menyesuaikan untuk revisi website hingga hasil sesuai keinginan.",
  },
  {
    q: "Apakah bisa custom tema undangan?",
    a: "bisa banget, kami menyediakan custom tema undangan sesuai dengan keinginan.",
  },
  {
    q: "Bagaimana cara pembayaran?",
    a: "Pembayaran via transfer bank, GoPay, ShopeePay dan OVO. Sistem DP 50% di awal, pelunasan 50% setelah project selesai.",
  },
  {
    q: "Bagaimana cara menyebarkan undangan?",
    a: "Undangan dibagikan melalui halaman admin yang kami sediakan. Anda akan mendapatkan akun khusus untuk mengelola dan membagikan link undangan kepada tamu melalui Whatsapp, Instagram dan lainnya.",
  },
  {
    q: "Berapa lama masa berlaku undangan?",
    a: "Undangan berlaku selamanya dan dapat diakses kapan saja tanpa batas waktu.",
  },
  {
    q: "Apakah ada batasan jumlah tamu undangan?",
    a: "Tidak ada batasan jumlah tamu. Anda dapat mengundang tamu sebanyak yang dibutuhkan tanpa pembatasan.",
  },
];

const navLinks = [
  { name: "Beranda", href: "#home" },
  { name: "Kenapa Kami", href: "#why-us" },
  { name: "Tema", href: "#themes" },
  { name: "Website", href: "#website" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Review", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
];

const portfolios = [
  {
    title: "Qatia Rent",
    description:
      "Admin Page - Order Form - Email Notification - Product Management - Dashboard - PWA",
    product: "Website",
    type: "Rental Website",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1765989761/personal/web-porto/qatia_tiulwx.png",
    url: "https://qatiarent.com/",
  },
  {
    title: "Arie & Elfhira",
    description: "",
    product: "Undangan Digital",
    type: "Monochrome",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1779555221/personal/web-porto/mono_lu00dd.png",
    url: "https://calaraya.vercel.app/arie-elfhira?id=xoswlp",
  },
  {
    title: "Amry & Erinka",
    description: "",
    product: "Undangan Digital",
    type: "Stylish Bold Custom",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1776399437/personal/web-porto/marooncustom_jxuweq.png",
    url: "https://calaraya.vercel.app/amry-erinka?id=QQty2V",
  },
  {
    title: "Bella & Syafik",
    description: "",
    product: "Undangan Digital",
    type: "Netflix",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1772735950/personal/web-porto/Screenshot_2026-03-06_013639_kiummn.png",
    url: "https://calaraya.vercel.app/bella-syafik?id=JnfkdW",
  },
  {
    title: "Ridho & Sasa",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766314852/personal/web-porto/sasa_ridho_xqorpc.png",
    url: "https://calaraya.vercel.app/ridho-sasa?id=6xCqNG",
  },
  {
    title: "Naomi & Rayhan",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766311068/personal/web-porto/magazine_naomi_xmtaes.png",
    url: "https://calaraya.vercel.app/naomi-rayhan?id=k5HWZ",
  },
  {
    title: "Shamil & Sarah",
    description: "",
    product: "Undangan Digital",
    type: "Maroon Custom",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766314647/personal/web-porto/shamilsarah_a6vjfd.png",
    url: "https://calaraya.vercel.app/sarah-shamil?id=3otO5E",
  },
  {
    title: "Rahma & Jalal",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1765993975/personal/web-porto/magazine_yt4whr.png",
    url: "https://calaraya.vercel.app/rahma-jalal?id=Gku6G",
  },
  {
    title: "Gabriel & Rilly",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1772739077/personal/web-porto/repisi_lyqjbk.png",
    url: "https://calaraya.vercel.app/gabriel-rilly?id=ENSWl4",
  },
  {
    title: "Ilham & Rosi",
    description: "",
    product: "Undangan Digital",
    type: "Floral",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1765992923/personal/web-porto/floral_lund0v.png",
    url: "https://calaraya.vercel.app/ilham-rosi?id=O9IPp",
  },
  {
    title: "Agung & Dessy",
    description: "",
    product: "Undangan Digital",
    type: "Netflix",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766307590/personal/web-porto/netflix_agung_oz1ov9.png",
    url: "https://calaraya.vercel.app/agung-dessy?id=m6u1M",
  },
  {
    title: "Andres & Agnalya",
    description: "",
    product: "Undangan Digital",
    type: "Netflix",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766310590/personal/web-porto/netflix_andres_agnal_ppk1iy.png",
    url: "https://calaraya.vercel.app/andres-agnalya?id=mrfBW",
  },
  {
    title: "Ferdy & Irma",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766311786/personal/web-porto/ferdyirma_t0uis9.png",
    url: "https://calaraya.vercel.app/ferdy-irma?id=BMCXM",
  },
  {
    title: "Reigiya & Amar",
    description: "",
    product: "Undangan Digital",
    type: "Maroon",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1772739451/personal/web-porto/regiya_jamf7h.png",
    url: "https://calaraya.vercel.app/reigiya-amar?id=1XsqW",
  },
  {
    title: "Choirul & Amanda",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766312056/personal/web-porto/choirulamanda_qs6nu8.png",
    url: "https://calaraya.vercel.app/choirul-amanda?id=y6tle",
  },
  {
    title: "Yogi & Nova",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766312656/personal/web-porto/yoginova_i4s42t.png",
    url: "https://calaraya.vercel.app/yogi-nova?id=A5FBX",
  },
  {
    title: "Riko & Shelly",
    description: "",
    product: "Undangan Digital",
    type: "Magazine",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766313116/personal/web-porto/riko-shelly_qy9mey.png",
    url: "https://calaraya.vercel.app/riko-shelly?id=lyhwL",
  },
  {
    title: "Ikhsan & Tasya",
    description: "",
    product: "Undangan Digital",
    type: "Maroon",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766314384/personal/web-porto/ikhsan_tasya_vnqmcd.png",
    url: "https://calaraya.vercel.app/ihksan-tasya?id=n4cBkO",
  },

  {
    title: "Dinna & Hudha",
    description: "",
    product: "Undangan Digital",
    type: "Stylish Bold",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1765994579/personal/web-porto/stylishbold_armbt3.png",
    url: "https://calaraya.vercel.app/dinna-hudha?id=6yTQy",
  },
  {
    title: "Fajar & Rike",
    description: "",
    product: "Undangan Digital",
    type: "Maroon Custom",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1778410709/personal/web-porto/rike_t7xvt0.png",
    url: "https://calaraya.vercel.app/fajar-rike?id=nliBqA",
  },
  {
    title: "Calapos",
    description: "Transaction Management - Inventory Tracking - Sales Reporting - Real-time Dashboard - Receipt Printing",
    product: "Website",
    type: "Point of Sales",
    image: "https://res.cloudinary.com/dk16ng09n/image/upload/v1778410956/personal/web-porto/ss_pos_x6jwv7.png",
    url: "https://calapos.shop",
  },
  {
    title: "Nadiah & Haris",
    description: "",
    product: "Undangan Digital",
    type: "Monochrome",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766313919/personal/web-porto/nadhar_rginzu.png",
    url: "https://calaraya.vercel.app/nadiah-haris?id=XyUaw",
  },
  {
    title: "Nadara & Haoxu",
    description: "",
    product: "Undangan Digital",
    type: "Monochrome",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1781266429/personal/web-porto/haoxu_kyyahg.png",
    url: "https://calaraya.vercel.app/haoxu-nadara?id=zMHAAp",
  },
  {
    title: "Fancy & Hans",
    description: "",
    product: "Undangan Digital",
    type: "Maroon",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1781266431/personal/web-porto/hans_gdbrfm.png",
    url: "https://calaraya.vercel.app/fancy-hans?id=rYrTKLV",
  },
];

const reviews = [
  {
    name: "Qatia Rent",
    rating: 5,
    product: "Website",
    type: "Rental Website",
    comment:
      "Semuanya oke banget dan bikin happy apalagi tampilannya elegan. Ga sabar buat launching....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417110/personal/web-porto/testimonials/6.qatia_xjpjms.png",
  },
  {
    name: "Andres & Agnalya",
    rating: 5,
    product: "Undangan Digital",
    type: "Netflix",
    comment:
      "Halo ka! Undangan digitalnya bagus banget, temen2ku pada bilang beda dari yang lain temanya. Suka bgtttt!....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417109/personal/web-porto/testimonials/1.agnal_fix_sjdsgs.png",
  },
  {
    name: "Bella & Syafik",
    rating: 5,
    product: "Undangan Digital",
    type: "Netflix",
    comment:
      "Wedding invitationnya lucu & unik, semua sistemnya juga sangat memudahkan, gak ribet, sat set....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417109/personal/web-porto/testimonials/2.bella_dqml6p.png",
  },
  {
    name: "Ferdy & Irma",
    rating: 5,
    product: "Undangan Digital",
    type: "Magazine",
    comment:
      "Kak gemes banget, mau nangis. Aku seneng soalnya templatenya simple dan aku banget....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417109/personal/web-porto/testimonials/3.ferdy_irma_fix_chyntn.png",
  },
  {
    name: "Reigiya & Amar",
    rating: 5,
    product: "Undangan Digital",
    type: "Maroon",
    comment:
      "Hasilnya bagus banget gemesss, sesuai kemauan aku, kaka juga ramah banget dan sabar....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417109/personal/web-porto/testimonials/4.giya_a_buk4y3.png",
  },
  {
    name: "Nadiah & Haris",
    rating: 5,
    product: "Undangan Digital",
    type: "Monochrome",
    comment:
      "Masyaallah kak, aku & calon suami suka bgt. Lucu Puollll!!! Konsepnya sesuai selera kami....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417111/personal/web-porto/testimonials/5.nadiah_rrztlh.png",
  },
  {
    name: "Rahma & Jalal",
    rating: 5,
    product: "Undangan Digital",
    type: "Magazine",
    comment:
      "Undangan digital dr calaraya bagus banget dan sesuai sama yg kita mau....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417113/personal/web-porto/testimonials/7.rahma_ldwunt.png",
  },
  {
    name: "Tasya & Ikhsan",
    rating: 5,
    product: "Undangan Digital",
    type: "Maroon",
    comment:
      "Masyaallah untuk respon admin sangat baik dan cepat, selalu sigap dengan komen klien....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1766417113/personal/web-porto/testimonials/8.tasya_pfewuh.png",
  },
  {
    name: "Ridho & Sasa",
    rating: 5,
    product: "Undangan Digital",
    type: "Magazine",
    comment:
      "Designya aku suka simple & minimalist, semua detailed request ku ditampung dan dikerjakan dengan ramah dan sabar ....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1767068847/personal/web-porto/testimonials/WhatsApp_Image_2025-12-30_at_11.24.16_AM_a8u0tu.jpg",
  },
  {
    name: "Gabriel & Rilly",
    rating: 5,
    product: "Undangan Digital",
    type: "Magazine",
    comment:
      "Overall aku suka bgt sih kak, designya minimalist tapi bagus, terus aku juga happy karena bisa dicustom sesuai sama requestku....",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1772737520/personal/web-porto/testimonials/Screenshot_2026-03-06_020420_qwjcsx.png",
  },
  {
    name: "Amry & Erinka",
    rating: 5,
    product: "Undangan Digital",
    type: "Stylish Bold Custom",
    comment:
      "Pelayanannya bagus dari aku yang banyak mau dan banyak revisi...",
    reviewImage:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1776399591/personal/web-porto/testimonials/WhatsApp_Image_2026-04-16_at_4.03.20_PM_dmo9zm.jpg",
  },
];

const allThemes = [
  {
    name: "Netflix",
    type: "Undangan Digital",
    category: "Wedding",
    price: "Rp 100.000",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1772735950/personal/web-porto/Screenshot_2026-03-06_013639_kiummn.png",
    previewUrl: "https://calaraya.vercel.app/bella-syafik?id=JnfkdW",
    features: [
      "Auto Scroll",
      "RSVP",
      "Galeri",
      "Custom Music",
      "Story",
      "Gift Info",
      "Google Maps",
    ],
  },
  {
    name: "Floral",
    type: "Undangan Digital",
    category: "Wedding",
    price: "Rp 100.000",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1765992923/personal/web-porto/floral_lund0v.png",
    previewUrl: "https://calaraya.vercel.app/ilham-rosi?id=O9IPp",
    features: [
      "RSVP",
      "Galeri",
      "Custom Music",
      "Calendar",
      "Google Maps",
      "Gift Info",
    ],
  },
  {
    name: "Magazine",
    type: "Undangan Digital",
    category: "Wedding",
    price: "Rp 100.000",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1772739077/personal/web-porto/repisi_lyqjbk.png",
    previewUrl: "https://calaraya.vercel.app/gabriel-rilly?id=ENSWl4",
    features: [
      "RSVP",
      "Galeri",
      "Custom Music",
      "Calendar",
      "Google Maps",
      "Gift Info",
    ],
  },
  {
    name: "Maroon",
    type: "Undangan Digital",
    category: "Wedding",
    price: "Rp 100.000",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1778410709/personal/web-porto/rike_t7xvt0.png",
    previewUrl: "https://calaraya.vercel.app/fajar-rike?id=nliBqA",
    features: [
      "RSVP",
      "Galeri",
      "Custom Music",
      "Calendar",
      "Google Maps",
      "Gift Info",
    ],
  },
  {
    name: "Monochrome",
    type: "Undangan Digital",
    category: "Wedding",
    price: "Rp 100.000",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1779555221/personal/web-porto/mono_lu00dd.png",
    previewUrl: "https://calaraya.vercel.app/arie-elfhira?id=xoswlp",
    features: [
      "RSVP",
      "Galeri",
      "Custom Music",
      "Calendar",
      "Google Maps",
      "Gift Info",
    ],
  },
  {
    name: "Stylish Bold",
    type: "Undangan Digital",
    category: "Wedding",
    price: "Rp 100.000",
    image:
      "https://res.cloudinary.com/dk16ng09n/image/upload/v1776399437/personal/web-porto/marooncustom_jxuweq.png",
    previewUrl: "https://calaraya.vercel.app/amry-erinka?id=QQty2V",
    features: [
      "RSVP",
      "Galeri",
      "Custom Music",
      "Calendar",
      "Google Maps",
      "Gift Info",
    ],
  },
];

const websiteServices = [
  {
    icon: PanelsTopLeft,
    title: "Landing Page",
    description: "Halaman khusus untuk mendukung promosi dan penjualan",
    features: [
      "Desain fokus konversi",
      "Performa cepat",
      "Optimal di perangkat mobile",
      "Statistik pengunjung",
    ],
    priceStart: "Rp 400rb",
    popular: false,
  },
  {
    icon: Building2,
    title: "Company Profile",
    description:
      "Website untuk membangun kepercayaan dan identitas bisnis online",
    features: [
      "Tampilan responsif",
      "Desain modern & profesional",
      "SEO Friendly",
      "Performa cepat",
      "CMS Admin Panel",
    ],
    priceStart: "Rp 500rb",
    popular: false,
  },
  {
    icon: ShoppingCart,
    title: "Toko Online",
    description:
      "Toko online untuk memperluas penjualan dan jangkauan pelanggan",
    features: [
      "Integrasi pembayaran",
      "Pengelolaan produk",
      "Pelacakan pesanan",
      "Multi pengguna/admin",
    ],
    priceStart: "Rp 1.5jt",
    popular: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Aplikasi mobile untuk mempermudah operasional dan layanan bisnis",
    features: [
      "Aplikasi Android & iOS",
      "Notifikasi aplikasi ",
      "Tampilan mudah digunakan ",
    ],
    priceStart: "Rp 2jt",
    popular: false,
  },
];

const features = [
  {
    title: "Proses Cepat",
    description:
      "Undangan digital jadi dalam 1 hari kerja. Website selesai dalam 1-3 minggu.",
    IconComponent: ZapIcon,
  },
  {
    title: "Desain Premium",
    description:
      "Desain elegan dan modern yang dibuat oleh desainer profesional.",
    IconComponent: Figma,
  },
  {
    title: "Revisi Fleksibel",
    description:
      "Fleksibel dalam revisi agar hasil akhir benar-benar sesuai harapan Anda.",
    IconComponent: SquarePen,
  },
  {
    title: "Harga Terjangkau",
    description: "Harga yang ramah di kantong dengan kualitas tetap terjaga.",
    IconComponent: Wallet,
  },
  {
    title: "Responsive Design",
    description: "Tampilan sempurna di semua device (HP, tablet, desktop).",
    IconComponent: MonitorSmartphone,
  },
  {
    title: "Custom Request",
    description: "Kami dapat menyesuaikan solusi sesuai dengan kebutuhan Anda.",
    IconComponent: Settings2,
  },
  {
    title: "After Sales Support",
    description: "Dukungan dan maintenance setelah proyek selesai.",
    IconComponent: Headset,
  },
  {
    title: "Fitur Lengkap",
    description: "Fitur fleksibel yang disesuaikan dengan kebutuhan proyek.",
    IconComponent: ListChecks,
  },
];

export {
  CONTACT_PERSON,
  contact,
  faqs,
  socialMedia,
  navLinks,
  portfolios,
  reviews,
  allThemes,
  features,
  websiteServices,
};
