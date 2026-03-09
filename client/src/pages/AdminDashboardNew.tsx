import { useState, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { adminTrpc } from "@/lib/adminTrpc";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LogOut, RefreshCw, Search, Trash2, CheckCircle, XCircle,
  Clock, MessageSquare, FileText, ChevronDown, ChevronUp,
  MapPin, Phone, Mail, Plane, Star, Users, TrendingUp,
  StickyNote, AlertCircle,
} from "lucide-react";
import AdminStatsSection from "@/components/AdminStatsSection";

// ─── COULEURS KHAMCI VOYAGES ────────────────────────────────────────────────
// Bleu marine : #0D1B3E  |  Orange : #FF6B35  |  Orange clair : #FF8C5A

// ─── TYPES ──────────────────────────────────────────────────────────────────
type QuoteStatus = "pending" | "in_progress" | "completed" | "rejected";
type TestimonialStatus = "pending" | "approved" | "rejected";

const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  pending: "En attente",
  in_progress: "En cours",
  completed: "Complété",
  rejected: "Rejeté",
};

const QUOTE_STATUS_STYLES: Record<QuoteStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  in_progress: "bg-blue-50 text-blue-700 border border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  rejected: "bg-red-50 text-red-600 border border-red-200",
};

const TESTIMONIAL_STATUS_STYLES: Record<TestimonialStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  rejected: "bg-red-50 text-red-600 border border-red-200",
};

const TESTIMONIAL_STATUS_LABELS: Record<TestimonialStatus, string> = {
  pending: "En attente",
  approved: "Approuvé",
  rejected: "Rejeté",
};

const SERVICE_LABELS: Record<string, string> = {
  vol: "Billet d'Avion",
  hotel: "Hôtel",
  visa: "Visa",
  circuit: "Circuit",
  custom: "Personnalisé",
  team_building: "Team Building",
};

