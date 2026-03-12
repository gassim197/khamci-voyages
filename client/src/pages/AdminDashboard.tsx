import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useLocation } from "wouter";
import { Testimonial } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { LogOut, Check, X, Trash2, Eye, EyeOff, BarChart3 } from "lucide-react";
import { toast } from "sonner";

/**
 * AdminDashboard - Tableau de bord d'administration
 * 
 * Gestion des témoignages : approuver, rejeter, supprimer
 */

interface ManagedTestimonial extends Testimonial {
  status: "pending" | "approved" | "rejected";
}

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdmin();
  const [, setLocation] = useLocation();
  const [testimonials, setTestimonials] = useState<ManagedTestimonial[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Rediriger si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, setLocation]);

  // Charger les témoignages
  useEffect(() => {
    const stored = localStorage.getItem("khamci-testimonials");
    const approved = localStorage.getItem("khamci-testimonials-approved");
    const rejected = localStorage.getItem("khamci-testimonials-rejected");

    const pending: ManagedTestimonial[] = stored
      ? JSON.parse(stored).map((t: Testimonial) => ({ ...t, status: "pending" as const }))
      : [];

    const approvedList: ManagedTestimonial[] = approved
      ? JSON.parse(approved).map((t: Testimonial) => ({ ...t, status: "approved" as const }))
      : [];

    const rejectedList: ManagedTestimonial[] = rejected
      ? JSON.parse(rejected).map((t: Testimonial) => ({ ...t, status: "rejected" as const }))
      : [];

    setTestimonials([...pending, ...approvedList, ...rejectedList]);
  }, []);

  const handleApprove = (id: string) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (!testimonial) return;

    // Déplacer de pending à approved
    const updated = testimonials.filter(t => t.id !== id);
    const approved = { ...testimonial, status: "approved" as const };
    setTestimonials([...updated, approved]);

    // Mettre à jour localStorage
    const stored = localStorage.getItem("khamci-testimonials") || "[]";
    const pending = JSON.parse(stored).filter((t: Testimonial) => t.id !== id);
    localStorage.setItem("khamci-testimonials", JSON.stringify(pending));

    const approvedList = JSON.parse(localStorage.getItem("khamci-testimonials-approved") || "[]");
    approvedList.push(testimonial);
    localStorage.setItem("khamci-testimonials-approved", JSON.stringify(approvedList));

    toast.success("Témoignage approuvé !");
    setSelectedId(null);
  };

  const handleReject = (id: string) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (!testimonial) return;

    const updated = testimonials.filter(t => t.id !== id);
    const rejected = { ...testimonial, status: "rejected" as const };
    setTestimonials([...updated, rejected]);

    const stored = localStorage.getItem("khamci-testimonials") || "[]";
    const pending = JSON.parse(stored).filter((t: Testimonial) => t.id !== id);
    localStorage.setItem("khamci-testimonials", JSON.stringify(pending));

    const rejectedList = JSON.parse(localStorage.getItem("khamci-testimonials-rejected") || "[]");
    rejectedList.push(testimonial);
    localStorage.setItem("khamci-testimonials-rejected", JSON.stringify(rejectedList));

    toast.success("Témoignage rejeté");
    setSelectedId(null);
  };

  const handleDelete = (id: string) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (!testimonial) return;

    setTestimonials(testimonials.filter(t => t.id !== id));

    if (testimonial.status === "pending") {
      const stored = localStorage.getItem("khamci-testimonials") || "[]";
      const pending = JSON.parse(stored).filter((t: Testimonial) => t.id !== id);
      localStorage.setItem("khamci-testimonials", JSON.stringify(pending));
    } else if (testimonial.status === "approved") {
      const approvedList = JSON.parse(localStorage.getItem("khamci-testimonials-approved") || "[]");
      const filtered = approvedList.filter((t: Testimonial) => t.id !== id);
      localStorage.setItem("khamci-testimonials-approved", JSON.stringify(filtered));
    } else {
      const rejectedList = JSON.parse(localStorage.getItem("khamci-testimonials-rejected") || "[]");
      const filtered = rejectedList.filter((t: Testimonial) => t.id !== id);
      localStorage.setItem("khamci-testimonials-rejected", JSON.stringify(filtered));
    }

    toast.success("Témoignage supprimé");
    setSelectedId(null);
  };

  const filtered = testimonials.filter(t => filter === "all" || t.status === filter);
  const stats = {
    pending: testimonials.filter(t => t.status === "pending").length,
    approved: testimonials.filter(t => t.status === "approved").length,
    rejected: testimonials.filter(t => t.status === "rejected").length,
    total: testimonials.length
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Gestion des témoignages clients</p>
          </div>
          <Button
            onClick={() => {
              logout();
              setLocation("/");
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total", value: stats.total, color: "blue" },
            { label: "En attente", value: stats.pending, color: "yellow" },
            { label: "Approuvés", value: stats.approved, color: "green" },
            { label: "Rejetés", value: stats.rejected, color: "red" }
          ].map(stat => (
            <div key={stat.label} className={`bg-${stat.color}-50 border-2 border-${stat.color}-200 rounded-lg p-6`}>
              <p className={`text-${stat.color}-600 text-sm font-semibold`}>{stat.label}</p>
              <p className={`text-${stat.color}-900 text-3xl font-bold mt-2`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "pending", "approved", "rejected"] as const).map(f => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className={filter === f ? "bg-blue-600" : ""}
            >
              {f === "all" ? "Tous" : f === "pending" ? "En attente" : f === "approved" ? "Approuvés" : "Rejetés"}
            </Button>
          ))}
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <EyeOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Aucun témoignage à afficher</p>
            </div>
          ) : (
            filtered.map(testimonial => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-lg p-6 border-l-4 ${
                  testimonial.status === "pending"
                    ? "border-yellow-500"
                    : testimonial.status === "approved"
                    ? "border-green-500"
                    : "border-red-500"
                } cursor-pointer hover:shadow-lg transition-shadow`}
                onClick={() => setSelectedId(selectedId === testimonial.id ? null : testimonial.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        testimonial.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : testimonial.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {testimonial.status === "pending" ? "En attente" : testimonial.status === "approved" ? "Approuvé" : "Rejeté"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.title} • {testimonial.location}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">⭐ {testimonial.rating}/5</p>
                  </div>
                  <Eye className="w-5 h-5 text-gray-400" />
                </div>

                {selectedId === testimonial.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.comment}"</p>

                    {testimonial.status === "pending" && (
                      <div className="flex gap-3">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(testimonial.id);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Approuver
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(testimonial.id);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Rejeter
                        </Button>
                      </div>
                    )}

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(testimonial.id);
                      }}
                      variant="outline"
                      className="w-full mt-3 text-red-600 border-red-300 hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
