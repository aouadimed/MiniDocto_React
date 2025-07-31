import { API_BASE_URL } from '../constants/app';

interface TokenData {
  accessToken: string;
  refreshToken: string;
  role: string;
  email: string;
}

class TokenManager {
  private static accessToken: string | null = null;
  private static refreshToken: string | null = null;
  private static role: string | null = null;
  private static userEmail: string | null = null;
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
    this.role = localStorage.getItem('user_role');
    this.userEmail = localStorage.getItem('user_email');
    
    this.isInitialized = true;
  }

  // Save tokens after login/signup
  static async saveTokens(tokenData: TokenData): Promise<void> {
    const { accessToken, refreshToken, role, email } = tokenData;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.role = role;
    this.userEmail = email;

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user_role', role);
    localStorage.setItem('user_email', email);
  }

  static async logout(): Promise<void> {
    // Call logout API first (if we have tokens)
    if (this.refreshToken && this.userEmail) {
      try {
        await fetch(`${API_BASE_URL}auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.userEmail,
            refreshToken: this.refreshToken,
          }),
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }

    // Clear all stored data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');

    this.accessToken = null;
    this.refreshToken = null;
    this.role = null;
    this.userEmail = null;

    // Redirect to login page
    window.location.href = '/login';
  }

  static async getValidAccessToken(): Promise<string | null> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.accessToken) {
      return null;
    }

    if (!this.isTokenExpired(this.accessToken)) {
      return this.accessToken;
    }

    return await this.refreshAccessToken();
  }

  // Refresh access token using refresh token
  static async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshToken) {
      await this.logout();
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();

        const newAccessToken = data.token || data.accessToken;
        const newRefreshToken = data.refreshToken || this.refreshToken;
        const userRole = data.role || this.role;
        const userEmail = data.email || this.userEmail;

        if (newAccessToken && newRefreshToken && userRole && userEmail) {
          await this.saveTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            role: userRole,
            email: userEmail,
          });
          return this.accessToken;
        }
      }

      // If refresh fails, logout user
      await this.logout();
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.logout();
      return null;
    }
  }

  // Check if a token is expired
  static isTokenExpired(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return true;
      }

      // Decode the payload
      const payload = JSON.parse(
        atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
      );

      const exp = payload.exp;
      if (!exp) {
        return true;
      }

      const expiryDate = new Date(exp * 1000);
      const now = new Date();
      const isExpired = expiryDate <= now;

      return isExpired;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }

  // Getters
  static get userRole(): string | null {
    return this.role;
  }

  static get email(): string | null {
    return this.userEmail;
  }

  static get currentRefreshToken(): string | null {
    return this.refreshToken;
  }

  static get currentAccessToken(): string | null {
    return this.accessToken;
  }

  static get isLoggedIn(): boolean {
    if (!this.isInitialized) {
      // Synchronously check localStorage for quick initialization
      const refreshToken = localStorage.getItem('refresh_token');
      return refreshToken ? !this.isTokenExpired(refreshToken) : false;
    }
    return this.refreshToken ? !this.isTokenExpired(this.refreshToken) : false;
  }

  static async forceRefresh(): Promise<string | null> {
    return await this.refreshAccessToken();
  }

  // Helper method to clear tokens without API call (for emergency logout)
  static clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');

    this.accessToken = null;
    this.refreshToken = null;
    this.role = null;
    this.userEmail = null;
  }

  // Check if user has specific role
  static hasRole(requiredRole: string): boolean {
    return this.role === requiredRole;
  }

  // Get user info
  static getUserInfo(): { email: string | null; role: string | null } {
    return {
      email: this.userEmail,
      role: this.role,
    };
  }
}

export default TokenManager;
