"use client";
import React, { useRef } from "react";
import HeroEditor from "./HeroEditor";
import { useEditorStore } from "../store/editorStore";

export default function HeroSection() {
  const hero = useEditorStore((s) => s.hero);
  const editMode = useEditorStore((s) => s.editMode);
  const [editorOpen, setEditorOpen] = React.useState(false);
  return (
    <>
      <section
        className="min-h-[90vh] w-full flex flex-col justify-left px-0 py-16 transition-all"
        style={
          hero.bgType === "color"
            ? { background: hero.bgColor }
            : hero.bgImage
            ? {
                backgroundImage: `url(${hero.bgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : { background: hero.bgColor }
        }
      >
        <div className="max-w-[1440px] mx-auto mt-auto flex flex-col justify-left h-full px-8">
          <h1
            className="text-black text-[4vw] font-bold leading-tight mb-4 cursor-pointer relative"
            style={{
              color: hero.button.textColor,
              outline: editMode ? "1px dashed #2563eb" : undefined,
            }}
            onClick={() => editMode && setEditorOpen(true)}
            tabIndex={editMode ? 0 : -1}
          >
            {hero.title}
            {editMode && (
              <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                ✎
              </span>
            )}
          </h1>
          <p
            className="text-black text-lg max-w-3xl mb-4 cursor-pointer relative"
            style={{ outline: editMode ? "1px dashed #2563eb" : undefined }}
            onClick={() => editMode && setEditorOpen(true)}
            tabIndex={editMode ? 0 : -1}
          >
            {hero.subtitle}
            {editMode && (
              <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                ✎
              </span>
            )}
          </p>
          <button
            className="rounded-full px-6 py-2 text-sm font-medium shadow transition w-fit cursor-pointer relative"
            style={{
              color: hero.button.textColor,
              background: hero.button.bgColor,
              outline: editMode ? "1px dashed #2563eb" : undefined,
            }}
            onClick={(e) => {
              if (editMode) {
                e.preventDefault();
                setEditorOpen(true);
              }
            }}
            tabIndex={editMode ? 0 : -1}
          >
            {hero.button.text}
            {editMode && (
              <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                ✎
              </span>
            )}
          </button>
        </div>
      </section>
      <HeroEditor open={editorOpen} onClose={() => setEditorOpen(false)} />
    </>
  );
}
