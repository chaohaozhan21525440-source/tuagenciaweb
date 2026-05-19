import type { Dict } from "@/lib/i18n";

const Sparkle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2 L13.6 9.2 C13.85 10.3 14.7 11.15 15.8 11.4 L23 13 L15.8 14.6 C14.7 14.85 13.85 15.7 13.6 16.8 L12 24 L10.4 16.8 C10.15 15.7 9.3 14.85 8.2 14.6 L1 13 L8.2 11.4 C9.3 11.15 10.15 10.3 10.4 9.2 Z" />
  </svg>
);

const Chevron = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Glovo = () => (
  <svg viewBox="0 0 130 32" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="24" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="26" fontWeight="700" fill="currentColor" letterSpacing="-0.5">Glovo</text>
    <circle cx="112" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <path d="M112 17 L112 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const Wallapop = () => (
  <svg viewBox="0 0 170 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 5 C8 5 4 9 4 14 C4 17 5.5 19.5 8 21 L7 27 L13 24 C13.3 24 13.7 24 14 24 C20 24 24 20 24 14 C24 9 20 5 14 5 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="34" y="23" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="22" fontWeight="500" fill="currentColor" letterSpacing="-0.2">wallapop</text>
  </svg>
);

const Idealista = () => (
  <svg viewBox="0 0 160 32" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="24" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontStyle="italic" fontWeight="400" fill="currentColor" letterSpacing="-0.5">idealista</text>
  </svg>
);

const Factorial = () => (
  <svg viewBox="0 0 170 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="14" cy="13" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M7 23 C9 20.5 19 20.5 21 23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <text x="34" y="23" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="22" fontWeight="600" fill="currentColor" letterSpacing="-0.3">factorial</text>
  </svg>
);

const Holded = () => (
  <svg viewBox="0 0 150 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4 L24 16 L14 28 L4 16 Z" fill="currentColor" opacity="0.85" />
    <path d="M14 10 L20 16 L14 22 L8 16 Z" fill="#F7F8FA" />
    <text x="32" y="23" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="22" fontWeight="700" fill="currentColor" letterSpacing="-0.3">holded</text>
  </svg>
);

const Typeform = () => (
  <svg viewBox="0 0 170 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="20" height="20" rx="5" fill="currentColor" />
    <text x="32" y="23" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="22" fontWeight="600" fill="currentColor" letterSpacing="-0.3">Typeform</text>
  </svg>
);

const TravelPerk = () => (
  <svg viewBox="0 0 170 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="22" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 16 L20 11 L17 16 L20 21 Z" fill="currentColor" />
    <text x="34" y="23" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="22" fontWeight="500" fill="currentColor" letterSpacing="-0.3">travelperk</text>
  </svg>
);

const Hawkers = () => (
  <svg viewBox="0 0 170 32" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="22" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="0.35em">HAWKERS</text>
  </svg>
);

const NudeProject = () => (
  <svg viewBox="0 0 200 32" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="22" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="17" fontWeight="800" fill="currentColor" letterSpacing="0.18em">NUDE PROJECT</text>
    <circle cx="178" cy="11" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const Tropicfeel = () => (
  <svg viewBox="0 0 180 32" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
      <circle cx="14" cy="16" r="3" />
      <line x1="14" y1="4" x2="14" y2="8" />
      <line x1="14" y1="24" x2="14" y2="28" />
      <line x1="2" y1="16" x2="6" y2="16" />
      <line x1="22" y1="16" x2="26" y2="16" />
      <line x1="5.5" y1="7.5" x2="8.3" y2="10.3" />
      <line x1="19.7" y1="21.7" x2="22.5" y2="24.5" />
      <line x1="22.5" y1="7.5" x2="19.7" y2="10.3" />
      <line x1="8.3" y1="21.7" x2="5.5" y2="24.5" />
    </g>
    <text x="34" y="23" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="22" fontWeight="600" fill="currentColor" letterSpacing="-0.3">Tropicfeel</text>
  </svg>
);

const NotionLogo = () => (
  <svg viewBox="0 0 150 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M10 10 L10 22 M10 10 L18 22 M18 10 L18 22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <text x="34" y="23" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="22" fontWeight="500" fill="currentColor" letterSpacing="-0.3">Notion</text>
  </svg>
);

const Stripe = () => (
  <svg viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="24" fontFamily="var(--font-display), var(--font-sans), sans-serif" fontSize="26" fontWeight="800" fontStyle="italic" fill="currentColor" letterSpacing="-0.8">stripe</text>
  </svg>
);

const LOGOS = [
  { title: "Glovo",        Component: Glovo },
  { title: "Wallapop",     Component: Wallapop },
  { title: "Idealista",    Component: Idealista },
  { title: "Factorial",    Component: Factorial },
  { title: "Holded",       Component: Holded },
  { title: "Typeform",     Component: Typeform },
  { title: "TravelPerk",   Component: TravelPerk },
  { title: "Hawkers",      Component: Hawkers },
  { title: "Nude Project", Component: NudeProject },
  { title: "Tropicfeel",   Component: Tropicfeel },
  { title: "Notion",       Component: NotionLogo },
  { title: "Stripe",       Component: Stripe },
];

export function Brands({ dict }: { dict: Dict["brands"] }) {
  return (
    <section id="marcas" className="marcas-section">
      <div className="container-mr">
        <header className="head">
          <span className="badge"><span className="dot" />{dict.pill}</span>
          <h2 className="title">{dict.h2}</h2>
          <p className="subtitle">{dict.sub}</p>
          <a className="chevron-btn" href="#marcas-logos" aria-label={dict.scrollLabel}>
            <Chevron />
          </a>
        </header>

        <div id="marcas-logos" className="logo-grid" aria-label={dict.h2}>
          {LOGOS.map(({ title, Component }) => (
            <div key={title} className="logo-cell">
              <span className="logo" title={title}>
                <Component />
              </span>
            </div>
          ))}
        </div>

        <div className="note">
          <span className="sparkle"><Sparkle /></span>
          <span className="divider" />
          <p>{dict.note}</p>
        </div>
      </div>
    </section>
  );
}
