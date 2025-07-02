"use client";
import { useEditorStore } from "../store/editorStore";

export default function EditModeToggle() {
  const editMode = useEditorStore((s) => s.editMode);
  const setEditMode = useEditorStore((s) => s.setEditMode);
  return (
    <button
      className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg font-bold text-sm transition border ${
        editMode ? "bg-blue-600 text-white" : "bg-white text-blue-600"
      }`}
      onClick={() => setEditMode(!editMode)}
      aria-pressed={editMode}
    >
      {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
    </button>
  );
}
