// ✅ Utility functions for API requests and data formatting

// 🛠️ API request utility
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("authToken");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    // 🚨 FIX: Removed extra slash after domain
    const response = await fetch(`https://scamt-backend-1.onrender.com${endpoint}`, defaultOptions);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    // ✅ Ensure backend actually sends JSON
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// 🗓️ Date formatting utility
export function formatDate(dateString) {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

// 🕓 DateTime formatting utility
export function formatDateTime(dateString) {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting datetime:", error);
    return dateString;
  }
}

// ⏳ Loading overlay
export function showLoading() {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading-overlay";
  loadingDiv.className = "loading-overlay";
  loadingDiv.innerHTML = `
      <div class="loading-spinner">
          <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
      </div>
  `;

  if (!document.getElementById("loading-styles")) {
    const style = document.createElement("style");
    style.id = "loading-styles";
    style.textContent = `
          .loading-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
          }
          .loading-spinner {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
      `;
    document.head.appendChild(style);
  }

  document.body.appendChild(loadingDiv);
}

export function hideLoading() {
  const loadingDiv = document.getElementById("loading-overlay");
  if (loadingDiv) loadingDiv.remove();
}

// ⚠️ Alert utility
export function showAlert(message, type = "info") {
  // Remove existing alerts
  document.querySelectorAll(".alert-overlay").forEach((a) => a.remove());

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert-overlay alert-${type}`;
  alertDiv.innerHTML = `
      <div class="alert-content">
          <span>${message}</span>
          <button class="alert-close">&times;</button>
      </div>
  `;

  if (!document.getElementById("alert-styles")) {
    const style = document.createElement("style");
    style.id = "alert-styles";
    style.textContent = `
          .alert-overlay {
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 10000;
              min-width: 300px;
              max-width: 500px;
          }
          .alert-content {
              padding: 1rem 1.5rem;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          .alert-info {
              background: #d1ecf1;
              color: #0c5460;
              border: 1px solid #bee5eb;
          }
          .alert-danger {
              background: #f8d7da;
              color: #721c24;
              border: 1px solid #f5c6cb;
          }
          .alert-success {
              background: #d4edda;
              color: #155724;
              border: 1px solid #c3e6cb;
          }
          .alert-close {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: inherit;
              margin-left: 1rem;
          }
      `;
    document.head.appendChild(style);
  }

  document.body.appendChild(alertDiv);

  setTimeout(() => alertDiv.remove(), 5000);

  alertDiv.querySelector(".alert-close").addEventListener("click", () => {
    alertDiv.remove();
  });
}

// 🌐 Service API functions

// Get all services
export async function getServices() {
  return await apiRequest("/api/services");
}

// Get single service by ID
export async function getService(id) {
  return await apiRequest(`/api/services/${id}`);
}

// Create new service
export async function createService(serviceData) {
  return await apiRequest("/api/services", {
    method: "POST",
    body: JSON.stringify(serviceData),
  });
}

// Update existing service
export async function updateService(id, serviceData) {
  return await apiRequest(`/api/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(serviceData),
  });
}

// Delete service
export async function deleteService(id) {
  return await apiRequest(`/api/services/${id}`, {
    method: "DELETE",
  });
}

// Patch service (partial update)
export async function patchService(id, serviceData) {
  return await apiRequest(`/api/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(serviceData),
  });
}
