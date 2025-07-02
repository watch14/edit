"use client";
import React, { useState, useRef } from "react";
import { useEditorStore } from "../store/editorStore";
import ColorPicker from "./ColorPicker";
import AppModal from "./AppModal";
import ImageUploader from "./ImageUploader";

export default function HeroEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const hero = useEditorStore((s) => s.hero);
  const setHero = useEditorStore((s) => s.setHero);
  const [draft, setDraft] = useState(hero);
  const fileInput = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setDraft(hero);
  }, [open]);

  const handleBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDraft({
          ...draft,
          bgImage: ev.target?.result as string,
          bgType: "image",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setDraft({
      ...draft,
      bgImage: imageUrl,
      bgType: imageUrl ? "image" : "color",
    });
  };

  return (
    <AppModal open={open} onClose={onClose} title="Edit Hero Section">
      <div className="mb-4">
        <label className="block text-xs mb-1">Title</label>
        <textarea
          className="border px-2 py-1 rounded w-full mb-2 text-black bg-white"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          rows={2}
        />
        <label className="block text-xs mb-1">Subtitle</label>
        <textarea
          className="border px-2 py-1 rounded w-full mb-2 text-black bg-white"
          value={draft.subtitle}
          onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
          rows={2}
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs mb-1">Button Text</label>
        <input
          className="border px-2 py-1 rounded w-full mb-1 text-black bg-white"
          value={draft.button.text}
          onChange={(e) =>
            setDraft({
              ...draft,
              button: { ...draft.button, text: e.target.value },
            })
          }
        />
        <label className="block text-xs mb-1">Button Link</label>
        <input
          className="border px-2 py-1 rounded w-full mb-1 text-black bg-white"
          value={draft.button.href}
          onChange={(e) =>
            setDraft({
              ...draft,
              button: { ...draft.button, href: e.target.value },
            })
          }
        />
        <div className="flex gap-2 items-center mb-2">
          <ColorPicker
            color={draft.button.textColor}
            onChange={(c) =>
              setDraft({ ...draft, button: { ...draft.button, textColor: c } })
            }
            label="Text"
          />
          <ColorPicker
            color={draft.button.bgColor}
            onChange={(c) =>
              setDraft({ ...draft, button: { ...draft.button, bgColor: c } })
            }
            label="BG"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs mb-1">Background</label>
        <div className="flex gap-2 items-center mb-2">
          <ColorPicker
            color={draft.bgColor}
            onChange={(c) =>
              setDraft({ ...draft, bgColor: c, bgType: "color" })
            }
            label="Color"
          />
        </div>
        <div className="mt-2">
          <label className="block text-xs mb-1">Background Image</label>
          <ImageUploader
            onImageSelect={handleImageSelect}
            currentImage={draft.bgType === "image" ? draft.bgImage : undefined}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Or paste image URL"
            className="border px-2 py-1 rounded text-xs w-full"
            value={draft.bgType === "image" ? draft.bgImage : ""}
            onChange={(e) =>
              setDraft({ ...draft, bgImage: e.target.value, bgType: "image" })
            }
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold w-full"
          onClick={() => {
            setHero(draft);
            console.log("[SAVE HERO]", draft);
            onClose();
          }}
        >
          Save
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </AppModal>
  );
}
