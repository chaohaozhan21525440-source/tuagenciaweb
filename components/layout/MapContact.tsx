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

export function MapContact({
  dict,
  locale,
}: {
  dict: Dict["contactFooter"];
  locale: Locale;
}) {
  return (
    <section className="contact-footer" aria-label={dict.regionLabel}>
      <div className="map-wrap">
        <iframe
          src="https://www.google.com/maps?q=Calle%20Pelai%2048%2008001%20Barcelona&t=&z=15&ie=UTF8&iwloc=&output=embed"
          title={dict.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map"
          allowFullScreen
        />
        <a
          className="map-card"
          href="https://www.google.com/maps/place/Carrer+de+Pelai,+48,+08001+Barcelona"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="map-card-ico"><MapPinIcon /></span>
          <span className="map-card-text">
            <strong>{dict.mapBadge}</strong>
            <span>Calle Pelai 48 · 08001 Barcelona</span>
          </span>
          <span className="map-card-arrow"><ArrowUpRight /></span>
        </a>
      </div>

      <div className="dark-band">
        <div className="container-cf">
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
                  <a href="tel:+34613566027">+34 613 566 027</a>
                </li>
                <li>
                  <span className="ico"><MapPinIcon /></span>
                  <span>
                    Calle Pelai 48
                    <br />
                    08001 Barcelona
                  </span>
                </li>
                <li>
                  <span className="ico"><MailIcon /></span>
                  <a href="mailto:hola@tuagenciaweb.com">hola@tuagenciaweb.com</a>
                </li>
              </ul>
            </div>

            <div className="col">
              <h3>{dict.servicesTitle}</h3>
              <ul className="col-links">
                {dict.servicesLinks.map((label) => (
                  <li key={label}>
                    <a href={sectionPath("home", locale, "services")}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col">
              <h3>{dict.moreTitle}</h3>
              <ul className="col-links">
                <li><a href={sectionPath("home", locale, "projects")}>{dict.moreLinks.projects}</a></li>
                <li><a href={path("about", locale)}>{dict.moreLinks.about}</a></li>
                <li><a href={path("contact", locale)}>{dict.moreLinks.contact}</a></li>
                <li><a href="#blog">{dict.moreLinks.blog}</a></li>
                <li><a href="#aviso-legal">{dict.moreLinks.legal}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
