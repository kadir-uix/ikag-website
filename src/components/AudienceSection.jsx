"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const TABS = [
  {
    id: "travellers",
    label: "Travellers",
    type: "B2C",
    photo: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1400&q=85",
    headline: "Your city. Unlocked.",
    body: "IKAG is your personal guide to every destination. Skip the tourist traps — get the hidden tables, private clubs, and local fixers that most people never find.",
    bullets: [
      "Private chef access",
      "Curated nightlife & dining",
      "Last-minute villas",
      "One conversation, handled",
    ],
    cta: "Join the Waitlist",
  },
  {
    id: "airbnb",
    label: "Airbnb Hosts",
    type: "B2B",
    photo: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85",
    headline: "Turn your listing into a five-star experience.",
    body: "Offer your guests IKAG as a built-in perk. Restaurants, drivers, chefs — all arranged before they even arrive. Listings with IKAG access command higher rates and better reviews.",
    bullets: [
      "White-label guest portal",
      "Pre-arrival experience curation",
      "Higher booking rates",
      "Zero effort on your end",
    ],
    cta: "Partner with Us",
  },
  {
    id: "hotels",
    label: "Hotels",
    type: "B2B",
    photo: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=85",
    headline: "The concierge desk, reimagined.",
    body: "Give your guests a 24/7 AI concierge that knows the city better than any desk ever could. IKAG integrates with your property to extend your service offering — branded, seamless, and scalable.",
    bullets: [
      "Branded guest-facing integration",
      "Off-property experience layer",
      "Revenue share on bookings",
      "Scalable across properties",
    ],
    cta: "Explore Partnership",
  },
];