// ─── PAGE DE CONNEXION ───────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const loginMutation = trpc.auth.adminLogin.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("khamci-admin-token", data.token);
      localStorage.setItem("khamci-admin-expiry", String(Date.now() + 24 * 60 * 60 * 1000));
      onLogin(data.token);
      toast.success("Connexion réussie !");
    },
    onError: () => toast.error("Mot de passe incorrect"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0D1B3E" }}>
      {/* Motif de fond subtil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-5" style={{ background: "#FF6B35" }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-5" style={{ background: "#FF6B35" }} />
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-lg"
               style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}>
            <Plane className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">KHAMCI VOYAGES</h1>
          <p className="text-blue-300 mt-1 text-sm">Espace Administrateur</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold mb-1" style={{ color: "#0D1B3E" }}>Connexion</h2>
          <p className="text-gray-500 text-sm mb-6">Accédez à votre tableau de bord</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mot de passe administrateur
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loginMutation.mutate({ password })}
                className="h-11 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <Button
              className="w-full h-11 text-white font-semibold rounded-lg transition-all"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}
              onClick={() => loginMutation.mutate({ password })}
              disabled={loginMutation.isPending || !password}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Connexion...</span>
              ) : (
                <span className="flex items-center gap-2"><LogOut className="w-4 h-4 rotate-180" /> Se connecter</span>
              )}
            </Button>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-xs text-amber-700">
              <strong>Mot de passe par défaut :</strong> khamci2024 — À modifier en production
            </p>
          </div>

          <a href="/" className="block text-center text-sm text-gray-400 hover:text-orange-500 transition-colors mt-4">
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── CARTES STATISTIQUES ─────────────────────────────────────────────────────
function StatsCards({ quotes, testimonials }: { quotes: any[]; testimonials: any[] }) {
  const stats = [
    {
      label: "Total Devis",
      value: quotes.length,
      icon: FileText,
      color: "#0D1B3E",
      bg: "#EEF2FF",
      border: "#C7D2FE",
    },
    {
      label: "En attente",
      value: quotes.filter(q => q.status === "pending").length,
      icon: Clock,
      color: "#B45309",
      bg: "#FFFBEB",
      border: "#FDE68A",
    },
    {
      label: "Complétés",
      value: quotes.filter(q => q.status === "completed").length,
      icon: CheckCircle,
      color: "#065F46",
      bg: "#ECFDF5",
      border: "#A7F3D0",
    },
    {
      label: "Témoignages en attente",
      value: testimonials.filter(t => t.status === "pending").length,
      icon: MessageSquare,
      color: "#FF6B35",
      bg: "#FFF7ED",
      border: "#FED7AA",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="rounded-xl p-5 flex items-center gap-4 shadow-sm border"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <div className="rounded-xl p-3 flex-shrink-0" style={{ background: s.color + "20" }}>
              <Icon className="w-6 h-6" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-medium text-gray-500 leading-tight">{s.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CARTE DEVIS ─────────────────────────────────────────────────────────────
function QuoteCard({ quote, onRefresh }: { quote: any; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [notes, setNotes] = useState(quote.adminNotes || "");

  const updateMutation = adminTrpc.quotes.updateStatus.useMutation({
    onSuccess: () => { toast.success("Statut mis à jour !"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const deleteMutation = adminTrpc.quotes.delete.useMutation({
    onSuccess: () => { toast.success("Devis supprimé"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const handleSaveNotes = () => {
    updateMutation.mutate({ id: quote.id, status: quote.status, adminNotes: notes });
    setShowNotesDialog(false);
  };

  const statusStyle = QUOTE_STATUS_STYLES[quote.status as QuoteStatus] || "";
  const statusLabel = QUOTE_STATUS_LABELS[quote.status as QuoteStatus] || quote.status;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-3 overflow-hidden hover:shadow-md transition-shadow">
      {/* Barre de couleur selon statut */}
      <div className="h-1 w-full" style={{
        background: quote.status === "pending" ? "#F59E0B"
          : quote.status === "in_progress" ? "#3B82F6"
          : quote.status === "completed" ? "#10B981"
          : "#EF4444"
      }} />

      <div className="p-4">
        {/* En-tête */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-bold text-gray-900">{quote.clientName}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusStyle}`}>
                {statusLabel}
              </span>
              {quote.serviceType && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                  {SERVICE_LABELS[quote.serviceType] || quote.serviceType}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-orange-400" />{quote.clientEmail}</span>
              {quote.clientPhone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-orange-400" />{quote.clientPhone}</span>}
              {quote.destination && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-orange-400" />{quote.destination}</span>}
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400" />{new Date(quote.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Détails expandés */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            {/* Infos voyage */}
            {(quote.departureDate || quote.returnDate || quote.passengers) && (
              <div className="grid grid-cols-3 gap-3">
                {quote.departureDate && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">Départ</p>
                    <p className="text-sm font-semibold text-gray-700">{quote.departureDate}</p>
                  </div>
                )}
                {quote.returnDate && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">Retour</p>
                    <p className="text-sm font-semibold text-gray-700">{quote.returnDate}</p>
                  </div>
                )}
                {quote.passengers && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">Passagers</p>
                    <p className="text-sm font-semibold text-gray-700">{quote.passengers}</p>
                  </div>
                )}
              </div>
            )}

            {/* Message client */}
            {quote.message && (
              <div className="rounded-lg p-3 text-sm" style={{ background: "#FFF7ED", borderLeft: "3px solid #FF6B35" }}>
                <p className="font-semibold mb-1" style={{ color: "#FF6B35" }}>Message du client</p>
                <p className="text-gray-700">{quote.message}</p>
              </div>
            )}

            {/* Notes admin */}
            {quote.adminNotes && (
              <div className="rounded-lg p-3 text-sm bg-blue-50" style={{ borderLeft: "3px solid #3B82F6" }}>
                <p className="font-semibold text-blue-700 mb-1">Notes internes</p>
                <p className="text-gray-700">{quote.adminNotes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-1">
              <Select
                value={quote.status}
                onValueChange={(v) => updateMutation.mutate({ id: quote.id, status: v as QuoteStatus, adminNotes: notes })}
              >
                <SelectTrigger className="h-8 w-44 text-xs border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">⏳ En attente</SelectItem>
                  <SelectItem value="in_progress">🔄 En cours</SelectItem>
                  <SelectItem value="completed">✅ Complété</SelectItem>
                  <SelectItem value="rejected">❌ Rejeté</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-gray-200 hover:border-blue-300 hover:text-blue-600"
                onClick={() => setShowNotesDialog(true)}
              >
                <StickyNote className="w-3.5 h-3.5 mr-1" />
                Notes
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-gray-200 hover:border-red-300 hover:text-red-600 ml-auto"
                onClick={() => deleteMutation.mutate({ id: quote.id })}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Supprimer
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog notes */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notes internes — {quote.clientName}</DialogTitle>
          </DialogHeader>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ajouter des notes internes sur ce devis..."
            rows={5}
            className="resize-none"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowNotesDialog(false)}>Annuler</Button>
            <Button
              onClick={handleSaveNotes}
              style={{ background: "#FF6B35" }}
              className="text-white hover:opacity-90"
            >
              Sauvegarder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── CARTE TÉMOIGNAGE ─────────────────────────────────────────────────────────
function TestimonialCard({ testimonial: t, onRefresh }: { testimonial: any; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);

  const updateMutation = adminTrpc.testimonials.updateStatus.useMutation({
    onSuccess: () => { toast.success("Statut mis à jour !"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const deleteMutation = adminTrpc.testimonials.delete.useMutation({
    onSuccess: () => { toast.success("Témoignage supprimé"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const statusStyle = TESTIMONIAL_STATUS_STYLES[t.status as TestimonialStatus] || "";
  const statusLabel = TESTIMONIAL_STATUS_LABELS[t.status as TestimonialStatus] || t.status;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-3 overflow-hidden hover:shadow-md transition-shadow">
      {/* Barre de couleur */}
      <div className="h-1 w-full" style={{
        background: t.status === "pending" ? "#F59E0B"
          : t.status === "approved" ? "#10B981"
          : "#EF4444"
      }} />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {/* Avatar initiales */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                   style={{ background: "linear-gradient(135deg, #0D1B3E, #1E3A6E)" }}>
                {t.clientName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <span className="font-bold text-gray-900">{t.clientName}</span>
              {t.profession && <span className="text-xs text-gray-500">— {t.profession}</span>}
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusStyle}`}>
                {statusLabel}
              </span>
            </div>

            {/* Étoiles */}
            {t.rating && (
              <div className="flex items-center gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5"
                    fill={i < t.rating ? "#FF6B35" : "none"}
                    stroke={i < t.rating ? "#FF6B35" : "#D1D5DB"}
                  />
                ))}
              </div>
            )}

            <p className="text-sm text-gray-600 line-clamp-2">{t.content}</p>

            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
              {t.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</span>}
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(t.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div className="rounded-lg p-3 text-sm bg-gray-50">
              <p className="text-gray-700 leading-relaxed">{t.content}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {t.status !== "approved" && (
                <Button
                  size="sm"
                  className="h-8 text-xs text-white"
                  style={{ background: "#10B981" }}
                  onClick={() => updateMutation.mutate({ id: t.id, status: "approved" })}
                  disabled={updateMutation.isPending}
                >
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Approuver
                </Button>
              )}
              {t.status !== "rejected" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => updateMutation.mutate({ id: t.id, status: "rejected" })}
                  disabled={updateMutation.isPending}
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" />
                  Rejeter
                </Button>
              )}
              {t.status !== "pending" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs border-amber-200 text-amber-600 hover:bg-amber-50"
                  onClick={() => updateMutation.mutate({ id: t.id, status: "pending" })}
                  disabled={updateMutation.isPending}
                >
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Remettre en attente
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs border-gray-200 hover:border-red-300 hover:text-red-600 ml-auto"
                onClick={() => deleteMutation.mutate({ id: t.id })}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Supprimer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD PRINCIPAL ──────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [quoteFilter, setQuoteFilter] = useState<string>("all");
  const [testimonialFilter, setTestimonialFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const quotesQuery = adminTrpc.quotes.list.useQuery(undefined, { refetchInterval: 30000 });
  const testimonialsQuery = adminTrpc.testimonials.listAll.useQuery(undefined, { refetchInterval: 30000 });

  const quotes = quotesQuery.data || [];
  const testimonials = testimonialsQuery.data || [];

  const filteredQuotes = useMemo(() => quotes.filter(q => {
    const matchesFilter = quoteFilter === "all" || q.status === quoteFilter;
    const matchesSearch = !searchQuery ||
      q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.destination || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }), [quotes, quoteFilter, searchQuery]);

  const filteredTestimonials = useMemo(() => testimonials.filter(t => {
    const matchesFilter = testimonialFilter === "all" || t.status === testimonialFilter;
    const matchesSearch = !searchQuery ||
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }), [testimonials, testimonialFilter, searchQuery]);

  const handleRefresh = () => {
    quotesQuery.refetch();
    testimonialsQuery.refetch();
  };

  const pendingQuotes = quotes.filter(q => q.status === "pending").length;
  const pendingTestimonials = testimonials.filter(t => t.status === "pending").length;

  return (
    <div className="min-h-screen" style={{ background: "#F1F5F9" }}>
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-20 shadow-md" style={{ background: "#0D1B3E" }}>
        <div className="max-w-7xl mx-auto px-4 py-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo + titre */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                   style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}>
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base leading-tight">KHAMCI VOYAGES</h1>
                <p className="text-blue-300 text-xs">Tableau de bord administrateur</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Alertes */}
              {(pendingQuotes > 0 || pendingTestimonials > 0) && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                     style={{ background: "rgba(255,107,53,0.15)", color: "#FF8C5A" }}>
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pendingQuotes + pendingTestimonials} en attente
                </div>
              )}

              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Actualiser</span>
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-300 hover:text-red-200 hover:bg-red-900/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>

              <a href="/"
                 className="hidden sm:flex items-center gap-1 text-xs text-blue-300 hover:text-white transition-colors ml-1">
                ← Site
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ─── CONTENU ─── */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Cartes statistiques */}
        {!quotesQuery.isLoading && !testimonialsQuery.isLoading && (
          <StatsCards quotes={quotes} testimonials={testimonials} />
        )}

        {/* Section graphiques */}
        <AdminStatsSection />

        {/* Barre de recherche */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, email, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-white border-gray-200 rounded-xl shadow-sm focus:border-orange-400 focus:ring-orange-400"
          />
        </div>

        {/* Onglets */}
        <Tabs defaultValue="quotes">
          <TabsList className="mb-5 bg-white border border-gray-200 rounded-xl p-1 shadow-sm h-auto">
            <TabsTrigger
              value="quotes"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:text-white transition-all"
              style={{ "--tw-ring-color": "#FF6B35" } as any}
            >
              <FileText className="w-4 h-4" />
              Devis
              {pendingQuotes > 0 && (
                <span className="text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold"
                      style={{ background: "#FF6B35" }}>
                  {pendingQuotes}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:text-white transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Témoignages
              {pendingTestimonials > 0 && (
                <span className="text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold"
                      style={{ background: "#FF6B35" }}>
                  {pendingTestimonials}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ─── ONGLET DEVIS ─── */}
          <TabsContent value="quotes">
            {/* Filtres */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { value: "all", label: "Tous", count: quotes.length },
                { value: "pending", label: "En attente", count: quotes.filter(q => q.status === "pending").length },
                { value: "in_progress", label: "En cours", count: quotes.filter(q => q.status === "in_progress").length },
                { value: "completed", label: "Complétés", count: quotes.filter(q => q.status === "completed").length },
                { value: "rejected", label: "Rejetés", count: quotes.filter(q => q.status === "rejected").length },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setQuoteFilter(f.value)}
                  className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border"
                  style={quoteFilter === f.value
                    ? { background: "#0D1B3E", color: "white", borderColor: "#0D1B3E" }
                    : { background: "white", color: "#6B7280", borderColor: "#E5E7EB" }
                  }
                >
                  {f.label}
                  <span className="ml-1.5 text-xs opacity-70">({f.count})</span>
                </button>
              ))}
            </div>

            {quotesQuery.isLoading ? (
              <div className="text-center py-16 text-gray-400">
                <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin opacity-40" />
                <p>Chargement des devis...</p>
              </div>
            ) : quotesQuery.error ? (
              <div className="text-center py-16 text-red-500 bg-white rounded-xl border border-red-100 p-8">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-60" />
                <p className="font-medium">Erreur de chargement</p>
                <p className="text-sm text-gray-500 mt-1">{quotesQuery.error.message}</p>
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-500">Aucun devis à afficher</p>
                <p className="text-sm text-gray-400 mt-1">
                  {searchQuery ? "Essayez un autre terme de recherche" : "Les nouveaux devis apparaîtront ici"}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-400 mb-3">{filteredQuotes.length} devis affiché{filteredQuotes.length > 1 ? "s" : ""}</p>
                {filteredQuotes.map(quote => (
                  <QuoteCard key={quote.id} quote={quote} onRefresh={handleRefresh} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── ONGLET TÉMOIGNAGES ─── */}
          <TabsContent value="testimonials">
            {/* Filtres */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { value: "all", label: "Tous", count: testimonials.length },
                { value: "pending", label: "En attente", count: testimonials.filter(t => t.status === "pending").length },
                { value: "approved", label: "Approuvés", count: testimonials.filter(t => t.status === "approved").length },
                { value: "rejected", label: "Rejetés", count: testimonials.filter(t => t.status === "rejected").length },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setTestimonialFilter(f.value)}
                  className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border"
                  style={testimonialFilter === f.value
                    ? { background: "#0D1B3E", color: "white", borderColor: "#0D1B3E" }
                    : { background: "white", color: "#6B7280", borderColor: "#E5E7EB" }
                  }
                >
                  {f.label}
                  <span className="ml-1.5 text-xs opacity-70">({f.count})</span>
                </button>
              ))}
            </div>

            {testimonialsQuery.isLoading ? (
              <div className="text-center py-16 text-gray-400">
                <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin opacity-40" />
                <p>Chargement des témoignages...</p>
              </div>
            ) : testimonialsQuery.error ? (
              <div className="text-center py-16 text-red-500 bg-white rounded-xl border border-red-100 p-8">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-60" />
                <p className="font-medium">Erreur de chargement</p>
                <p className="text-sm text-gray-500 mt-1">{testimonialsQuery.error.message}</p>
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-500">Aucun témoignage à afficher</p>
                <p className="text-sm text-gray-400 mt-1">
                  {searchQuery ? "Essayez un autre terme de recherche" : "Les témoignages soumis apparaîtront ici"}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-400 mb-3">{filteredTestimonials.length} témoignage{filteredTestimonials.length > 1 ? "s" : ""} affiché{filteredTestimonials.length > 1 ? "s" : ""}</p>
                {filteredTestimonials.map(t => (
                  <TestimonialCard key={t.id} testimonial={t} onRefresh={handleRefresh} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ─── WRAPPER AVEC PROVIDER TRPC DÉDIÉ ADMIN ──────────────────────────────────
function AdminDashboardWithProvider({ adminToken, onLogout }: { adminToken: string; onLogout: () => void }) {
  const adminQueryClient = useMemo(() => new QueryClient({
    defaultOptions: { queries: { retry: false } },
  }), []);

  const adminTrpcClient = useMemo(() => adminTrpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
        headers() {
          return { "x-admin-token": adminToken };
        },
        fetch(input, init) {
          return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" });
        },
      }),
    ],
  }), [adminToken]);

  return (
    <adminTrpc.Provider client={adminTrpcClient} queryClient={adminQueryClient}>
      <QueryClientProvider client={adminQueryClient}>
        <Dashboard onLogout={onLogout} />
      </QueryClientProvider>
    </adminTrpc.Provider>
  );
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────
export default function AdminDashboardNew() {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("khamci-admin-token");
    const expiry = localStorage.getItem("khamci-admin-expiry");
    if (token && expiry && Date.now() < parseInt(expiry)) {
      setAdminToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("khamci-admin-token");
    localStorage.removeItem("khamci-admin-expiry");
    setAdminToken(null);
  };

  if (!adminToken) {
    return <AdminLogin onLogin={setAdminToken} />;
  }

  return <AdminDashboardWithProvider adminToken={adminToken} onLogout={handleLogout} />;
}
