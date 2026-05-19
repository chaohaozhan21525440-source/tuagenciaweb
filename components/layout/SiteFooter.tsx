import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path, sectionPath } from "@/lib/i18n";

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);
const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M18.5 18.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["footer"];
}) {
  const phoneHref = `tel:${dict.contactInfo.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${dict.contactInfo.email}`;

  return (
    <footer className="site-footer" aria-label={dict.regionLabel}>
      <div className="map-wrap">
        <iframe
          src="https://www.google.com/maps?q=Calle%20Pelai%2046%2008001%20Barcelona&t=&z=15&ie=UTF8&iwloc=&output=embed"
          title={dict.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map"
          allowFullScreen
        />
        <a
          className="map-card"
          href="https://www.google.com/maps/place/Carrer+de+Pelai,+46,+08001+Barcelona"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="map-card-ico"><MapPinIcon /></span>
          <span className="map-card-text">
            <strong>{dict.mapBadge}</strong>
            <span>{dict.contactInfo.address}</span>
          </span>
          <span className="map-card-arrow"><ArrowUpRight /></span>
        </a>
      </div>

      <div className="dark-band">
        <div className="container-sf">
          <div className="grid">
            <div className="col col-info">
              <Link href={path("home", locale)} className="brand" aria-label="Tuagenciaweb">
                <Image
                  src="/logo/logo-design.svg"
                  alt="tuagenciaweb"
                  width={907}
                  height={535}
                  className="logo-img"
                />
              </Link>
              <p className="tagline">{dict.tagline}</p>
              <ul className="contact-list">
                <li>
                  <span className="ico"><PhoneIcon /></span>
                  <a href={phoneHref}>{dict.contactInfo.phone}</a>
                </li>
                <li>
                  <span className="ico"><MapPinIcon /></span>
                  <span>{dict.contactInfo.address}</span>
                </li>
                <li>
                  <span className="ico"><MailIcon /></span>
                  <a href={mailHref}>{dict.contactInfo.email}</a>
                </li>
              </ul>
            </div>

            <div className="col">
              <h3>{dict.services.title}</h3>
              <ul className="col-links">
                {dict.services.items.map((label) => (
                  <li key={label}>
                    <a href={sectionPath("home", locale, "services")}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col">
              <h3>{dict.resources.title}</h3>
              <ul className="col-links">
                <li><a href={sectionPath("home", locale, "faq")}>{dict.resources.faq}</a></li>
                <li><a href={sectionPath("home", locale, "projects")}>{dict.resources.projects}</a></li>
                <li><a href={path("blog", locale)}>{dict.resources.blog}</a></li>
              </ul>
            </div>

            <div className="col">
              <h3>{dict.company.title}</h3>
              <ul className="col-links">
                <li><a href={path("about", locale)}>{dict.company.about}</a></li>
                <li><a href={path("contact", locale)}>{dict.company.contact}</a></li>
              </ul>

              <h3 className="social-title">{dict.socialTitle}</h3>
              <div className="social">
                <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                <a href="#" aria-label="X (Twitter)"><XIcon /></a>
              </div>
            </div>
          </div>

          <div className="bottom-bar">
            <span className="copy">{dict.copy}</span>
            <div className="legal-links">
              <a href="#aviso-legal">{dict.legal}</a>
              <a href="#privacidad">{dict.privacy}</a>
              <a href="#cookies">{dict.cookies}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
