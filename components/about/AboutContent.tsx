import Image from "next/image";
import type { Dict } from "@/lib/i18n";

export function AboutContent({ dict }: { dict: Dict["about"] }) {
  return (
    <div className="about-page">
      <div className="container-a">
        <section className="a-hero">
          <div>
            <span className="pill">
              <span className="dot" />
              {dict.pill}
            </span>
            <h1 className="headline">
              {dict.h1Pre}
              <span className="accent">{dict.h1Accent}</span>
              {dict.h1Post}
            </h1>
            <p className="lead">{dict.lead}</p>

            <div className="stats">
              {dict.stats.map((s, i) => (
                <div key={i} className="stat">
                  <div className="icon">
                    {i === 0 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
                        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2Z" />
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                      </svg>
                    )}
                    {i === 3 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
                      </svg>
                    )}
                  </div>
                  <h4>{s.title}</h4>
                  <p>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-media">
            <div className="photo">
              <Image
                src="/team/team-group.png"
                alt={dict.teamAlt}
                width={1200}
                height={930}
                className="block h-full w-full object-cover"
                priority
              />
            </div>
            <div className="testimonial">
              <div className="quote-mark">&ldquo;</div>
              <p>{dict.testimonial.body}</p>
              <div className="src">{dict.testimonial.src}</div>
            </div>
          </div>
        </section>

        <section className="ab-space">
          <div className="ab-space-head">
            <span className="pill blue">
              <span className="dot" />
              {dict.space.pill}
            </span>
            <h2 className="ab-space-h2">{dict.space.h2}</h2>
            <p className="ab-space-sub">{dict.space.sub}</p>
          </div>

          <div className="ab-space-grid">
            <div className="ab-space-big">
              <Image
                src="/team/team-office.png"
                alt={dict.space.photoAlts[0]}
                width={1200}
                height={800}
                className="ab-space-img"
              />
            </div>
            <div className="ab-space-col">
              <div className="ab-space-small">
                <Image
                  src="/team/team-hoodie.png"
                  alt={dict.space.photoAlts[1]}
                  width={800}
                  height={520}
                  className="ab-space-img"
                />
              </div>
              <div className="ab-space-small">
                <Image
                  src="/team/team-working.png"
                  alt={dict.space.photoAlts[2]}
                  width={800}
                  height={520}
                  className="ab-space-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="vm-card">
          <div>
            <span className="pill blue">
              <span className="dot" />
              {dict.valuesPill}
            </span>
            <ul className="values-list">
              {dict.values.map((v, i) => (
                <li key={i}>
                  <div className="v-ico">
                    {i === 0 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z" />
                      </svg>
                    )}
                    {i === 3 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mission">
            <div className="copy">
              <span className="pill blue">
                <span className="dot" />
                {dict.missionPill}
              </span>
              <h2>
                {dict.missionH2Pre}
                <span className="accent">{dict.missionH2Accent1}</span>
                {dict.missionH2Mid}
                <span className="accent">{dict.missionH2Accent2}</span>
                {dict.missionH2Post}
              </h2>
              <p>{dict.missionBody}</p>
            </div>
          </div>
        </section>

        <div className="footroom" />
      </div>
    </div>
  );
}
