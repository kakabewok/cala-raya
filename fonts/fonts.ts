import {
  Comic_Neue,
  Geist,
  Geist_Mono,
  GFS_Didot,
  Great_Vibes,
  Montserrat,
  Playfair_Display,
  Poppins,
  Raleway,
  Roboto,
  Spectral,
  Cedarville_Cursive,
} from "next/font/google";
import localFont from "next/font/local";

// default font for the app
export const comicSans = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-sans",
  display: "swap",
});

// default font for the app
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// default font for the app
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-spectral",
});

export const cursiveFont = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cursive",
});

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-playfair",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const didot = GFS_Didot({
  subsets: ["greek"],
  weight: ["400"],
  variable: "--font-didot",
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-raleway",
  display: "swap",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const optivaground = localFont({
  src: "../public/fonts/optivaground/optivaground-bold.otf",
  variable: "--font-optivaground",
  display: "swap",
});

export const remineFares = localFont({
  src: "../public/fonts/remine-fares/remine-fares.otf",
  variable: "--font-reminefares",
  display: "swap",
});

export const amalfiCoast = localFont({
  src: "../public/fonts/amalfi-coast/amalfi-coast.ttf",
  variable: "--font-amalfi-coast",
  display: "swap",
});

export const ninfa = localFont({
  src: [
    { path: "../public/fonts/ninfa/ninfa-semibold.otf", weight: "600" },
    { path: "../public/fonts/ninfa/ninfa-light.otf", weight: "300" },
    { path: "../public/fonts/ninfa/ninfa-regular.otf", weight: "400" },
    { path: "../public/fonts/ninfa/ninfa-bold.otf", weight: "700" },
  ],
  variable: "--font-ninfa",
  display: "swap",
});

export const nyghtSerif = localFont({
  src: [
    { path: "../public/fonts/nyght-serif/NyghtSerif-Bold.woff2" },
    { path: "../public/fonts/nyght-serif/NyghtSerif-Dark.woff2" },
    { path: "../public/fonts/nyght-serif/NyghtSerif-Light.woff2" },
    { path: "../public/fonts/nyght-serif/NyghtSerif-Medium.woff2" },
    { path: "../public/fonts/nyght-serif/NyghtSerif-Regular.woff2" },
  ],
  variable: "--font-nyght-serif",
  display: "swap",
});

export const theSecret = localFont({
  src: [
    { path: "../public/fonts/the-secret/TheSecret-Regular.otf" },
    { path: "../public/fonts/the-secret/TheSecret-Regular.ttf" },
    { path: "../public/fonts/the-secret/TheSecret-Regular.woff" },
  ],
  variable: "--font-the-secret",
  display: "swap",
});

export const commuters = localFont({
  src: [
    { path: "../public/fonts/commuters/commuters-bold.otf", weight: "700" },
    { path: "../public/fonts/commuters/commuters-italic.otf", weight: "400" },
    { path: "../public/fonts/commuters/commuters-light.otf", weight: "300" },
    { path: "../public/fonts/commuters/commuters-regular.otf", weight: "400" },
    { path: "../public/fonts/commuters/commuters-semibold.otf", weight: "600" },
    { path: "../public/fonts/commuters/commuters-thin.otf", weight: "200" },
  ],
  variable: "--font-commuters",
  display: "swap",
});

export const lagunac = localFont({
  src: [
    { path: "../public/fonts/lagunac/lagunac_bold.otf" },
    { path: "../public/fonts/lagunac/lagunac_italic.otf" },
    { path: "../public/fonts/lagunac/lagunac.otf" },
  ],
  variable: "--font-lagunac",
  display: "swap",
});

export const monthGlade = localFont({
  src: "../public/fonts/month-glade/MonthGlade.otf",
  variable: "--font-month-glade",
  display: "swap",
});

export const gandhiSerif = localFont({
  src: [
    { path: "../public/fonts/gandhi-serif/GandhiSerif-Bold.otf" },
    { path: "../public/fonts/gandhi-serif/GandhiSerif-BoldItalic.otf" },
    { path: "../public/fonts/gandhi-serif/GandhiSerif-Italic.otf" },
    { path: "../public/fonts/gandhi-serif/GandhiSerif-Regular.otf" },
  ],
  variable: "--font-gandhi-serif",
  display: "swap",
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
