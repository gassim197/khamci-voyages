import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { TrendingUp, BarChart2, PieChart as PieIcon, Calendar } from "lucide-react";

const COLORS = ["#FF6B35", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

const SERVICE_COLORS: Record<string, string> = {
  Vols: "#FF6B35",
  Hôtels: "#3B82F6",
  Visa: "#10B981",
  Circuits: "#F59E0B",
  Personnalisé: "#8B5CF6",
  "Team Building": "#EC4899",
  Autre: "#6B7280",
};

type ViewMode = "day" | "week";

// Tooltip personnalisé
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name} :</span>
            <span className="font-bold" style={{ color: entry.color }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// Label personnalisé pour le camembert
function CustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function AdminStatsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("day");

  const statsQuery = trpc.quotes.stats.useQuery(undefined, {
    refetchInterval: 60000,
  });

  if (statsQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-64 bg-gray-100 rounded-lg" />
          </Card>
        ))}
      </div>
    );
  }

  if (statsQuery.error || !statsQuery.data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
        Impossible de charger les statistiques : {statsQuery.error?.message}
      </div>
    );
  }

  const { byDay, byWeek, byService, byStatus, totals } = statsQuery.data;
  const chartData = viewMode === "day" ? byDay : byWeek;
  const xKey = viewMode === "day" ? "date" : "week";

  const hasServiceData = byService.some(s => s.value > 0);
  const hasStatusData = byStatus.some(s => s.value > 0);

  return (
    <div className="mb-6 space-y-6">
      {/* Titre section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold text-gray-900">Statistiques</h2>
        </div>
        {/* Toggle jour / semaine */}
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          <button
            onClick={() => setViewMode("day")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "day"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            7 jours
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "week"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            8 semaines
          </button>
        </div>
      </div>

      {/* Graphique principal : devis par jour ou semaine */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">
            {viewMode === "day" ? "Devis reçus — 7 derniers jours" : "Devis reçus — 8 dernières semaines"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              />
              <Bar dataKey="total" name="Total" fill="#FF6B35" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="En attente" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" name="Complétés" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graphique en courbe (tendance) */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">
            Tendance des devis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#FF6B35"
                strokeWidth={2.5}
                dot={{ fill: "#FF6B35", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                name="Complétés"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#10B981", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Deux camemberts côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Répartition par type de service */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-orange-500" />
              Par type de service
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!hasServiceData ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                Aucune donnée disponible
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={byService}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomPieLabel}
                    outerRadius={85}
                    dataKey="value"
                  >
                    {byService.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={SERVICE_COLORS[entry.name] || COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value} devis`, name]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px" }}
                    formatter={(value) => <span style={{ color: "#374151" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Répartition par statut */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-orange-500" />
              Par statut (total)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!hasStatusData ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                Aucune donnée disponible
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={byStatus}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#6B7280" }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} tickLine={false} axisLine={false} width={60} />
                    <Tooltip formatter={(value: number) => [`${value} devis`]} />
                    <Bar dataKey="value" name="Devis" radius={[0, 4, 4, 0]}>
                      {byStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                {/* Mini résumé */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {byStatus.map(s => (
                    <div key={s.name} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-gray-600">{s.name} :</span>
                      <span className="font-bold text-gray-800">{s.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Taux de conversion */}
      {totals.all > 0 && (
        <Card className="shadow-sm bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium text-orange-700">Taux de complétion</p>
                <p className="text-3xl font-bold text-orange-600">
                  {Math.round((totals.completed / totals.all) * 100)}%
                </p>
                <p className="text-xs text-orange-500 mt-1">
                  {totals.completed} complétés sur {totals.all} devis au total
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-orange-700">Devis actifs</p>
                <p className="text-3xl font-bold text-blue-600">{totals.inProgress}</p>
                <p className="text-xs text-blue-500 mt-1">en cours de traitement</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-orange-700">En attente</p>
                <p className="text-3xl font-bold text-yellow-600">{totals.pending}</p>
                <p className="text-xs text-yellow-500 mt-1">à traiter</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
