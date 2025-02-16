import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
      return decoded.exp ? decoded.exp * 1000 < Date.now() : true;
    } catch (error) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem("kanban_token") || "";
  }

  login(idToken: string) {
    localStorage.setItem("kanban_token", idToken);
    window.location.href = "/";
  }

  logout() {
    localStorage.removeItem("kanban_token");
    window.location.href = "/login";
  }
}

export default new AuthService();
