export function CategoryList() {
  const categories = [
    { title: "Design & Profil", icon: "x", desc: "Logoer, visuell identitet og merkevarebygging." },
    { title: "Webutvikling", icon: "x", desc: "Moderne nettsider og e-handel med topp brukergrensesnitt." },
    { title: "App Utvikling", icon: "x", desc: "Skreddersydde mobilapplikasjoner for iOS og Android." },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Våre Hovedkategorier</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <span className="text-4xl p-3 bg-slate-50 rounded-xl inline-block border border-slate-100 mb-4">
              {cat.icon}
            </span>
            <h3 className="text-lg font-bold text-slate-900">{cat.title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}