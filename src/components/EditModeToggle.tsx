"use client";
import { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import SaveLoadManager from "./SaveLoadManager";

export default function EditModeToggle() {
  const editMode = useEditorStore((s) => s.editMode);
  const setEditMode = useEditorStore((s) => s.setEditMode);
  const [showSaveLoad, setShowSaveLoad] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        {editMode && (
          <button
            onClick={() => setShowSaveLoad(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm transition hover:bg-green-700"
          >
            Save / Load
          </button>
        )}
        <button
          className={`px-4 py-2 rounded-full shadow-lg font-bold text-sm transition border ${
            editMode ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
          onClick={() => setEditMode(!editMode)}
          aria-pressed={editMode}
        >
          {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </button>
      </div>

      <SaveLoadManager
        isOpen={showSaveLoad}
        onClose={() => setShowSaveLoad(false)}
      />
    </>
  );
}
