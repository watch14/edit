import { create } from "zustand";

type HeroContent = {
  title: string;
  subtitle: string;
  button: {
    text: string;
    href: string;
    textColor: string;
    bgColor: string;
  };
  bgType: "color" | "image";
  bgColor: string;
  bgImage: string;
};

type NavbarContent = {
  logo: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string; textColor: string; bgColor: string };
};

type EditorState = {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  hero: HeroContent;
  setHero: (h: Partial<HeroContent>) => void;
  navbar: NavbarContent;
  setNavbar: (n: Partial<NavbarContent>) => void;
};

const defaultHero: HeroContent = {
  title: "More than a traditional\nsoftware agency",
  subtitle:
    "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
  button: {
    text: "Work with us",
    href: "#",
    textColor: "#000000",
    bgColor: "#ffffff",
  },
  bgType: "color",
  bgColor: "#636ede",
  bgImage: "",
};

const defaultNavbar: NavbarContent = {
  logo: "STAFF.",
  links: [
    { label: "Cases", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  cta: {
    label: "Work with us",
    href: "#",
    textColor: "#000000",
    bgColor: "#ffffff",
  },
};

export const useEditorStore = create<EditorState>((set) => ({
  editMode: false,
  setEditMode: (v) => set({ editMode: v }),
  hero: defaultHero,
  setHero: (h) => set((state) => ({ hero: { ...state.hero, ...h } })),
  navbar: defaultNavbar,
  setNavbar: (n) => set((state) => ({ navbar: { ...state.navbar, ...n } })),
}));
