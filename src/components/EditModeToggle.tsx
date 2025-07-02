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
      <div className="fixed bottom-4 right-4 z-50 flex flex-col sm:flex-row gap-2">
        {editMode && (
          <button
            onClick={() => setShowSaveLoad(true)}
            className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg font-medium text-xs sm:text-sm transition hover:bg-green-700 order-2 sm:order-1"
          >
            <span className="hidden sm:inline">Save / Load</span>
            <span className="sm:hidden">💾</span>
          </button>
        )}
        <button
          className={`px-3 sm:px-4 py-2 rounded-full shadow-lg font-medium text-xs sm:text-sm transition border order-1 sm:order-2 ${
            editMode ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
          onClick={() => setEditMode(!editMode)}
          aria-pressed={editMode}
        >
          <span className="hidden sm:inline">
            {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
          </span>
          <span className="sm:hidden">{editMode ? "✕" : "✎"}</span>
        </button>
      </div>

      <SaveLoadManager
        isOpen={showSaveLoad}
        onClose={() => setShowSaveLoad(false)}
      />
    </>
  );
}
