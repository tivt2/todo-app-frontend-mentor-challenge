import { ThemeContext } from "@/contexts/ThemeProvider";
import { THEME_TYPE } from "@/types/types";
import Image from "next/image";
import { useContext } from "react";

const mobileImages = {
  light: "/images/bg-mobile-light.jpg",
  dark: "/images/bg-mobile-dark.jpg",
};

const desktopImage = {
  light: "/images/bg-desktop-light.jpg",
  dark: "/images/bg-desktop-dark.jpg",
};

export function BackgroundImage() {
  const { theme } = useContext(ThemeContext);

  return (
    <picture className=" -z-50 fixed top-0 w-full h-full">
      <source
        srcSet={
          theme === THEME_TYPE.DARK ? desktopImage.dark : desktopImage.light
        }
        media="(min-width: 768px)"
      />
      <Image
        src={theme === THEME_TYPE.DARK ? mobileImages.dark : mobileImages.light}
        alt="background image"
        quality={100}
        className=" object-top object-contain"
        sizes="100%"
        priority
        fill
      />
    </picture>
  );
}
