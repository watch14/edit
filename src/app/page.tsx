"use client";
import HeroSection from "../components/HeroSection";
import EditModeToggle from "../components/EditModeToggle";
import SaveLoadManager from "../components/SaveLoadManager";
import AutoSave from "../components/AutoSave";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EditModeToggle />
      <SaveLoadManager />
      <AutoSave />
    </>
  );
}
