"use client";

import { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import apiClient from "../lib/api";

interface SavedConfiguration {
  id: string;
  name: string;
  lastModified: string;
  hero: {
    title: string;
    subtitle: string;
  };
  navbar: {
    logo: string;
  };
}

interface SaveLoadManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SaveLoadManager({ isOpen, onClose }: SaveLoadManagerProps) {
  const [savedConfigs, setSavedConfigs] = useState<SavedConfiguration[]>([]);
  const [saveName, setSaveName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const { hero, navbar, setHero, setNavbar } = useEditorStore();

  useEffect(() => {
    if (isOpen) {
      setMessage("");
      loadConfigurations();
    }
  }, [isOpen]);

  const loadConfigurations = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getAllConfigurations();
      setSavedConfigs(response.configurations || []);
    } catch (error) {
      console.error("Failed to load configurations:", error);
      setMessage("Failed to load configurations");
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfiguration = async () => {
    if (!saveName.trim()) {
      setMessage("Please enter a name for this configuration");
      return;
    }

    try {
      setIsLoading(true);
      const configData = {
        name: saveName,
        hero,
        navbar,
      };

      const configId = saveName.toLowerCase().replace(/\s+/g, '-');
      await apiClient.saveNamedConfiguration(configId, configData);
      
      setMessage("Configuration saved successfully!");
      setSaveName("");
      await loadConfigurations();
    } catch (error) {
      console.error("Failed to save configuration:", error);
      setMessage("Failed to save configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const loadConfiguration = async (config: SavedConfiguration) => {
    try {
      setIsLoading(true);
      const response = await apiClient.getConfiguration(config.id);
      
      if (response.configuration) {
        setHero(response.configuration.hero);
        setNavbar(response.configuration.navbar);
        setMessage(`Loaded "${config.name}" successfully!`);
        onClose();
      }
    } catch (error) {
      console.error("Failed to load configuration:", error);
      setMessage("Failed to load configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConfiguration = async (config: SavedConfiguration) => {
    if (!confirm(`Are you sure you want to delete "${config.name}"?`)) {
      return;
    }

    try {
      setIsLoading(true);
      await apiClient.deleteConfiguration(config.id);
      setMessage(`Deleted "${config.name}" successfully!`);
      await loadConfigurations();
    } catch (error) {
      console.error("Failed to delete configuration:", error);
      setMessage("Failed to delete configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setMessage("");
    loadConfigurations();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Save / Load Configurations</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded mb-4 ${
            message.includes('Failed') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Save Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">Save Current Configuration</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter configuration name..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isLoading}
            />
            <button
              onClick={saveConfiguration}
              disabled={isLoading || !saveName.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Load Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">Saved Configurations</h3>
          
          {isLoading && savedConfigs.length === 0 ? (
            <div className="text-center py-4 text-black">Loading...</div>
          ) : savedConfigs.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No saved configurations found
            </div>
          ) : (
            <div className="space-y-2">
              {savedConfigs.map((config) => (
                <div
                  key={config.id}
                  className="border border-gray-200 rounded p-3 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-black">{config.name}</h4>
                      <p className="text-sm text-gray-600">
                        Hero: {config.hero.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Logo: {config.navbar.logo}
                      </p>
                      <p className="text-xs text-gray-400">
                        Modified: {new Date(config.lastModified).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => loadConfiguration(config)}
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteConfiguration(config)}
                        disabled={isLoading}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
