import { useState, useEffect, useMemo, useRef } from "react";
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
  StickyNote, AlertCircle, Settings, Lock, Eye, EyeOff, ShieldCheck,
  User, Camera, Save, Building2,
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

  const updateMutation = trpc.quotes.updateStatus.useMutation({
    onSuccess: () => { toast.success("Statut mis à jour !"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const deleteMutation = trpc.quotes.delete.useMutation({
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

  const updateMutation = trpc.testimonials.updateStatus.useMutation({
    onSuccess: () => { toast.success("Statut mis à jour !"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const deleteMutation = trpc.testimonials.delete.useMutation({
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

// ───// ─── SECTION PROFIL ─────────────────────────────────────────────────
function ProfileSection() {
  const profileQuery = trpc.auth.getAdminProfile.useQuery();
  const updateProfileMutation = trpc.auth.updateAdminProfile.useMutation({
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès ! ✅");
      profileQuery.refetch();
      setIsDirty(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileQuery.data) {
      const p = profileQuery.data;
      setName(p.name || "");
      setEmail(p.email || "");
      setPhone(p.phone || "");
      setPosition(p.position || "");
      setBio(p.bio || "");
      setAvatarUrl(p.avatarUrl || "");
      setAvatarPreview(p.avatarUrl || "");
      setIsDirty(false);
    }
  }, [profileQuery.data]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 2 Mo");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setAvatarPreview(dataUrl);
      setAvatarUrl(dataUrl);
      setIsDirty(true);
    };
    reader.readAsDataURL(file);
  };

  const initials = name
    ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  if (profileQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse"
               style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}>
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-500 font-medium">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── COLONNE GAUCHE : Carte de profil ── */}
        <div className="lg:col-span-1">
          {/* Carte avatar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Bannière */}
            <div className="h-28 relative" style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1E3A7A 50%, #0D1B3E 100%)" }}>
              {/* Motif décoratif */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-3 left-4 w-8 h-8 rounded-full border-2 border-white" />
                <div className="absolute top-6 right-6 w-5 h-5 rounded-full border-2 border-white" />
                <div className="absolute bottom-2 left-1/2 w-12 h-12 rounded-full border-2 border-white -translate-x-1/2" />
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                      style={{ background: "rgba(255,107,53,0.8)" }}>Admin</span>
              </div>
            </div>

            {/* Avatar centré */}
            <div className="flex flex-col items-center px-6 pb-6 -mt-12">
              <div className="relative mb-3">
                <div
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden cursor-pointer group"
                  style={{ background: avatarPreview ? "transparent" : "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-2xl font-bold">{initials}</span>
                  )}
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all hover:scale-110 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}
                  title="Changer la photo"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              <h2 className="text-xl font-bold text-gray-900 text-center">{name || "Administrateur"}</h2>
              <p className="text-sm font-medium mt-0.5 text-center" style={{ color: "#FF6B35" }}>{position || "Poste non défini"}</p>
              {email && (
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Mail className="w-3 h-3" />{email}
                </p>
              )}
              {phone && (
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <Phone className="w-3 h-3" />{phone}
                </p>
              )}

              {bio && (
                <p className="text-xs text-gray-500 mt-3 text-center leading-relaxed border-t border-gray-100 pt-3 w-full">{bio}</p>
              )}

              <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                <Camera className="w-3 h-3" /> Cliquez sur la photo pour la modifier
              </p>
            </div>
          </div>

          {/* Indicateur de modifications */}
          {isDirty && (
            <div className="mt-3 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium"
                 style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.2)" }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Modifications non sauvegardées
            </div>
          )}
        </div>

        {/* ── COLONNE DROITE : Formulaire ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Informations de base */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: "rgba(255,107,53,0.1)" }}>
                <User className="w-4 h-4" style={{ color: "#FF6B35" }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Informations personnelles</h3>
                <p className="text-xs text-gray-400">Ces informations apparaissent dans le header du dashboard</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nom */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nom complet *</label>
                <Input
                  value={name}
                  onChange={(e) => { setName(e.target.value); setIsDirty(true); }}
                  placeholder="Ex: Mamadou Diallo"
                  className="h-12 text-base border-gray-200 rounded-xl focus:border-orange-400 focus:ring-orange-400/20"
                />
              </div>

              {/* Poste */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Poste / Titre *</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={position}
                    onChange={(e) => { setPosition(e.target.value); setIsDirty(true); }}
                    placeholder="Ex: Directeur Général, Agent de voyage..."
                    className="h-12 pl-10 text-base border-gray-200 rounded-xl focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setIsDirty(true); }}
                    placeholder="votre@email.com"
                    className="h-12 pl-10 border-gray-200 rounded-xl focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setIsDirty(true); }}
                    placeholder="+224 6XX XX XX XX"
                    className="h-12 pl-10 border-gray-200 rounded-xl focus:border-orange-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Biographie */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: "rgba(13,27,62,0.08)" }}>
                <MessageSquare className="w-4 h-4" style={{ color: "#0D1B3E" }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Biographie</h3>
                <p className="text-xs text-gray-400">Optionnel — quelques mots sur vous</p>
              </div>
            </div>
            <Textarea
              value={bio}
              onChange={(e) => { setBio(e.target.value); setIsDirty(true); }}
              placeholder="Partagez votre expérience, vos spécialités ou votre message pour les clients..."
              maxLength={300}
              rows={4}
              className="border-gray-200 rounded-xl focus:border-orange-400 resize-none text-sm"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-400">Apparaît sur votre carte de profil</p>
              <p className="text-xs font-medium" style={{ color: bio.length > 250 ? "#FF6B35" : "#9CA3AF" }}>{bio.length}/300</p>
            </div>
          </div>

          {/* Bouton sauvegarder */}
          <button
            className="w-full h-14 rounded-2xl text-white font-bold text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
            style={{
              background: isDirty
                ? "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)"
                : "#E5E7EB",
              color: isDirty ? "white" : "#9CA3AF",
              cursor: isDirty ? "pointer" : "not-allowed",
              transform: isDirty ? "none" : "none",
              boxShadow: isDirty ? "0 8px 24px rgba(255,107,53,0.35)" : "none",
            }}
            onClick={() => isDirty && updateProfileMutation.mutate({ name, email, phone, position, bio, avatarUrl })}
            disabled={updateProfileMutation.isPending || !isDirty}
          >
            {updateProfileMutation.isPending ? (
              <><RefreshCw className="w-5 h-5 animate-spin" /> Sauvegarde en cours...</>
            ) : isDirty ? (
              <><Save className="w-5 h-5" /> Enregistrer les modifications</>
            ) : (
              <><Save className="w-5 h-5" /> Profil à jour</>  
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION PARAMÈTRES ─────────────────────────────────────────────────
function SettingsSection({ adminToken }: { adminToken: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const changePasswordMutation = trpc.auth.changeAdminPassword.useMutation({
    onSuccess: () => {
      toast.success("Mot de passe modifié avec succès ! Veuillez vous reconnecter.");
      // Vider les champs
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Déconnecter après changement de mot de passe
      setTimeout(() => {
        localStorage.removeItem("khamci-admin-token");
        localStorage.removeItem("khamci-admin-expiry");
        window.location.reload();
      }, 2000);
    },
    onError: (e) => toast.error(e.message),
  });

  const passwordStrength = (pwd: string) => {
    if (pwd.length === 0) return null;
    if (pwd.length < 6) return { level: "faible", color: "#EF4444", width: "25%" };
    if (pwd.length < 8) return { level: "moyen", color: "#F59E0B", width: "50%" };
    if (pwd.length < 12 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { level: "bon", color: "#3B82F6", width: "75%" };
    return { level: "fort", color: "#10B981", width: "100%" };
  };

  const strength = passwordStrength(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="max-w-lg mx-auto">
      {/* Carte principale */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* En-tête */}
        <div className="p-6 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #0D1B3E, #1E3A6E)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,107,53,0.2)" }}>
              <Lock className="w-5 h-5" style={{ color: "#FF8C5A" }} />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Changer le mot de passe</h2>
              <p className="text-blue-300 text-sm">Sécurisez votre accès administrateur</p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="p-6 space-y-5">
          {/* Mot de passe actuel */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Mot de passe actuel
            </label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                placeholder="Entrez votre mot de passe actuel"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11 pr-10 border-gray-200 focus:border-orange-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Nouveau mot de passe */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                placeholder="Minimum 6 caractères"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 pr-10 border-gray-200 focus:border-orange-400"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Barre de force */}
            {strength && (
              <div className="mt-2">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: strength.width, background: strength.color }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: strength.color }}>
                  Force : <strong>{strength.level}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Confirmation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Répétez le nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-11 pr-10 border-gray-200 focus:border-orange-400 ${
                  passwordsMismatch ? "border-red-300 bg-red-50" : ""
                } ${passwordsMatch ? "border-emerald-300 bg-emerald-50" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordsMismatch && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Les mots de passe ne correspondent pas
              </p>
            )}
            {passwordsMatch && (
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Les mots de passe correspondent
              </p>
            )}
          </div>

          {/* Bouton */}
          <Button
            className="w-full h-11 text-white font-semibold rounded-xl mt-2"
            style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}
            onClick={() => changePasswordMutation.mutate({ currentPassword, newPassword, confirmPassword })}
            disabled={
              changePasswordMutation.isPending ||
              !currentPassword || !newPassword || !confirmPassword ||
              newPassword !== confirmPassword || newPassword.length < 6
            }
          >
            {changePasswordMutation.isPending ? (
              <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Modification en cours...</span>
            ) : (
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Modifier le mot de passe</span>
            )}
          </Button>
        </div>
      </div>

      {/* Conseil sécurité */}
      <div className="mt-4 p-4 rounded-xl border border-blue-100 bg-blue-50">
        <p className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Conseils de sécurité
        </p>
        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
          <li>Utilisez au moins 8 caractères</li>
          <li>Mélangez majuscules, minuscules et chiffres</li>
          <li>Évitez les mots du dictionnaire</li>
          <li>Ne partagez jamais votre mot de passe</li>
        </ul>
      </div>
    </div>
  );
}

// ─── DASHBOARD PRINCIPAL ──────────────────────────────────────────────────────
function Dashboard({ onLogout, adminToken }: { onLogout: () => void; adminToken: string }) {
  const [quoteFilter, setQuoteFilter] = useState<string>("all");
  const [testimonialFilter, setTestimonialFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Profil admin pour le header
  const profileQuery = trpc.auth.getAdminProfile.useQuery();
  const adminName = profileQuery.data?.name || "Administrateur";
  const adminPosition = profileQuery.data?.position || "Admin";
  const adminAvatar = profileQuery.data?.avatarUrl || null;

  const quotesQuery = trpc.quotes.list.useQuery(undefined, { refetchInterval: 30000 });
  const testimonialsQuery = trpc.testimonials.listAll.useQuery(undefined, { refetchInterval: 30000 });

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
  const totalPending = pendingQuotes + pendingTestimonials;

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

            {/* Profil admin au centre */}
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl"
                 style={{ background: "rgba(255,255,255,0.07)" }}>
              {adminAvatar ? (
                <img
                  src={adminAvatar}
                  alt={adminName}
                  className="w-8 h-8 rounded-full object-cover border-2"
                  style={{ borderColor: "#FF6B35" }}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)" }}
                >
                  {adminName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left">
                <p className="text-white text-xs font-semibold leading-tight">{adminName}</p>
                <p className="text-blue-300 text-[10px] leading-tight">{adminPosition}</p>
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
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:text-white transition-all"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:text-white transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Paramètres</span>
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

          {/* ─── ONGLET PARAMÈTRES ─── */}
          <TabsContent value="settings">
            <SettingsSection adminToken={adminToken} />
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

          {/* ─── ONGLET PROFIL ─── */}
          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ─── WRAPPER SIMPLIFIÉ (utilise le client tRPC global avec injection dynamique du token) ──────────────────────────────────
function AdminDashboardWithProvider({ adminToken, onLogout }: { adminToken: string; onLogout: () => void }) {
  return <Dashboard onLogout={onLogout} adminToken={adminToken} />;
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
