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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MapPin, Phone, Mail,
} from "lucide-react";

// =====================
// TYPES
// =====================
type QuoteStatus = "pending" | "in_progress" | "completed" | "rejected";
type TestimonialStatus = "pending" | "approved" | "rejected";

const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  pending: "En attente",
  in_progress: "En cours",
  completed: "Complété",
  rejected: "Rejeté",
};

const QUOTE_STATUS_COLORS: Record<QuoteStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const TESTIMONIAL_STATUS_COLORS: Record<TestimonialStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const SERVICE_LABELS: Record<string, string> = {
  vol: "✈️ Billet d'Avion",
  hotel: "🏨 Hôtel",
  visa: "📋 Visa",
  circuit: "🗺️ Circuit",
  custom: "🎯 Personnalisé",
  team_building: "👥 Team Building",
};

// =====================
// COMPOSANT LOGIN (utilise le trpc global sans token)
// =====================
function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const loginMutation = trpc.auth.adminLogin.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("khamci-admin-token", data.token);
      localStorage.setItem("khamci-admin-expiry", String(Date.now() + 24 * 60 * 60 * 1000));
      onLogin(data.token);
      toast.success("Connexion réussie !");
    },
    onError: () => {
      toast.error("Mot de passe incorrect");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✈️</span>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <p className="text-muted-foreground text-sm">KHAMCI VOYAGES</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Mot de passe administrateur</label>
            <Input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loginMutation.mutate({ password })}
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            onClick={() => loginMutation.mutate({ password })}
            disabled={loginMutation.isPending || !password}
          >
            {loginMutation.isPending ? "Connexion..." : "→ Se Connecter"}
          </Button>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-700">
            <strong>Mot de passe par défaut :</strong> khamci2024
            <br />
            <span className="text-xs opacity-75">⚠️ À remplacer en production</span>
          </div>
          <a href="/" className="block text-center text-sm text-muted-foreground hover:text-orange-600 transition-colors">
            ← Retour à l'accueil
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

