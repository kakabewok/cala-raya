import FloralPage from "@/themes/floral/FloralPage";
import MagazinePage from "@/themes/magazine/MagazinePage";
import MaroonPageCustom from "@/themes/maroon_custom/MaroonPageCustom";
import MaroonPage from "@/themes/maroon/MaroonPage";
import MonochromePage from "@/themes/monochrome/MonochromePage";
import NetflixPage from "@/themes/netflix/NetflixPage";
import StylishBoldPage from "@/themes/stylishBold/StylishBoldPage";
import { ThemeName } from "@/types/theme-name";
import MaroonMonochromePage from "@/themes/maroon_monochrome/MaroonMonochromePage";
import MagazinePageCustom from "@/themes/magazine_custom/MagazinePageCustom";
import StylishBoldPageCustom from "@/themes/stylishBold_custom/StylishBoldPageCustom";
import MaroonPageCustom2 from "@/themes/maroon custom_2/MaroonPageCustom2";
import MaroonPageCustom3 from "@/themes/maroon custom_3/MaroonPageCustom3";

export const themeMap: Record<ThemeName, React.ComponentType> = {
  monochrome: MonochromePage,
  netflix: NetflixPage,
  floral: FloralPage,
  magazine: MagazinePage,
  magazine_custom: MagazinePageCustom,
  maroon: MaroonPage,
  maroon_custom: MaroonPageCustom,
  maroon_monochrome: MaroonMonochromePage,
  stylishBold: StylishBoldPage,
  stylishBold_custom: StylishBoldPageCustom,
  maroon_custom_2: MaroonPageCustom2,
  maroon_custom_3: MaroonPageCustom3,
};
