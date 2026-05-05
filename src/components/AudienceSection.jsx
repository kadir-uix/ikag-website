"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PremiumCard from "@/components/PremiumCard";
import SectionBadge from "@/components/SectionBadge";
import { CheckCircle2 } from "lucide-react";

const TABS = [
  {
    id: "explore",
    label: "Explore",
    type: "B2C",
    photo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=85",
    headline: "Land anywhere already connected.",
    body: "Travellers use IKAG to discover where to go, chat through plans, and get trusted help for restaurants, stays, drivers, chefs, and last-minute requests.",
    bullets: [
      "Discover trusted local spots",
      "Chat to plan the trip",
      "Book stays, drivers, and services",
      "Manage every request in one app",
    ],
    metric: "B2C travel app",
    cta: "Join the Waitlist",
  },
  {
    id: "hospitality",
    label: "Hospitality",
    type: "B2B",
    screenshots: [
      "/Screens/Hospitality_Stay.png",
      "/Screens/Hospitality_Chat.png",
    ],
    backgroundPhoto: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=85",
    headline: "A guest experience layer for stays.",
    body: "For Airbnb hosts, serviced apartments, and hotels, IKAG gives guests a simple way to discover, chat, and manage requests without adding pressure to your team.",
    bullets: [
      "Airbnb and hotel guest portal",
      "Pre-arrival and in-stay requests",
      "Concierge-style chat support",
      "Property-level service management",
    ],
    metric: "B2B hospitality solution",
    cta: "Partner with Us",
  },
  {
    id: "community",
    label: "Community",
    type: "B2B",
    screenshots: [
      "/Screens/Community_Map.png",
      "/Screens/Community_Feed.png",
      "/Screens/Community_Events.png",
    ],
    backgroundPhoto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=85",
    headline: "Give your community a private hub.",
    body: "For residential buildings, private members' clubs, and communities, IKAG helps people discover what is available, chat with the right contact, and manage community requests from one place.",
    bullets: [
      "Private community discovery",
      "Member and resident chat",
      "Amenities, events, and requests",
      "Community management tools",
    ],
    metric: "B2B community solution",
    cta: "Explore Community",
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
          <SectionBadge>
            Explore · Hospitality · Community
          </SectionBadge>

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
            For guests.
            <br />
            <em style={{ fontStyle: "italic", color: "#2d3a24" }}>
              For the places they belong.
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
            Discover the city, chat through requests, and manage the property or community experience from one app.
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
                fontFamily: "'Inter Display', 'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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
                {tab.screenshots ? (
                  <div
                    className="audience-screen-collage"
                    aria-label={`IKAG ${tab.label.toLowerCase()} app screens`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "clamp(0.45rem, 1.4vw, 0.9rem)",
                      padding: "2rem 1.4rem",
                      background:
                        tab.backgroundPhoto
                          ? `linear-gradient(rgba(15,13,10,0.58), rgba(15,13,10,0.8)), radial-gradient(ellipse at 50% 45%, rgba(108,117,7,0.24) 0%, rgba(15,13,10,0.1) 68%), url(${tab.backgroundPhoto}) center / cover`
                          : "radial-gradient(ellipse at 50% 45%, rgba(108,117,7,0.28) 0%, rgba(15,13,10,0.94) 68%)",
                    }}
                  >
                    {tab.screenshots.map((screen, index) => {
                      const hasThreeScreens = tab.screenshots.length === 3;

                      return (
                        <img
                          key={screen}
                          className="audience-screen-image"
                          src={screen}
                          alt=""
                          aria-hidden="true"
                          style={{
                            width: hasThreeScreens
                              ? index === 1 ? "32%" : "28%"
                              : index === 0 ? "36%" : "34%",
                            maxWidth: hasThreeScreens ? "150px" : "172px",
                            height: "auto",
                            objectFit: "contain",
                            borderRadius: "18px",
                            boxShadow: "0 18px 46px rgba(0,0,0,0.45)",
                            border: "1px solid rgba(255,255,255,0.14)",
                            transform: hasThreeScreens
                              ? index === 0
                                ? "translateY(1.2rem) rotate(-5deg)"
                                : index === 2
                                  ? "translateY(1.2rem) rotate(5deg)"
                                  : "translateY(-0.35rem)"
                              : index === 0
                                ? "translateY(0.7rem) rotate(-5deg)"
                                : "translateY(-0.35rem) rotate(5deg)",
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
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
                )}
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
                  className="audience-image-labels"
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
                    textIndent: "0.16em",
                    lineHeight: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.82)",
                    fontWeight: 500,
                    background: "rgba(15,13,10,0.56)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    borderRadius: "9999px",
                    padding: "calc(0.24rem + 2px) 0.56rem",
                    backdropFilter: "blur(10px)",
                  }}>
                    {tab.label}
                  </span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.55rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    textIndent: "0.12em",
                    lineHeight: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: tab.type === "B2B" ? "rgba(245,248,238,0.95)" : "rgba(255,255,255,0.86)",
                    background: tab.type === "B2B" ? "rgba(108,117,7,0.72)" : "rgba(15,13,10,0.56)",
                    padding: "calc(0.24rem + 2px) 0.56rem",
                    borderRadius: "9999px",
                    border: `1px solid ${tab.type === "B2B" ? "rgba(232,237,224,0.34)" : "rgba(255,255,255,0.16)"}`,
                    backdropFilter: "blur(10px)",
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
                  <div
                    className="audience-metric-pill"
                    style={{
                      alignSelf: "flex-start",
                      border: "1px solid rgba(108,117,7,0.45)",
                      borderRadius: "9999px",
                      padding: "0.42rem 0.72rem",
                      color: "rgba(232,237,224,0.82)",
                      background: "rgba(108,117,7,0.14)",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tab.metric}
                  </div>
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
        .audience-screen-image {
          max-height: calc(100% - 4rem);
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
            width: max-content;
            max-width: 100%;
            overflow-x: auto;
            justify-content: flex-start;
            border-radius: 18px !important;
            margin-bottom: 1.5rem !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding: 4px !important;
            scrollbar-width: none;
          }
          .audience-tabs::-webkit-scrollbar {
            display: none;
          }
          .audience-tabs button {
            flex: 0 0 auto;
            white-space: nowrap;
            padding: 0.52rem 1rem !important;
            border-radius: 14px !important;
            font-size: 0.78rem !important;
          }
          .audience-photo-side {
            flex: 0 0 100% !important;
            min-height: 230px !important;
            max-height: 255px !important;
          }
          .audience-screen-collage {
            padding: 1.35rem 1rem !important;
          }
          .audience-screen-image {
            width: auto !important;
            max-width: 31% !important;
            max-height: calc(100% - 2.2rem) !important;
          }
          .audience-screen-collage .audience-screen-image:nth-child(2) {
            max-width: 34% !important;
          }
          .audience-image-labels {
            top: 1rem !important;
            left: 1rem !important;
            gap: 0.4rem !important;
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
          .audience-metric-pill {
            font-size: 0.55rem !important;
            line-height: 1.35 !important;
            max-width: 100%;
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
          .audience-screen-image {
            max-height: calc(100% - 1.8rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
