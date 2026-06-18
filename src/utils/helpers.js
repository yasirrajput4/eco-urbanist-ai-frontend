/**
 * Helper utility functions
 */

/**
 * Format file size to human-readable format
 * 🔧 FIXED: Removed 'export' keyword as it's only used internally here
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {object} Validation result
 */
export const validateImageFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10 MB
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload PNG or JPEG images.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${formatFileSize(maxSize)}.`,
    };
  }

  return { valid: true };
};

/**
 * Convert image file to base64 data URL for preview
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64 data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
