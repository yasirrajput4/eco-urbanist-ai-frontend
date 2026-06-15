/**
 * API Service for Eco-Urbanist AI
 * Handles all communication with the backend
 */

import axios from "axios";

// Base URL for API - auto-detect production vs development
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : typeof window !== "undefined"
      ? window.location.origin
      : "");

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for regular requests
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * API Service Object
 */
const api = {
  /**
   * Get API health status
   */
  getHealth: async () => {
    try {
      const response = await apiClient.get("/api/health");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Health check failed:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get service information
   */
  getServiceInfo: async () => {
    try {
      const response = await apiClient.get("/api/service-info");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Failed to get service info:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Calculate green score for an image
   * @param {File} imageFile - Image file to analyze
   */
  calculateGreenScore: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await apiClient.post("/api/green-score", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Green score calculation failed:", error);
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
      };
    }
  },

  /**
   * Generate AI prediction (main feature)
   * @param {File} imageFile - Building mask image
   */
  generatePrediction: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await apiClient.post("/api/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000, // 5 minutes (300 seconds) for AI processing on slow servers
      });

      // Response is now JSON with filename and scores
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Prediction failed:", error);

      // Better error handling
      let errorMessage = "Prediction failed";

      if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timeout. The server is taking too long to respond. Please try again.";
      } else if (error.response) {
        // Server responded with error
        errorMessage =
          error.response?.data?.detail ||
          error.response?.statusText ||
          errorMessage;
      } else if (error.request) {
        // Request made but no response
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * List all generated output images
   */
  listOutputs: async () => {
    try {
      const response = await apiClient.get("/api/list-outputs");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Failed to list outputs:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get download URL for a generated image
   * @param {string} filename - Name of the generated image
   */
  getDownloadUrl: (filename) => {
    // Auto-detect the correct base URL
    const baseUrl =
      import.meta.env.VITE_API_URL ||
      (typeof window !== "undefined" && window.location.hostname === "localhost"
        ? "http://localhost:8000"
        : typeof window !== "undefined"
          ? window.location.origin
          : "");

    return `${baseUrl}/api/download/${filename}`;
  },

  /**
   * Download image file
   * @param {string} filename - Name of the image to download
   */
  downloadImage: async (filename) => {
    try {
      const url = api.getDownloadUrl(filename);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    } catch (error) {
      console.error("Download failed:", error);
      return { success: false, error: error.message };
    }
  },
};

export default api;
