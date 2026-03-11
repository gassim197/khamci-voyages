export default function ReassuranceBadges() {
  const badges = [
    {
      icon: "👥",
      text: "500+ Voyageurs Satisfaits",
    },
    {
      icon: "⭐",
      text: "Avis 4.9/5",
    },
    {
      icon: "🏆",
      text: "Experts Locaux depuis 2021",
    },
    {
      icon: "✓",
      text: "Garantie Satisfaction 100%",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="text-2xl mb-2">{badge.icon}</div>
          <p className="text-sm font-semibold text-gray-900">{badge.text}</p>
        </div>
      ))}
    </div>
  );
}
