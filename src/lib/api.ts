import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "@/types";

/**
 * API client configuration
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

/**
 * Create axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor to add authentication token
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Generic API request function
 */
export async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error: any) {
    console.error("API request failed:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Request failed",
    };
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: "GET", url });
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: "POST", url, data });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: "PUT", url, data });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: "DELETE", url });
}

/**
 * PATCH request helper
 */
export async function apiPatch<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiRequest<T>({ ...config, method: "PATCH", url, data });
}

/**
 * Upload file helper
 */
export async function apiUpload<T>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("File upload failed:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Upload failed",
    };
  }
}

/**
 * Download file helper
 */
export async function apiDownload(
  url: string,
  filename?: string
): Promise<void> {
  try {
    const response = await apiClient.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("File download failed:", error);
    throw error;
  }
}

export default apiClient;