export default function AudienceSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Fade in header elements
      gsap.from(".audience-header > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".audience-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade in tab switcher
      gsap.from(".audience-tabs", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".audience-tabs",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade in card
      gsap.from(".audience-card-wrap", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".audience-card-wrap",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  const handleTabSwitch = (index) => {
    if (index === activeTab) return;
    const card = cardRef.current;
    if (!card) {
      setActiveTab(index);
      return;
    }
    gsap.to(card, {
      opacity: 0,
      y: 18,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(index);
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power3.out",
        });
      },
    });
  };

  const tab = TABS[activeTab];

  return (
    <section
      ref={sectionRef}
      className="audience-section"
      style={{
        width: "100%",
        backgroundColor: "var(--bg, #fefbf4)",
        paddingTop: "8rem",
        paddingBottom: "10rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diagonal texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(15,13,10,0.016) 10px, rgba(15,13,10,0.016) 11px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── Section header ── */}
        <div
          className="audience-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
            marginBottom: "3rem",
            width: "100%",
          }}
        >
          <Badge
            variant="outline"
            className="rounded-full text-[0.62rem] tracking-[0.16em] uppercase px-3 py-1 border-[#2d3a24]/35 text-[#2d3a24] w-fit"
            style={{ margin: "0 auto" }}
          >
            B2C · B2B
          </Badge>

          <h2
            style={{
              fontFamily: "'Host Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 7vw, 3.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0f0d0a",
              lineHeight: 1.06,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            For travellers.
            <br />
            <em style={{ fontStyle: "italic", color: "#2d3a24" }}>
              For the places they stay.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'Host Grotesk', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 400,
              color: "rgba(15,13,10,0.5)",
              maxWidth: "460px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            IKAG serves guests directly — and partners with Airbnb hosts and hotels to elevate every stay.
          </p>
        </div>

        {/* ── Tab switcher ── */}
        <div
          className="audience-tabs"
          role="tablist"
          aria-label="Audience type"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            background: "rgba(15,13,10,0.04)",
            borderRadius: "9999px",
            padding: "0.3rem",
            border: "1px solid rgba(45,58,36,0.12)",
          }}
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTab === i}
              aria-controls="audience-panel"
              onClick={() => handleTabSwitch(i)}
              style={{
                fontFamily: "'Host Grotesk', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                padding: "0.55rem 1.4rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.25s ease, color 0.25s ease",
                background: activeTab === i ? "#2d3a24" : "transparent",
                color:
                  activeTab === i ? "#ffffff" : "rgba(15,13,10,0.45)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Card ── */}
        <div className="audience-card-wrap" style={{ width: "100%" }}>
          <div ref={cardRef} style={{ width: "100%" }}>
            <PremiumCard
              id="audience-panel"
              style={{
                background: "#0f0d0a",
                minHeight: "520px",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
              }}
            >
              {/* Photo side */}
              <div
                style={{
                  position: "relative",
                  flex: "0 0 48%",
                  overflow: "hidden",
                  minHeight: "320px",
                }}
                className="audience-photo-side"
              >
                <img
                  src={tab.photo}
                  alt={tab.headline}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    zIndex: 0,
                    opacity: 0.88,
                    transition: "opacity 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background:
                      "linear-gradient(to right, rgba(15,13,10,0.0) 60%, rgba(15,13,10,0.75) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background:
                      "linear-gradient(to bottom, rgba(15,13,10,0.45) 0%, rgba(15,13,10,0.0) 40%, rgba(15,13,10,0.6) 100%)",
                  }}
                />

                {/* Tab label + type watermark on photo */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.75rem",
                    left: "1.75rem",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                  }}>
                    {tab.label}
                  </span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.55rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: tab.type === "B2B" ? "rgba(108,117,7,0.9)" : "rgba(255,255,255,0.35)",
                    background: tab.type === "B2B" ? "rgba(108,117,7,0.18)" : "rgba(255,255,255,0.08)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "9999px",
                    border: `1px solid ${tab.type === "B2B" ? "rgba(108,117,7,0.35)" : "rgba(255,255,255,0.15)"}`,
                  }}>
                    {tab.type}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "2.75rem 2.5rem",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                {/* Radial glow accent */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    background:
                      "radial-gradient(ellipse at 80% 20%, rgba(45,58,36,0.18) 0%, transparent 65%)",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    flex: 1,
                  }}
                >
                  {/* Headline */}
                  <h3
                    style={{
                      fontFamily: "'Host Grotesk', sans-serif",
                      fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "#ffffff",
                      lineHeight: 1.1,
                      maxWidth: "380px",
                    }}
                  >
                    {tab.headline}
                  </h3>

                  {/* Body */}
                  <p
                    style={{
                      fontFamily: "'Host Grotesk', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.7,
                      maxWidth: "400px",
                    }}
                  >
                    {tab.body}
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      width: "2rem",
                      height: "1px",
                      background: "rgba(108,117,7,0.5)",
                    }}
                  />

                  {/* Bullets */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {tab.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          style={{
                            color: "#6C7507",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.78rem",
                            letterSpacing: "0.04em",
                            color: "rgba(255,255,255,0.65)",
                          }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    marginTop: "2.5rem",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      fontFamily: "'Host Grotesk', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                      color: "rgba(255,255,255,0.8)",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "9999px",
                      padding: "0.65rem 1.75rem",
                      cursor: "pointer",
                      transition:
                        "border-color 0.25s ease, color 0.25s ease, background 0.25s ease",
                    }}
                    onClick={() =>
                      document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.55)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.2)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {tab.cta} →
                  </button>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>

      <style>{`
        .audience-tabs button:focus-visible {
          outline: 2px solid rgba(45,58,36,0.55);
          outline-offset: 3px;
        }
        @media (max-width: 768px) {
          .audience-section {
            padding-top: 5rem !important;
            padding-bottom: 5.5rem !important;
          }
          .audience-section > div:nth-child(2) {
            padding-left: 1.1rem !important;
            padding-right: 1.1rem !important;
          }
          .audience-header {
            margin-bottom: 2rem !important;
          }
          .audience-header h2 {
            font-size: clamp(2.35rem, 10vw, 3.1rem) !important;
            max-width: 10ch !important;
          }
          .audience-header p {
            font-size: 0.98rem !important;
            max-width: 22rem !important;
          }
          .audience-tabs {
            width: 100%;
            overflow-x: auto;
            justify-content: flex-start;
            border-radius: 18px !important;
            margin-bottom: 1.5rem !important;
            padding: 0.28rem !important;
            scrollbar-width: none;
          }
          .audience-tabs::-webkit-scrollbar {
            display: none;
          }
          .audience-tabs button {
            flex: 0 0 auto;
            white-space: nowrap;
            padding: 0.52rem 1rem !important;
            font-size: 0.78rem !important;
          }
          .audience-photo-side {
            flex: 0 0 100% !important;
            min-height: 230px !important;
            max-height: 255px !important;
          }
          .audience-card-wrap > div > div {
            flex-direction: column !important;
            min-height: auto !important;
            border-radius: 14px !important;
          }
          .audience-card-wrap > div > div > div:last-child {
            padding: 1.65rem 1.25rem !important;
          }
          .audience-card-wrap h3 {
            font-size: clamp(1.55rem, 7vw, 2rem) !important;
          }
          .audience-card-wrap p {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
          }
          .audience-card-wrap li {
            align-items: flex-start !important;
          }
          .audience-card-wrap li span {
            font-size: 0.72rem !important;
            line-height: 1.45 !important;
          }
          .audience-card-wrap button {
            width: 100%;
            padding: 0.8rem 1rem !important;
            text-align: center;
          }
        }
        @media (max-width: 390px) {
          .audience-tabs button {
            padding-left: 0.82rem !important;
            padding-right: 0.82rem !important;
          }
          .audience-photo-side {
            min-height: 210px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── PremiumCard ── */
function PremiumCard({ children, className = "", style = {}, id }) {
  return (
    <div
      id={id}
      className={className}
      style={{
        position: "relative",
        zIndex: 10,
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Inner shimmer border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
          border: "1px solid transparent",
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%) border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}
