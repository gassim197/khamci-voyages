import { createContext, useContext, useState, useEffect } from "react";

/**
 * AdminContext - Contexte pour gérer l'authentification admin
 * 
 * Stocke les informations de session admin en localStorage
 */

interface AdminContextType {
  isAuthenticated: boolean;
  adminName: string | null;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mot de passe admin simple (à remplacer par un vrai système d'authentification)
const ADMIN_PASSWORD = "khamci2024";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);

  // Vérifier la session au chargement
  useEffect(() => {
    const stored = localStorage.getItem("khamci-admin-session");
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (session.authenticated && session.timestamp > Date.now() - 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
          setAdminName(session.name);
        } else {
          localStorage.removeItem("khamci-admin-session");
        }
      } catch {
        localStorage.removeItem("khamci-admin-session");
      }
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const session = {
        authenticated: true,
        name: "Administrateur",
        timestamp: Date.now()
      };
      localStorage.setItem("khamci-admin-session", JSON.stringify(session));
      setIsAuthenticated(true);
      setAdminName("Administrateur");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("khamci-admin-session");
    setIsAuthenticated(false);
    setAdminName(null);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
