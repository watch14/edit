"use client";
import HeroSection from "../components/HeroSection";
import EditModeToggle from "../components/EditModeToggle";
import AutoSave from "../components/AutoSave";
import ClientOnly from "../components/ClientOnly";
import PersistenceDebug from "../components/PersistenceDebug";

export default function Home() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-gray-100" />}>
      <HeroSection />
      <EditModeToggle />
      <AutoSave />
      <PersistenceDebug />
    </ClientOnly>
  );
}
