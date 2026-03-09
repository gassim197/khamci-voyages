import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Lock, LogIn } from "lucide-react";
import { toast } from "sonner";

/**
 * AdminLogin - Page de connexion au dashboard admin
 * 
 * Authentification simple avec mot de passe
 */

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler un délai de vérification
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(password)) {
      toast.success("Connexion réussie !");
      setLocation("/admin/dashboard");
    } else {
      toast.error("Mot de passe incorrect");
      setPassword("");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">KHAMCI VOYAGES</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Mot de passe administrateur
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg text-white font-semibold py-3 flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? "Vérification..." : "Se Connecter"}
          </Button>
        </form>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">
            <strong>Mot de passe par défaut :</strong> khamci2024
          </p>
          <p className="text-xs text-gray-500 mt-2">
            ⚠️ À remplacer par un vrai système d'authentification en production
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