// =====================
// COMPOSANT STATISTIQUES
// =====================
function StatsCards({ quotes, testimonials }: { quotes: any[]; testimonials: any[] }) {
  const quoteStats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === "pending").length,
    inProgress: quotes.filter(q => q.status === "in_progress").length,
    completed: quotes.filter(q => q.status === "completed").length,
  };
  const testimonialStats = {
    pending: testimonials.filter(t => t.status === "pending").length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Devis</p>
          <p className="text-3xl font-bold text-blue-600">{quoteStats.total}</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-yellow-500">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Devis en attente</p>
          <p className="text-3xl font-bold text-yellow-600">{quoteStats.pending}</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Devis complétés</p>
          <p className="text-3xl font-bold text-green-600">{quoteStats.completed}</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Témoignages en attente</p>
          <p className="text-3xl font-bold text-purple-600">{testimonialStats.pending}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// =====================
// COMPOSANT CARTE DEVIS (utilise adminTrpc)
// =====================
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

  const handleStatusChange = (status: QuoteStatus) => {
    updateMutation.mutate({ id: quote.id, status, adminNotes: notes });
  };

  const handleSaveNotes = () => {
    updateMutation.mutate({ id: quote.id, status: quote.status, adminNotes: notes });
    setShowNotesDialog(false);
  };

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* En-tête */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-base">{quote.clientName}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${QUOTE_STATUS_COLORS[quote.status as QuoteStatus]}`}>
                {QUOTE_STATUS_LABELS[quote.status as QuoteStatus]}
              </span>
              {quote.serviceType && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {SERVICE_LABELS[quote.serviceType] || quote.serviceType}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{quote.clientEmail}</span>
              {quote.clientPhone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{quote.clientPhone}</span>}
              {quote.destination && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{quote.destination}</span>}
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(quote.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-foreground p-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Détails expandés */}
        {expanded && (
          <div className="mt-4 space-y-3 border-t pt-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {quote.departureDate && (
                <div><span className="text-muted-foreground">Départ :</span> <strong>{quote.departureDate}</strong></div>
              )}
              {quote.returnDate && (
                <div><span className="text-muted-foreground">Retour :</span> <strong>{quote.returnDate}</strong></div>
              )}
              {quote.passengers && (
                <div><span className="text-muted-foreground">Passagers :</span> <strong>{quote.passengers}</strong></div>
              )}
            </div>
            {quote.message && (
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm">
                <p className="font-medium text-orange-800 mb-1">💬 Message du client :</p>
                <p className="text-gray-700">{quote.message}</p>
              </div>
            )}
            {quote.adminNotes && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
                <p className="font-medium text-blue-800 mb-1">📝 Notes admin :</p>
                <p className="text-gray-700">{quote.adminNotes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Select
                value={quote.status}
                onValueChange={(v) => handleStatusChange(v as QuoteStatus)}
              >
                <SelectTrigger className="w-44 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">⏳ En attente</SelectItem>
                  <SelectItem value="in_progress">🔄 En cours</SelectItem>
                  <SelectItem value="completed">✅ Complété</SelectItem>
                  <SelectItem value="rejected">❌ Rejeté</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setShowNotesDialog(true)}>
                📝 Notes
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (confirm("Supprimer ce devis ?")) deleteMutation.mutate({ id: quote.id });
                }}
              >
                <Trash2 className="w-3 h-3 mr-1" /> Supprimer
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {/* Dialog Notes */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notes admin — {quote.clientName}</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Ajouter des notes internes sur ce devis..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowNotesDialog(false)}>Annuler</Button>
            <Button onClick={handleSaveNotes}>Sauvegarder</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// =====================
// COMPOSANT CARTE TÉMOIGNAGE (utilise adminTrpc)
// =====================
function TestimonialCard({ testimonial, onRefresh }: { testimonial: any; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);

  const updateMutation = adminTrpc.testimonials.updateStatus.useMutation({
    onSuccess: () => { toast.success("Statut mis à jour !"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  const deleteMutation = adminTrpc.testimonials.delete.useMutation({
    onSuccess: () => { toast.success("Témoignage supprimé"); onRefresh(); },
    onError: (e) => toast.error("Erreur : " + e.message),
  });

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">{testimonial.clientName}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TESTIMONIAL_STATUS_COLORS[testimonial.status as TestimonialStatus]}`}>
                {testimonial.status === "pending" ? "En attente" : testimonial.status === "approved" ? "Approuvé" : "Rejeté"}
              </span>
              <span className="text-yellow-500 text-sm">{"⭐".repeat(testimonial.rating || 5)}</span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
              {testimonial.clientTitle && <span>{testimonial.clientTitle}</span>}
              {testimonial.clientLocation && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{testimonial.clientLocation}</span>}
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(testimonial.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-foreground p-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3 border-t pt-3">
            <div className="bg-gray-50 border rounded-lg p-3 text-sm italic text-gray-700">
              "{testimonial.content}"
            </div>
            <div className="flex flex-wrap gap-2">
              {testimonial.status !== "approved" && (
                <Button
                  size="sm"
                  className="h-8 text-xs bg-green-600 hover:bg-green-700"
                  onClick={() => updateMutation.mutate({ id: testimonial.id, status: "approved" })}
                >
                  <CheckCircle className="w-3 h-3 mr-1" /> Approuver
                </Button>
              )}
              {testimonial.status !== "rejected" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs text-orange-600 hover:bg-orange-50"
                  onClick={() => updateMutation.mutate({ id: testimonial.id, status: "rejected" })}
                >
                  <XCircle className="w-3 h-3 mr-1" /> Rejeter
                </Button>
              )}
              {testimonial.status !== "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => updateMutation.mutate({ id: testimonial.id, status: "pending" })}
                >
                  <Clock className="w-3 h-3 mr-1" /> Remettre en attente
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (confirm("Supprimer ce témoignage ?")) deleteMutation.mutate({ id: testimonial.id });
                }}
              >
                <Trash2 className="w-3 h-3 mr-1" /> Supprimer
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// =====================
// DASHBOARD PRINCIPAL (utilise adminTrpc avec token injecté)
// =====================
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [quoteFilter, setQuoteFilter] = useState<string>("all");
  const [testimonialFilter, setTestimonialFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const quotesQuery = adminTrpc.quotes.list.useQuery(undefined, {
    refetchInterval: 30000,
  });

  const testimonialsQuery = adminTrpc.testimonials.listAll.useQuery(undefined, {
    refetchInterval: 30000,
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">✈️ Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Gestion des devis et témoignages</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} className="h-8">
              <RefreshCw className="w-3 h-3 mr-1" />
              Actualiser
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout} className="h-8 text-red-600 hover:bg-red-50">
              <LogOut className="w-3 h-3 mr-1" />
              Déconnexion
            </Button>
            <a href="/" className="text-xs text-muted-foreground hover:text-orange-600 ml-2">← Site</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Statistiques */}
        {!quotesQuery.isLoading && !testimonialsQuery.isLoading && (
          <StatsCards quotes={quotes} testimonials={testimonials} />
        )}

        {/* Barre de recherche */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Onglets */}
        <Tabs defaultValue="quotes">
          <TabsList className="mb-4">
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Devis
              {quotes.filter(q => q.status === "pending").length > 0 && (
                <span className="bg-yellow-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {quotes.filter(q => q.status === "pending").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Témoignages
              {testimonials.filter(t => t.status === "pending").length > 0 && (
                <span className="bg-yellow-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {testimonials.filter(t => t.status === "pending").length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Onglet Devis */}
          <TabsContent value="quotes">
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { value: "all", label: "Tous", count: quotes.length },
                { value: "pending", label: "⏳ En attente", count: quotes.filter(q => q.status === "pending").length },
                { value: "in_progress", label: "🔄 En cours", count: quotes.filter(q => q.status === "in_progress").length },
                { value: "completed", label: "✅ Complétés", count: quotes.filter(q => q.status === "completed").length },
                { value: "rejected", label: "❌ Rejetés", count: quotes.filter(q => q.status === "rejected").length },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setQuoteFilter(f.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    quoteFilter === f.value
                      ? "bg-orange-500 text-white"
                      : "bg-white border text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            {quotesQuery.isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Chargement...</div>
            ) : quotesQuery.error ? (
              <div className="text-center py-12 text-red-500">
                Erreur : {quotesQuery.error.message}
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Aucun devis à afficher</p>
              </div>
            ) : (
              filteredQuotes.map(quote => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  onRefresh={handleRefresh}
                />
              ))
            )}
          </TabsContent>

          {/* Onglet Témoignages */}
          <TabsContent value="testimonials">
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { value: "all", label: "Tous", count: testimonials.length },
                { value: "pending", label: "⏳ En attente", count: testimonials.filter(t => t.status === "pending").length },
                { value: "approved", label: "✅ Approuvés", count: testimonials.filter(t => t.status === "approved").length },
                { value: "rejected", label: "❌ Rejetés", count: testimonials.filter(t => t.status === "rejected").length },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setTestimonialFilter(f.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    testimonialFilter === f.value
                      ? "bg-orange-500 text-white"
                      : "bg-white border text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            {testimonialsQuery.isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Chargement...</div>
            ) : testimonialsQuery.error ? (
              <div className="text-center py-12 text-red-500">
                Erreur : {testimonialsQuery.error.message}
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Aucun témoignage à afficher</p>
              </div>
            ) : (
              filteredTestimonials.map(t => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  onRefresh={handleRefresh}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// =====================
// WRAPPER AVEC PROVIDER TRPC DÉDIÉ ADMIN
// =====================
function AdminDashboardWithProvider({ adminToken, onLogout }: { adminToken: string; onLogout: () => void }) {
  // Créer un client tRPC dédié avec le token dans les headers
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

// =====================
// PAGE PRINCIPALE
// =====================
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
