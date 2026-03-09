import { useState, useEffect, useMemo, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  MapPin, Phone, Mail, Plane, Star, TrendingUp,
  StickyNote, AlertCircle, Settings, Lock, Eye, EyeOff, ShieldCheck,
  User, Camera, Save, LayoutDashboard, Menu, X, Bell,
  ArrowUpRight, ArrowDownRight, Calendar, MoreVertical,
} from "lucide-react";
import AdminStatsSection from "@/components/AdminStatsSection";

// ─── COULEURS KHAMCI VOYAGES ────────────────────────────────────────────────
const NAVY = "#0D1B3E";
const NAVY_LIGHT = "#1E3A6E";
const ORANGE = "#FF6B35";
const ORANGE_LIGHT = "#FF8C5A";

// ─── TYPES ──────────────────────────────────────────────────────────────────
type QuoteStatus = "pending" | "in_progress" | "completed" | "rejected";
type TestimonialStatus = "pending" | "approved" | "rejected";
type ActiveView = "dashboard" | "quotes" | "testimonials" | "profile" | "settings";

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
    <div className="min-h-screen flex" style={{ background: NAVY }}>
      {/* Panneau gauche décoratif */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
           style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_LIGHT} 100%)` }}>
        {/* Cercles décoratifs */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"
             style={{ background: ORANGE }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"
             style={{ background: ORANGE }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"
             style={{ background: ORANGE }} />

        {/* Contenu */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 shadow-2xl"
               style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}>
            <Plane className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">KHAMCI VOYAGES</h1>
          <p className="text-blue-300 text-lg mb-8">Votre partenaire de voyage en Guinée</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: Plane, label: "Vols" },
              { icon: MapPin, label: "Destinations" },
              { icon: Star, label: "Services" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl"
                   style={{ background: "rgba(255,255,255,0.05)" }}>
                <Icon className="w-6 h-6" style={{ color: ORANGE_LIGHT }} />
                <span className="text-blue-200 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau droit - formulaire */}
      <div className="flex-1 flex items-center justify-center p-8"
           style={{ background: "#F8FAFC" }}>
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 shadow-lg"
                 style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}>
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: NAVY }}>KHAMCI VOYAGES</h1>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>Bon retour !</h2>
              <p className="text-gray-500">Connectez-vous à votre espace administrateur</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && loginMutation.mutate({ password })}
                    className="pl-10 h-12 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>

              <Button
                className="w-full h-12 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}
                onClick={() => loginMutation.mutate({ password })}
                disabled={loginMutation.isPending || !password}
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Connexion...</span>
                ) : (
                  <span className="flex items-center gap-2">Se connecter <ArrowUpRight className="w-4 h-4" /></span>
                )}
              </Button>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-700">
                <strong>Mot de passe par défaut :</strong> khamci2024
              </p>
            </div>

            <a href="/" className="block text-center text-sm text-gray-400 hover:text-orange-500 transition-colors mt-5">
              ← Retour au site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({
  activeView,
  onNavigate,
  onLogout,
  adminName,
  adminPosition,
  adminAvatar,
  pendingQuotes,
  pendingTestimonials,
  isOpen,
  onClose,
}: {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onLogout: () => void;
  adminName: string;
  adminPosition: string;
  adminAvatar: string | null;
  pendingQuotes: number;
  pendingTestimonials: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const navItems: { id: ActiveView; icon: any; label: string; badge?: number }[] = [
    { id: "dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { id: "quotes", icon: FileText, label: "Devis", badge: pendingQuotes },
    { id: "testimonials", icon: MessageSquare, label: "Témoignages", badge: pendingTestimonials },
    { id: "profile", icon: User, label: "Profil" },
    { id: "settings", icon: Settings, label: "Paramètres" },
  ];

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ width: "260px", background: NAVY }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}>
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">KHAMCI VOYAGES</h1>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Administration</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto lg:hidden text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profil admin */}
        <div className="p-4 mx-3 my-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-3">
            {adminAvatar ? (
              <img
                src={adminAvatar}
                alt={adminName}
                className="w-11 h-11 rounded-full object-cover border-2"
                style={{ borderColor: ORANGE }}
              />
            ) : (
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}
              >
                {adminName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{adminName}</p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{adminPosition}</p>
            </div>
            <div className="ml-auto flex-shrink-0">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${ORANGE}22`, color: ORANGE_LIGHT }}>
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-3"
             style={{ color: "rgba(255,255,255,0.3)" }}>
            Menu principal
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
                style={isActive
                  ? { background: `linear-gradient(135deg, ${ORANGE}22, ${ORANGE}11)`, color: ORANGE_LIGHT, borderLeft: `3px solid ${ORANGE}` }
                  : { color: "rgba(255,255,255,0.6)", borderLeft: "3px solid transparent" }
                }
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "" : "group-hover:text-white"}`}
                     style={isActive ? { color: ORANGE } : {}} />
                <span className={`flex-1 text-left transition-colors ${!isActive ? "group-hover:text-white" : ""}`}>
                  {item.label}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-white text-xs rounded-full px-2 py-0.5 font-bold min-w-[22px] text-center"
                        style={{ background: ORANGE }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bas de la sidebar */}
        <div className="p-3 border-t space-y-1" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowUpRight className="w-5 h-5" />
            <span>Voir le site</span>
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-900/30"
            style={{ color: "#FCA5A5" }}
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
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

  const saveNotesMutation = trpc.quotes.updateStatus.useMutation({
    onSuccess: () => { toast.success("Notes sauvegardées !"); setShowNotesDialog(false); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const statusStyle = QUOTE_STATUS_STYLES[quote.status as QuoteStatus] || "";
  const statusLabel = QUOTE_STATUS_LABELS[quote.status as QuoteStatus] || quote.status;
  const serviceLabel = SERVICE_LABELS[quote.serviceType] || quote.serviceType;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Barre de couleur */}
      <div className="h-1 w-full" style={{
        background: quote.status === "pending" ? "#F59E0B"
          : quote.status === "in_progress" ? "#3B82F6"
          : quote.status === "completed" ? "#10B981"
          : "#EF4444"
      }} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {/* Avatar initiales */}
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                   style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_LIGHT})` }}>
                {quote.clientName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <span className="font-bold text-gray-900 text-sm">{quote.clientName}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle}`}>
                    {statusLabel}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {serviceLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" />{quote.clientEmail}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" />{quote.clientPhone}</span>
              {quote.destination && (
                <span className="flex items-center gap-1.5 col-span-2"><MapPin className="w-3.5 h-3.5 text-gray-400" />{quote.destination}</span>
              )}
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400" />{new Date(quote.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {quote.adminNotes && (
              <button
                onClick={() => setShowNotesDialog(true)}
                className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 transition-colors"
                title="Voir les notes"
              >
                <StickyNote className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            {/* Détails */}
            {(quote.departureDate || quote.returnDate || quote.passengers || quote.budget) && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                {quote.departureDate && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">Départ</p>
                    <p className="font-medium text-gray-700">{new Date(quote.departureDate).toLocaleDateString("fr-FR")}</p>
                  </div>
                )}
                {quote.returnDate && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">Retour</p>
                    <p className="font-medium text-gray-700">{new Date(quote.returnDate).toLocaleDateString("fr-FR")}</p>
                  </div>
                )}
                {quote.passengers && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">Passagers</p>
                    <p className="font-medium text-gray-700">{quote.passengers}</p>
                  </div>
                )}
                {quote.budget && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">Budget</p>
                    <p className="font-medium text-gray-700">{quote.budget}</p>
                  </div>
                )}
              </div>
            )}

            {quote.message && (
              <div className="bg-blue-50 rounded-xl p-3 text-sm">
                <p className="text-xs text-blue-500 font-medium mb-1">Message du client</p>
                <p className="text-gray-700 leading-relaxed">{quote.message}</p>
              </div>
            )}

            {/* Changer le statut */}
            <div className="flex items-center gap-2">
              <Select
                value={quote.status}
                onValueChange={(val) => updateMutation.mutate({ id: quote.id, status: val as QuoteStatus })}
              >
                <SelectTrigger className="h-9 text-xs border-gray-200 rounded-xl flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>

              <Button
                size="sm"
                variant="outline"
                className="h-9 text-xs border-gray-200 rounded-xl"
                onClick={() => setShowNotesDialog(true)}
              >
                <StickyNote className="w-3.5 h-3.5 mr-1" />
                Notes
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="h-9 text-xs border-red-100 text-red-500 hover:bg-red-50 rounded-xl"
                onClick={() => deleteMutation.mutate({ id: quote.id })}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog notes */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold" style={{ color: NAVY }}>
              Notes — {quote.clientName}
            </DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Ajouter des notes internes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[120px] border-gray-200 rounded-xl resize-none"
          />
          <Button
            className="w-full text-white rounded-xl"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}
            onClick={() => saveNotesMutation.mutate({ id: quote.id, status: quote.status, adminNotes: notes })}
            disabled={saveNotesMutation.isPending}
          >
            {saveNotesMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="h-1 w-full" style={{
        background: t.status === "pending" ? "#F59E0B"
          : t.status === "approved" ? "#10B981"
          : "#EF4444"
      }} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                   style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_LIGHT})` }}>
                {t.clientName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <span className="font-bold text-gray-900 text-sm">{t.clientName}</span>
                {t.profession && <span className="text-xs text-gray-500 ml-1">— {t.profession}</span>}
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle}`}>
                    {statusLabel}
                  </span>
                  {t.rating && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3"
                          fill={i < t.rating ? ORANGE : "none"}
                          stroke={i < t.rating ? ORANGE : "#D1D5DB"} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{t.content}</p>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              {t.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</span>}
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(t.createdAt).toLocaleDateString("fr-FR")}</span>
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
            <div className="rounded-xl p-3 text-sm bg-gray-50">
              <p className="text-gray-700 leading-relaxed">{t.content}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {t.status !== "approved" && (
                <Button size="sm" className="h-8 text-xs text-white rounded-xl"
                  style={{ background: "#10B981" }}
                  onClick={() => updateMutation.mutate({ id: t.id, status: "approved" })}
                  disabled={updateMutation.isPending}>
                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approuver
                </Button>
              )}
              {t.status !== "rejected" && (
                <Button size="sm" variant="outline"
                  className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                  onClick={() => updateMutation.mutate({ id: t.id, status: "rejected" })}
                  disabled={updateMutation.isPending}>
                  <XCircle className="w-3.5 h-3.5 mr-1" /> Rejeter
                </Button>
              )}
              {t.status !== "pending" && (
                <Button size="sm" variant="outline"
                  className="h-8 text-xs border-amber-200 text-amber-600 hover:bg-amber-50 rounded-xl"
                  onClick={() => updateMutation.mutate({ id: t.id, status: "pending" })}
                  disabled={updateMutation.isPending}>
                  <Clock className="w-3.5 h-3.5 mr-1" /> En attente
                </Button>
              )}
              <Button size="sm" variant="outline"
                className="h-8 text-xs border-gray-200 hover:border-red-300 hover:text-red-600 ml-auto rounded-xl"
                onClick={() => deleteMutation.mutate({ id: t.id })}
                disabled={deleteMutation.isPending}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION PROFIL ─────────────────────────────────────────────────────────
function ProfileSection() {
  const profileQuery = trpc.auth.getAdminProfile.useQuery();
  const updateProfileMutation = trpc.auth.updateAdminProfile.useMutation({
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès !");
      profileQuery.refetch();
      setIsDirty(false);
    },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileQuery.data) {
      setName(profileQuery.data.name || "");
      setPosition(profileQuery.data.position || "");
      setEmail(profileQuery.data.email || "");
      setPhone(profileQuery.data.phone || "");
      setBio(profileQuery.data.bio || "");
    }
  }, [profileQuery.data]);

  const uploadAvatarMutation = trpc.auth.updateAdminProfile.useMutation({
    onSuccess: () => { toast.success("Photo mise à jour !"); profileQuery.refetch(); },
    onError: (e: any) => toast.error("Erreur upload : " + e.message),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      uploadAvatarMutation.mutate({ name, position, email, phone, bio, avatarUrl: base64 });
    };
    reader.readAsDataURL(file);
  };

  const markDirty = () => setIsDirty(true);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100"
             style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_LIGHT})` }}>
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              {profileQuery.data?.avatarUrl ? (
                <img src={profileQuery.data.avatarUrl} alt="Avatar"
                  className="w-16 h-16 rounded-2xl object-cover border-2" style={{ borderColor: ORANGE }} />
              ) : (
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                     style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}>
                  {name.charAt(0).toUpperCase() || "A"}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ background: ORANGE }}
                title="Changer la photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{name || "Administrateur"}</h2>
              <p className="text-blue-300 text-sm">{position || "Admin"}</p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nom complet *</label>
              <Input value={name} onChange={(e) => { setName(e.target.value); markDirty(); }}
                placeholder="Ex: Mamadou Diallo" className="h-10 border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Poste / Titre *</label>
              <Input value={position} onChange={(e) => { setPosition(e.target.value); markDirty(); }}
                placeholder="Ex: Directeur Général" className="h-10 border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
              <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value); markDirty(); }}
                placeholder="votre@email.com" className="h-10 border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Téléphone</label>
              <Input value={phone} onChange={(e) => { setPhone(e.target.value); markDirty(); }}
                placeholder="+224 6XX XX XX XX" className="h-10 border-gray-200 rounded-xl" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Bio / Description</label>
            <Textarea value={bio} onChange={(e) => { setBio(e.target.value); markDirty(); }}
              placeholder="Partagez votre expérience..." rows={3}
              className="border-gray-200 rounded-xl resize-none" />
          </div>

          <Button
            className="w-full h-11 text-white font-semibold rounded-xl"
            style={{ background: isDirty ? `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` : "#E5E7EB",
                     color: isDirty ? "white" : "#9CA3AF" }}
            onClick={() => updateProfileMutation.mutate({ name, position, email, phone, bio })}
            disabled={updateProfileMutation.isPending || !isDirty || !name || !position}
          >
            {updateProfileMutation.isPending ? (
              <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Sauvegarde...</span>
            ) : isDirty ? (
              <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Enregistrer les modifications</span>
            ) : (
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Profil à jour</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION PARAMÈTRES ─────────────────────────────────────────────────────
function SettingsSection({ adminToken }: { adminToken: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const changePasswordMutation = trpc.auth.changeAdminPassword.useMutation({
    onSuccess: () => {
      toast.success("Mot de passe modifié ! Veuillez vous reconnecter.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
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
    if (pwd.length < 6) return { level: "Faible", color: "#EF4444", width: "25%" };
    if (pwd.length < 8) return { level: "Moyen", color: "#F59E0B", width: "50%" };
    if (pwd.length < 12 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { level: "Bon", color: "#3B82F6", width: "75%" };
    return { level: "Fort", color: "#10B981", width: "100%" };
  };

  const strength = passwordStrength(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100"
             style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_LIGHT})` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: `${ORANGE}33` }}>
              <Lock className="w-5 h-5" style={{ color: ORANGE_LIGHT }} />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Changer le mot de passe</h2>
              <p className="text-blue-300 text-sm">Sécurisez votre accès administrateur</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {[
            { label: "Mot de passe actuel", value: currentPassword, setter: setCurrentPassword, show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
            { label: "Nouveau mot de passe", value: newPassword, setter: setNewPassword, show: showNew, toggle: () => setShowNew(!showNew) },
            { label: "Confirmer le mot de passe", value: confirmPassword, setter: setConfirmPassword, show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
          ].map(({ label, value, setter, show, toggle }, idx) => (
            <div key={idx}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className={`h-11 pr-10 border-gray-200 rounded-xl focus:border-orange-400 ${
                    idx === 2 && passwordsMismatch ? "border-red-300 bg-red-50" : ""
                  } ${idx === 2 && passwordsMatch ? "border-emerald-300 bg-emerald-50" : ""}`}
                />
                <button type="button" onClick={toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {idx === 1 && strength && (
                <div className="mt-2">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300"
                         style={{ width: strength.width, background: strength.color }} />
                  </div>
                  <p className="text-xs mt-1" style={{ color: strength.color }}>Force : <strong>{strength.level}</strong></p>
                </div>
              )}
              {idx === 2 && passwordsMismatch && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Les mots de passe ne correspondent pas
                </p>
              )}
              {idx === 2 && passwordsMatch && (
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Les mots de passe correspondent
                </p>
              )}
            </div>
          ))}

          <Button
            className="w-full h-11 text-white font-semibold rounded-xl"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})` }}
            onClick={() => changePasswordMutation.mutate({ currentPassword, newPassword, confirmPassword })}
            disabled={changePasswordMutation.isPending || !currentPassword || !newPassword || !confirmPassword
              || newPassword !== confirmPassword || newPassword.length < 6}
          >
            {changePasswordMutation.isPending ? (
              <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Modification...</span>
            ) : (
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Modifier le mot de passe</span>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-2xl border border-blue-100 bg-blue-50">
        <p className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Conseils de sécurité
        </p>
        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
          <li>Utilisez au moins 8 caractères</li>
          <li>Mélangez majuscules, minuscules et chiffres</li>
          <li>Évitez les mots du dictionnaire</li>
        </ul>
      </div>
    </div>
  );
}

// ─── VUE TABLEAU DE BORD (OVERVIEW) ─────────────────────────────────────────
function DashboardOverview({
  quotes,
  testimonials,
  onNavigate,
}: {
  quotes: any[];
  testimonials: any[];
  onNavigate: (view: ActiveView) => void;
}) {
  const pendingQuotes = quotes.filter(q => q.status === "pending");
  const recentQuotes = [...quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const kpis = [
    {
      label: "Total Devis",
      value: quotes.length,
      icon: FileText,
      color: NAVY,
      bg: "#EEF2FF",
      border: "#C7D2FE",
      trend: "+12%",
      up: true,
    },
    {
      label: "En attente",
      value: quotes.filter(q => q.status === "pending").length,
      icon: Clock,
      color: "#B45309",
      bg: "#FFFBEB",
      border: "#FDE68A",
      trend: quotes.filter(q => q.status === "pending").length > 0 ? "À traiter" : "Aucun",
      up: false,
    },
    {
      label: "Complétés",
      value: quotes.filter(q => q.status === "completed").length,
      icon: CheckCircle,
      color: "#065F46",
      bg: "#ECFDF5",
      border: "#A7F3D0",
      trend: quotes.length > 0 ? `${Math.round((quotes.filter(q => q.status === "completed").length / quotes.length) * 100)}%` : "0%",
      up: true,
    },
    {
      label: "Témoignages",
      value: testimonials.filter(t => t.status === "pending").length,
      icon: MessageSquare,
      color: "#7C3AED",
      bg: "#F5F3FF",
      border: "#DDD6FE",
      trend: "En attente",
      up: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label}
              className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              style={{ borderColor: kpi.border }}
              onClick={() => kpi.label === "Total Devis" || kpi.label === "En attente" || kpi.label === "Complétés"
                ? onNavigate("quotes") : onNavigate("testimonials")}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                     style={{ background: kpi.bg }}>
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 px-2 py-1 rounded-full ${kpi.up ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.trend}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: kpi.color }}>{kpi.value}</p>
              <p className="text-xs font-medium text-gray-500">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Graphiques */}
      <AdminStatsSection />

      {/* Grille inférieure : Devis récents + Activité */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Devis récents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Devis récents</h3>
            <button
              onClick={() => onNavigate("quotes")}
              className="text-xs font-medium flex items-center gap-1 hover:underline"
              style={{ color: ORANGE }}
            >
              Voir tout <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentQuotes.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucun devis pour l'instant</p>
              </div>
            ) : recentQuotes.map((q) => (
              <div key={q.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                     style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_LIGHT})` }}>
                  {q.clientName?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{q.clientName}</p>
                  <p className="text-xs text-gray-400 truncate">{q.destination || SERVICE_LABELS[q.serviceType] || q.serviceType}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${QUOTE_STATUS_STYLES[q.status as QuoteStatus]}`}>
                    {QUOTE_STATUS_LABELS[q.status as QuoteStatus]}
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(q.createdAt).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité rapide */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Actions rapides</h3>
          </div>
          <div className="p-4 space-y-3">
            {/* Devis en attente */}
            <div className="p-4 rounded-xl border" style={{ background: "#FFFBEB", borderColor: "#FDE68A" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-700">Devis en attente</span>
                <span className="text-lg font-bold text-amber-700">{pendingQuotes.length}</span>
              </div>
              {pendingQuotes.length > 0 ? (
                <button
                  onClick={() => onNavigate("quotes")}
                  className="w-full text-xs font-medium py-1.5 rounded-lg text-white transition-all"
                  style={{ background: "#F59E0B" }}
                >
                  Traiter maintenant
                </button>
              ) : (
                <p className="text-xs text-amber-600">Aucun devis en attente 🎉</p>
              )}
            </div>

            {/* Témoignages en attente */}
            <div className="p-4 rounded-xl border" style={{ background: "#F5F3FF", borderColor: "#DDD6FE" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-700">Témoignages</span>
                <span className="text-lg font-bold text-purple-700">{testimonials.filter(t => t.status === "pending").length}</span>
              </div>
              {testimonials.filter(t => t.status === "pending").length > 0 ? (
                <button
                  onClick={() => onNavigate("testimonials")}
                  className="w-full text-xs font-medium py-1.5 rounded-lg text-white transition-all"
                  style={{ background: "#7C3AED" }}
                >
                  Modérer
                </button>
              ) : (
                <p className="text-xs text-purple-600">Aucun témoignage en attente</p>
              )}
            </div>

            {/* Taux de complétion */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-600 mb-2">Taux de complétion</p>
              <p className="text-2xl font-bold mb-2" style={{ color: NAVY }}>
                {quotes.length > 0 ? Math.round((quotes.filter(q => q.status === "completed").length / quotes.length) * 100) : 0}%
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: quotes.length > 0 ? `${Math.round((quotes.filter(q => q.status === "completed").length / quotes.length) * 100)}%` : "0%",
                    background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE_LIGHT})`
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {quotes.filter(q => q.status === "completed").length} sur {quotes.length} devis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD PRINCIPAL ──────────────────────────────────────────────────────
function Dashboard({ onLogout, adminToken }: { onLogout: () => void; adminToken: string }) {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [quoteFilter, setQuoteFilter] = useState<string>("all");
  const [testimonialFilter, setTestimonialFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const PAGE_TITLES: Record<ActiveView, string> = {
    dashboard: "Tableau de bord",
    quotes: "Gestion des devis",
    testimonials: "Gestion des témoignages",
    profile: "Mon profil",
    settings: "Paramètres",
  };

  return (
    <div className="min-h-screen" style={{ background: "#F1F5F9" }}>
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        onLogout={onLogout}
        adminName={adminName}
        adminPosition={adminPosition}
        adminAvatar={adminAvatar}
        pendingQuotes={pendingQuotes}
        pendingTestimonials={pendingTestimonials}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Zone principale (avec marge pour la sidebar sur desktop) */}
      <div className="lg:ml-[260px] flex flex-col min-h-screen">
        {/* Header fixe */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 px-4 sm:px-6 h-16">
            {/* Bouton menu mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Titre de la page */}
            <div className="flex-1">
              <h2 className="font-bold text-gray-900 text-base">{PAGE_TITLES[activeView]}</h2>
              <p className="text-xs text-gray-400 hidden sm:block">
                {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Barre de recherche */}
            {(activeView === "quotes" || activeView === "testimonials") && (
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 w-56 bg-gray-50 border-gray-200 rounded-xl text-sm focus:border-orange-400"
                />
              </div>
            )}

            {/* Alertes */}
            {(pendingQuotes + pendingTestimonials) > 0 && (
              <div className="relative">
                <button className="p-2 rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                        style={{ background: ORANGE }}>
                    {pendingQuotes + pendingTestimonials}
                  </span>
                </button>
              </div>
            )}

            {/* Actualiser */}
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              title="Actualiser"
            >
              <RefreshCw className={`w-5 h-5 ${quotesQuery.isFetching || testimonialsQuery.isFetching ? "animate-spin" : ""}`} />
            </button>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Barre de recherche mobile */}
          {(activeView === "quotes" || activeView === "testimonials") && (
            <div className="relative mb-4 sm:hidden">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white border-gray-200 rounded-xl shadow-sm"
              />
            </div>
          )}

          {/* ─── VUE TABLEAU DE BORD ─── */}
          {activeView === "dashboard" && (
            <DashboardOverview
              quotes={quotes}
              testimonials={testimonials}
              onNavigate={setActiveView}
            />
          )}

          {/* ─── VUE DEVIS ─── */}
          {activeView === "quotes" && (
            <div>
              {/* Filtres */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {[
                  { value: "all", label: "Tous", count: quotes.length },
                  { value: "pending", label: "En attente", count: quotes.filter(q => q.status === "pending").length },
                  { value: "in_progress", label: "En cours", count: quotes.filter(q => q.status === "in_progress").length },
                  { value: "completed", label: "Complétés", count: quotes.filter(q => q.status === "completed").length },
                  { value: "rejected", label: "Rejetés", count: quotes.filter(q => q.status === "rejected").length },
                ].map(f => (
                  <button key={f.value} onClick={() => setQuoteFilter(f.value)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all border"
                    style={quoteFilter === f.value
                      ? { background: NAVY, color: "white", borderColor: NAVY }
                      : { background: "white", color: "#6B7280", borderColor: "#E5E7EB" }
                    }>
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
                <div className="text-center py-16 text-red-500 bg-white rounded-2xl border border-red-100 p-8">
                  <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-60" />
                  <p className="font-medium">Erreur de chargement</p>
                  <p className="text-sm text-gray-500 mt-1">{quotesQuery.error.message}</p>
                </div>
              ) : filteredQuotes.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
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
            </div>
          )}

          {/* ─── VUE TÉMOIGNAGES ─── */}
          {activeView === "testimonials" && (
            <div>
              <div className="flex gap-2 mb-5 flex-wrap">
                {[
                  { value: "all", label: "Tous", count: testimonials.length },
                  { value: "pending", label: "En attente", count: testimonials.filter(t => t.status === "pending").length },
                  { value: "approved", label: "Approuvés", count: testimonials.filter(t => t.status === "approved").length },
                  { value: "rejected", label: "Rejetés", count: testimonials.filter(t => t.status === "rejected").length },
                ].map(f => (
                  <button key={f.value} onClick={() => setTestimonialFilter(f.value)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all border"
                    style={testimonialFilter === f.value
                      ? { background: NAVY, color: "white", borderColor: NAVY }
                      : { background: "white", color: "#6B7280", borderColor: "#E5E7EB" }
                    }>
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
              ) : filteredTestimonials.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                  <p className="font-medium text-gray-500">Aucun témoignage à afficher</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {searchQuery ? "Essayez un autre terme de recherche" : "Les témoignages soumis apparaîtront ici"}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-400 mb-3">{filteredTestimonials.length} témoignage{filteredTestimonials.length > 1 ? "s" : ""}</p>
                  {filteredTestimonials.map(t => (
                    <TestimonialCard key={t.id} testimonial={t} onRefresh={handleRefresh} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── VUE PROFIL ─── */}
          {activeView === "profile" && <ProfileSection />}

          {/* ─── VUE PARAMÈTRES ─── */}
          {activeView === "settings" && <SettingsSection adminToken={adminToken} />}
        </main>
      </div>
    </div>
  );
}

// ─── WRAPPER ──────────────────────────────────────────────────────────────────
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
