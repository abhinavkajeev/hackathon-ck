// apiService.js
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  // Set auth token
  setAuthToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get auth headers
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` })
    };
  }

  // Generic fetch method
  async fetchWithAuth(url, options = {}) {
    const config = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${url}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Something went wrong');
    }

    return response.json();
  }

  // Auth methods
  async register(userData) {
    const response = await this.fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setAuthToken(response.token);
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setAuthToken(response.token);
    }
    
    return response;
  }

  async getProfile() {
    return this.fetchWithAuth('/auth/profile');
  }

  async updateProfile(userData) {
    return this.fetchWithAuth('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Interview methods
  async saveInterviewResult(result) {
    return this.fetchWithAuth('/interviews/save', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  }

  async getInterviewHistory() {
    return this.fetchWithAuth('/interviews/history');
  }

  // Logout
  logout() {
    this.setAuthToken(null);
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }
}

export default new ApiService();