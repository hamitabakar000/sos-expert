"use client";

import { useMemo, useState } from "react";
import { Filter, RotateCcw, Search } from "lucide-react";
import { ExpertCard } from "@/components/expert-card";
import type { Expert } from "@/lib/types";

type ExpertSearchProps = {
  experts: Expert[];
  domains: string[];
};

type SortKey = "rating" | "available" | "price_asc" | "experience";

export function ExpertSearch({ experts, domains }: ExpertSearchProps) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [availableNow, setAvailableNow] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxRate, setMaxRate] = useState(800);
  const [sort, setSort] = useState<SortKey>("rating");

  const languages = useMemo(
    () => Array.from(new Set(experts.flatMap((expert) => expert.languages))).sort(),
    [experts]
  );

  const filteredExperts = useMemo(() => {
    const normalizedQuery = normalize(query);
    const normalizedCity = normalize(city);

    return experts
      .filter((expert) => {
        const haystack = normalize(
          [
            expert.firstName,
            expert.lastName,
            expert.title,
            expert.city,
            expert.bio,
            expert.domains.join(" "),
            expert.certifications.join(" ")
          ].join(" ")
        );

        const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
        const matchesCity = !normalizedCity || normalize(expert.city).includes(normalizedCity);
        const matchesDomain =
          selectedDomains.length === 0 || selectedDomains.some((domain) => expert.domains.includes(domain));
        const matchesLanguage =
          selectedLanguages.length === 0 ||
          selectedLanguages.some((language) => expert.languages.includes(language));
        const matchesAvailability = !availableNow || expert.isAvailableImmediately;
        const matchesRating = expert.averageRating >= minRating;
        const matchesRate = expert.hourlyRate <= maxRate;

        return (
          matchesQuery &&
          matchesCity &&
          matchesDomain &&
          matchesLanguage &&
          matchesAvailability &&
          matchesRating &&
          matchesRate
        );
      })
      .sort((a, b) => {
        if (sort === "available") {
          return Number(b.isAvailableImmediately) - Number(a.isAvailableImmediately) || b.averageRating - a.averageRating;
        }

        if (sort === "price_asc") {
          return a.hourlyRate - b.hourlyRate;
        }

        if (sort === "experience") {
          return b.yearsExperience - a.yearsExperience;
        }

        return b.averageRating - a.averageRating;
      });
  }, [availableNow, city, experts, maxRate, minRating, query, selectedDomains, selectedLanguages, sort]);

  function toggleDomain(domain: string) {
    setSelectedDomains((current) =>
      current.includes(domain) ? current.filter((item) => item !== domain) : [...current, domain]
    );
  }

  function toggleLanguage(language: string) {
    setSelectedLanguages((current) =>
      current.includes(language) ? current.filter((item) => item !== language) : [...current, language]
    );
  }

  function resetFilters() {
    setQuery("");
    setCity("");
    setSelectedDomains([]);
    setSelectedLanguages([]);
    setAvailableNow(false);
    setMinRating(0);
    setMaxRate(800);
    setSort("rating");
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="h-fit rounded-lg border border-border bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-accent" />
            <h2 className="font-display text-lg font-bold text-primary">Filtres</h2>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="focus-ring rounded-full p-2 text-muted hover:bg-slate-100"
            aria-label="Reinitialiser les filtres"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <label className="mt-5 block text-sm font-semibold text-primary">
          Recherche
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="Droit, IT, finance..."
            />
          </div>
        </label>

        <label className="mt-4 block text-sm font-semibold text-primary">
          Ville
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="focus-ring mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm"
            placeholder="Tanger, Rabat..."
          />
        </label>

        <label className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-primary">
          Disponible maintenant
          <input
            checked={availableNow}
            onChange={(event) => setAvailableNow(event.target.checked)}
            type="checkbox"
            className="h-5 w-5 rounded border-border text-accent"
          />
        </label>

        <div className="mt-4">
          <p className="text-sm font-semibold text-primary">Domaines</p>
          <div className="mt-2 max-h-52 space-y-2 overflow-auto pr-1">
            {domains.map((domain) => (
              <label key={domain} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={selectedDomains.includes(domain)}
                  onChange={() => toggleDomain(domain)}
                  className="h-4 w-4 rounded border-border text-accent"
                />
                {domain}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-primary">Langues</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => toggleLanguage(language)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  selectedLanguages.includes(language)
                    ? "bg-accent text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-4 block text-sm font-semibold text-primary">
          Note minimale : {minRating === 0 ? "toutes" : `${minRating}/5`}
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(event) => setMinRating(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-primary">
          Tarif max : {maxRate} MAD/h
          <input
            type="range"
            min="200"
            max="800"
            step="50"
            value={maxRate}
            onChange={(event) => setMaxRate(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>
      </aside>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted">
              {filteredExperts.length} expert{filteredExperts.length > 1 ? "s" : ""} trouve
              {filteredExperts.length > 1 ? "s" : ""}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Les resultats changent immediatement quand vous modifiez les filtres.
            </p>
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="focus-ring rounded-lg border border-border bg-white px-3 py-2 text-sm"
          >
            <option value="rating">Meilleure note</option>
            <option value="available">Disponible maintenant</option>
            <option value="price_asc">Tarif croissant</option>
            <option value="experience">Experience</option>
          </select>
        </div>

        {filteredExperts.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-white p-8 text-center shadow-card">
            <h3 className="font-display text-xl font-bold text-primary">Aucun expert pour ces criteres</h3>
            <p className="mt-2 text-slate-600">
              Essayez d'elargir la ville, le tarif ou les domaines. Dans une vraie plateforme, on proposerait aussi de
              vous prevenir lorsqu'un expert devient disponible.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="focus-ring mt-5 rounded-full bg-accent px-5 py-3 font-semibold text-white"
            >
              Reinitialiser la recherche
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
