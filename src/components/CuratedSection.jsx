"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MapPin,
  Calendar,
  MessageSquare,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CuratedSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      sectionRef.current
        .querySelectorAll(".reveal-trigger")
        .forEach((trigger) => {
          gsap.to(trigger.querySelectorAll(".word-inner"), {
            y: "0%",
            duration: 0.85,
            stagger: 0.055,
            ease: "power3.out",
            scrollTrigger: {
              trigger,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

      // Fade in the whole grid
      gsap.from(".curated-grid", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".curated-grid", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="curated-section relative w-full overflow-hidden"
      style={{
        width: '100%',
        backgroundColor: 'var(--bg)',
        paddingTop: '8rem',
        paddingBottom: '10rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Light Atmospheric Background */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 40%, var(--bg) 100%)" }} />
      </div>

      {/* Diagonal texture scoped to section */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(15,13,10,0.016) 10px, rgba(15,13,10,0.016) 11px)",
        }}
      />

      <div
        className="relative w-full px-6 md:px-10"
        style={{
          width: '100%',
          maxWidth: "1300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {/* ── Centered header ── */}
        <div
          className="flex flex-col items-center gap-4"
          style={{ textAlign: "center", width: "100%", marginBottom: "3.5rem" }}
        >
          <Badge
            variant="outline"
            className="rounded-full text-[0.62rem] tracking-[0.16em] uppercase px-3 py-1 border-[#2d3a24]/35 text-[#2d3a24] w-fit"
            style={{ margin: "0 auto" }}
          >
            What We Offer
          </Badge>
          <h2
            className="text-[#0f0d0a] max-w-2xl leading-[1.06] px-4"
            style={{
              fontFamily: "'Host Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 8vw, 3.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            Your world,
            <br />
            <em style={{ fontStyle: "italic", color: "#2d3a24" }}>
              on demand.
            </em>
          </h2>
          <p
            className="text-[#0f0d0a]/50 max-w-md normal-case tracking-normal leading-relaxed px-4"
            style={{
              fontFamily: "'Host Grotesk', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 400,
              margin: "0 auto",
            }}
          >
            Everything from a private dining table to a last-minute villa —
            handled by your AI concierge.
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="relative curated-grid w-full px-4 md:px-0">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full"
            style={{
              minHeight: "unset",
            }}
          >
            {/* ══ Col 1 ══ */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                height: "100%",
              }}
            >
              {/* Intro card — luxury villa */}
              <PremiumCard
                className="group relative overflow-hidden"
                style={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "#0f0d0a",
                }}
              >
                {/* Background photo */}
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85"
                  alt="Luxury villa pool"
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    zIndex: 0, opacity: 0.75,
                    transition: "transform 1.8s ease",
                  }}
                  className="group-hover:scale-[1.05]"
                />
                <div style={{
                  position: "absolute", inset: 0, zIndex: 1,
                  background: "linear-gradient(to bottom, rgba(15,13,10,0.5) 0%, rgba(15,13,10,0.05) 40%, rgba(15,13,10,0.8) 100%)",
                }} />

                <div className="relative z-20" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "2.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                    <MapPin size={12} />
                    <span>Concierge</span>
                  </div>
                  <div>
                    <h3
                      className="reveal-trigger"
                      style={{
                        fontFamily: "'Host Grotesk', sans-serif",
                        fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                        fontWeight: 600,
                        color: "#fff",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        marginBottom: "0.75rem",
                        maxWidth: 240,
                      }}
                    >
                      {mask("Curated journeys for the modern explorer.")}
                    </h3>
                    <p style={{ fontFamily: "'Host Grotesk', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 220 }}>
                      Handpicked villas, hotels and hideaways.
                    </p>
                  </div>
                </div>
              </PremiumCard>

              {/* Gold CTA card */}
              <PremiumCard
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  flex: 1,
                  background:
                    "linear-gradient(135deg, #2d3a24 0%, #6C7507 100%)",
                }}
              >
                <div
                  className="p-7 md:p-8 relative z-10"
                  style={{
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div
                    className="flex justify-between items-start"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-[0.68rem] uppercase tracking-widest font-semibold text-white/60"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Calendar size={13} />
                      <span>Early Access</span>
                    </div>
                    <button
                      type="button"
                      aria-label="Request your invitation"
                      className="w-9 h-9 rounded-full border border-white/25 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#2d3a24]"
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "9999px",
                        border: "1px solid rgba(255,255,255,0.25)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div
                    className="flex flex-col gap-1"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                    }}
                  >
                    <h3
                      className="text-xl font-semibold text-white"
                      style={{
                        fontFamily: "'Host Grotesk', sans-serif",
                        letterSpacing: "-0.02em",
                        fontSize: "1.25rem",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      Request your invitation
                    </h3>
                    <p
                      className="text-sm font-normal text-white/55 normal-case tracking-normal"
                      style={{
                        fontFamily: "'Host Grotesk', sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      Limited early access
                    </p>
                  </div>
                </div>
                {/* Subtle radial glow */}
                <div
                  className="absolute inset-0 z-0 opacity-30"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    opacity: 0.3,
                    background:
                      "radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 60%)",
                  }}
                />
              </PremiumCard>
            </div>

            {/* ══ Col 2 ══ */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                height: "100%",
              }}
            >
              {/* Quote card */}
              <PremiumCard
                className="group relative overflow-hidden"
                style={{ flex: 1.7, background: "#0f0d0a" }}
              >
                <div
                  className="absolute inset-0 z-0 opacity-20"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    opacity: 0.2,
                    background:
                      "radial-gradient(ellipse at 30% 80%, #2d3a24 0%, transparent 60%)",
                  }}
                />
                <div
                  className="p-7 md:p-9 relative z-10"
                  style={{
                    padding: "2.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div
                    className="flex flex-col gap-6"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    {/* Quote mark */}
                    <span
                      style={{
                        fontFamily: "serif",
                        fontSize: "3.5rem",
                        lineHeight: 0.8,
                        color: "#2d3a24",
                        opacity: 0.6,
                      }}
                    >
                      "
                    </span>
                    <p
                      className="text-base md:text-lg leading-relaxed font-normal text-white/80 normal-case"
                      style={{
                        fontFamily: "'Host Grotesk', sans-serif",
                        letterSpacing: 0,
                        fontSize: "1.125rem",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      IKAG found me a private chef, a last-minute villa, and a
                      sunset yacht — all in one conversation. Nothing comes
                      close.
                    </p>
                    <div
                      className="flex items-center gap-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-white/12 bg-[#2d3a24]/25 flex items-center justify-center text-white/55 text-[0.7rem] font-semibold"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          border: "1px solid rgba(255,255,255,0.12)",
                          background: "rgba(45,58,36,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgba(255,255,255,0.55)",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                        }}
                      >
                        SR
                      </div>
                      <p
                        className="text-sm text-white/40 normal-case tracking-normal"
                        style={{
                          fontFamily: "'Host Grotesk', sans-serif",
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        Sofia R. — Dubai
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-white/25 mt-4"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.25)",
                      marginTop: "1rem",
                    }}
                  >
                    <MessageSquare size={12} />
                    <span>Member Notes</span>
                  </div>
                </div>
              </PremiumCard>

              {/* Stat card */}
              <PremiumCard
                className="group relative overflow-hidden"
                style={{ flex: 1.3, background: "#6C7507" }}
              >
                {/* Dot grid */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    opacity: 0.7,
                  }}
                />
                <div
                  className="relative z-10 p-7 md:p-9 h-full"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "2.25rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    className="transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="font-bold leading-none mb-3"
                      style={{
                        fontFamily: "'Host Grotesk', sans-serif",
                        fontSize: "clamp(4.5rem, 8vw, 7rem)",
                        letterSpacing: "-0.04em",
                        color: "#ffffff",
                        fontWeight: 700,
                        marginBottom: "0.75rem",
                      }}
                    >
                      150
                      <span
                        style={{
                          fontSize: "0.45em",
                          color: "rgba(255,255,255,0.6)",
                          opacity: 1,
                        }}
                      >
                        +
                      </span>
                    </div>
                    <p
                      className="text-[0.72rem] uppercase tracking-widest font-medium"
                      style={{
                        fontSize: "0.72rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 500,
                      }}
                    >
                      Global Destinations
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-[#0f0d0a]/30 mt-auto"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.35)",
                      marginTop: "auto",
                    }}
                  >
                    <Compass size={12} />
                    <span>Coverage</span>
                  </div>
                </div>
              </PremiumCard>
            </div>

            {/* ══ Col 3 ══ */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                height: "100%",
              }}
            >
              {/* Top: photo card */}
              <PremiumCard
                className="group relative overflow-hidden"
                style={{ flex: 1.5, background: "#0f0d0a" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85"
                  alt="Luxury hotel"
                  className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-[1.8s] group-hover:scale-[1.06]"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0, opacity: 0.85 }}
                />
                <div className="absolute inset-0 z-10" style={{ position: "absolute", inset: 0, zIndex: 10, background: "linear-gradient(to bottom, rgba(15,13,10,0.7) 0%, rgba(15,13,10,0.1) 35%, rgba(15,13,10,0.75) 100%)" }} />
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ position: "absolute", inset: 0, zIndex: 10, background: "radial-gradient(ellipse at 50% 100%, rgba(108,117,7,0.3) 0%, transparent 70%)" }} />
                <div className="relative z-20 h-full text-white" style={{ position: "relative", zIndex: 20, padding: "2.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", color: "white" }}>
                  <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>The Archive</div>
                  <div>
                    <h3 className="font-semibold text-white mb-3 reveal-trigger" style={{ fontFamily: "'Host Grotesk', sans-serif", fontSize: "clamp(1.4rem, 2vw, 1.9rem)", letterSpacing: "-0.02em", color: "white", fontWeight: 600, marginBottom: "0.75rem" }}>
                      {mask("Untamed Horizons")}
                    </h3>
                    <p style={{ fontFamily: "'Host Grotesk', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, maxWidth: "260px", letterSpacing: 0 }}>
                      Our private collection of secluded destinations, hidden from standard flight paths.
                    </p>
                  </div>
                </div>
              </PremiumCard>

              {/* Bottom: service tag card */}
              <PremiumCard
                style={{ flex: 1, background: "var(--bg, #fefbf4)", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(15,13,10,0.35)", fontFamily: "'DM Mono', monospace" }}>
                  On request
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["Private Chef", "Yacht Charter", "Villa Access", "Personal Driver", "Beauty Clinic"].map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: 2, height: 14, background: "var(--accent, #2d3a24)", borderRadius: 1, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "rgba(15,13,10,0.7)", letterSpacing: "0.04em" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .word-mask { display: inline-flex; overflow: hidden; vertical-align: top; }
        .word-inner { display: inline-block; transform: translateY(110%); will-change: transform; }
        .curated-grid [class*="grid"] > div > div {
          min-height: 260px;
        }
        .curated-grid button:focus-visible {
          outline: 2px solid rgba(255,255,255,0.75);
          outline-offset: 3px;
        }
        @media (max-width: 768px) {
          .curated-section {
            padding-top: 5rem !important;
            padding-bottom: 5.5rem !important;
          }
          .curated-section > div:nth-child(3) {
            padding-left: 1.1rem !important;
            padding-right: 1.1rem !important;
          }
          .curated-section h2 {
            font-size: clamp(2.35rem, 10vw, 3.1rem) !important;
            max-width: 10ch !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .curated-section h2 + p,
          .curated-section p {
            overflow-wrap: break-word;
          }
          .curated-grid {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .curated-grid [class*="grid"] > div > div {
            min-height: 240px;
          }
          .curated-grid [class*="grid"] > div {
            gap: 12px !important;
          }
          .curated-grid [class*="grid"] > div > div > div,
          .curated-grid [class*="grid"] > div > div[style] {
            border-radius: 14px !important;
          }
          .curated-grid h3 {
            max-width: 100% !important;
          }
        }
        @media (max-width: 390px) {
          .curated-grid [class*="grid"] > div > div {
            min-height: 220px;
          }
          .curated-grid [style*="2.25rem"],
          .curated-grid [style*="2rem"] {
            padding: 1.45rem !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Helpers ───────────────────────────────── */

function mask(text) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="word-mask">
      <span className="word-inner">{word}&nbsp;</span>
    </span>
  ));
}

function Bracket({ pos }) {
  const base = {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "rgba(15,13,10,0.3)",
    opacity: 0.55,
    pointerEvents: "none",
    zIndex: 30,
  };
  const map = {
    tl: { top: -1, left: -1, borderTop: "1px solid", borderLeft: "1px solid" },
    tr: {
      top: -1,
      right: -1,
      borderTop: "1px solid",
      borderRight: "1px solid",
    },
    bl: {
      bottom: -1,
      left: -1,
      borderBottom: "1px solid",
      borderLeft: "1px solid",
    },
    br: {
      bottom: -1,
      right: -1,
      borderBottom: "1px solid",
      borderRight: "1px solid",
    },
  };
  return <div style={{ ...base, ...map[pos] }} />;
}

function PremiumCard({ children, className = "", style = {} }) {
  return (
    <div
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
