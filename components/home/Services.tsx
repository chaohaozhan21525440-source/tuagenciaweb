import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";
import { servicePath, type ServiceId } from "@/lib/services";

type Accent = "blue" | "green" | "purple" | "orange";

const PencilIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 21c2 0 4-1 5-3l9-9-3-3-9 9c-2 1-3 3-3 6Z" />
    <path d="M14 6l4 4" />
    <path d="M17 3l4 4-3 3-4-4Z" />
  </svg>
);
const BagIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 7h14l-1.2 12.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 7Z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);
const SearchIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
const ShieldIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3 5 6v6c0 5 3 8 7 9 4-1 7-4 7-9V6l-7-3Z" />
  </svg>
);
const CheckMark = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 12 10 17 19 7" />
  </svg>
);
const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4Z" />
    <circle cx="8.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const DevicesIllustration = () => (
  <svg width="260" height="220" viewBox="0 0 260 220" fill="none" aria-hidden>
    <g>
      <rect x="70" y="30" width="170" height="120" rx="10" fill="#fff" stroke="#cfd6e6" strokeWidth="1.5" />
      <rect x="80" y="42" width="150" height="36" rx="4" fill="#2f6bff" />
      <rect x="80" y="86" width="68" height="56" rx="4" fill="#eef2fb" />
      <rect x="156" y="86" width="74" height="26" rx="3" fill="#eef2fb" />
      <rect x="156" y="118" width="74" height="24" rx="3" fill="#eef2fb" />
    </g>
    <g>
      <rect x="22" y="62" width="78" height="138" rx="14" fill="#fff" stroke="#cfd6e6" strokeWidth="1.5" />
      <rect x="30" y="74" width="62" height="10" rx="2" fill="#e6ebf5" />
      <rect x="30" y="92" width="62" height="58" rx="6" fill="#eef2fb" />
      <rect x="40" y="118" width="20" height="20" rx="3" fill="#b6c2d6" />
      <path d="M50 118c-4-8 2-14 6-12-2 4-2 8-6 12Z" fill="#16b364" />
      <path d="M50 118c4-6-2-12-6-10 2 4 4 6 6 10Z" fill="#16b364" opacity=".7" />
      <rect x="30" y="158" width="62" height="8" rx="2" fill="#e6ebf5" />
      <rect x="30" y="172" width="42" height="6" rx="2" fill="#e6ebf5" />
      <rect x="30" y="184" width="50" height="6" rx="2" fill="#e6ebf5" />
    </g>
  </svg>
);

const SeoChartIllustration = ({ label, source, rank }: { label: string; source: string; rank: string }) => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none" aria-hidden>
    <rect x="20" y="30" width="200" height="140" rx="14" fill="#fff" stroke="#e3e8f3" strokeWidth="1.5" />
    <text x="38" y="58" fontFamily="inherit" fontSize="13" fontWeight="700" fill="#0b1326">
      {label}
    </text>
    <text x="38" y="76" fontFamily="inherit" fontSize="12" fill="#6b7388">
      {source}
    </text>
    <rect x="166" y="44" width="36" height="22" rx="6" fill="#e6f7ee" />
    <text x="184" y="59" textAnchor="middle" fontFamily="inherit" fontSize="12" fontWeight="700" fill="#16b364">
      {rank}
    </text>
    <defs>
      <linearGradient id="sv-seo-line" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#16b364" stopOpacity=".25" />
        <stop offset="100%" stopColor="#16b364" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M38 142 C 56 138, 64 146, 76 134 S 96 118, 110 120 130 110, 144 96 168 84, 184 74 200 70, 210 64"
      fill="none"
      stroke="#16b364"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38 142 C 56 138, 64 146, 76 134 S 96 118, 110 120 130 110, 144 96 168 84, 184 74 200 70, 210 64 L210 158 38 158 Z"
      fill="url(#sv-seo-line)"
    />
    <line x1="38" y1="158" x2="210" y2="158" stroke="#eef2fb" strokeWidth="1" />
  </svg>
);

const ACCENTS: Accent[] = ["blue", "green", "purple", "orange"];
const ICONS = [PencilIcon, BagIcon, SearchIcon, ShieldIcon];

export function Services({ dict, locale }: { dict: Dict["services"]; locale: Locale }) {
  return (
    <section id="servicios" className="services-section">
      <div className="container-s">
        <div className="section-head">
          <span className="badge">
            <span className="dot" /> {dict.pill}
          </span>
          <h2 className="section-title">
            {dict.h2Top}
            <br />
            <span className="alt">{dict.h2Accent}</span>
          </h2>
          <p className="section-sub">{dict.sub}</p>
        </div>

        <div className="grid">
          {dict.items.map((s, i) => {
            const accent = ACCENTS[i] ?? "blue";
            const Icon = ICONS[i] ?? PencilIcon;
            return (
              <Link
                key={s.id}
                href={servicePath(s.id as ServiceId, locale)}
                className="card"
              >
                <div className="body">
                  <div className="top">
                    <span className={`ico ${accent}`} aria-hidden>
                      <Icon />
                    </span>
                    <div>
                      <h3>{s.title}</h3>
                      <p className="lead">{s.body}</p>
                    </div>
                  </div>
                  <div className="rule" />
                  <ul className="checks">
                    {s.bullets.map((b) => (
                      <li key={b}>
                        <span className={`check ${accent}`}>
                          <CheckMark />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`illu ${accent}`} aria-hidden>
                  <div className="halo" />
                  {i === 0 && <DevicesIllustration />}
                  {i === 1 && (
                    <Image
                      src="/services/basket.png"
                      alt=""
                      width={260}
                      height={240}
                      className="illu-img"
                    />
                  )}
                  {i === 2 && (
                    <SeoChartIllustration
                      label={dict.seoRank.label}
                      source={dict.seoRank.source}
                      rank={dict.seoRank.rank}
                    />
                  )}
                  {i === 3 && (
                    <Image
                      src="/services/shield.png"
                      alt=""
                      width={260}
                      height={240}
                      className="illu-img"
                    />
                  )}
                </div>
                <span className="card-arrow" aria-hidden>
                  <ArrowRight />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="cta-bar">
          <div className="chat" aria-hidden>
            <ChatIcon />
          </div>
          <div className="copy">
            <strong>{dict.cta.leadBold}</strong>
            <span>{dict.cta.lead}</span>
          </div>
          <Link href={path("contact", locale)} className="btn">
            {dict.cta.button}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
