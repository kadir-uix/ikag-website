"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock3,
  KeyRound,
  MapPin,
  MessageSquare,
  Sparkles,
  Utensils,
} from "lucide-react";
import CuratedSection from "@/components/CuratedSection";
import AudienceSection from "@/components/AudienceSection";
import PhoneMockup from "@/components/PhoneMockup";
import SectionBadge from "@/components/SectionBadge";

const LEDGER_ROWS = [
  ["Food-spots", "Restaurants, cafes, hidden tables", "Selected"],
  ["Adventures", "Desert drives, boats, local escapes", "Selected"],
  ["Shopping", "Concept stores and private retail", "Selected"],
  ["Sports", "Courts, clubs, tickets, trainers", "Selected"],
  ["Luxury", "Premium stays and discreet access", "Optional"],
];

const COMMAND_STEPS = [
  "Parse intent",
  "Check trusted rooms",
  "Hold option",
  "Confirm arrival",
];

const MAP_PINS = [
  ["DIFC", "Rooftop table", "Held tonight", "18%", "34%"],
  ["Marina", "Private driver", "12 min away", "64%", "24%"],
  ["Jumeirah", "Wellness clinic", "Tomorrow 11:30", "48%", "64%"],
  ["Downtown", "Chef tasting", "Members room", "26%", "72%"],
];

const STORY_NOTES = [
  ["Marina", "Driver from Marina to DIFC", "Saved by three members this month."],
  ["Alserkal", "Gallery opening guest list", "Best shot after 7 PM with a local name."],
  ["Palm", "Beach club table that answers fast", "Use when weekend plans move."],
];

const HERO_CITIES = ["Bangkok", "Istanbul", "Dubai", "Singapore", "Phuket", "Bali"];
const HERO_FRAME_COUNT = 337;

const getHeroFrameSrc = (frame) => `/frames/frame_${String(frame).padStart(4, "0")}.jpg`;

const shouldUseHeroFrameScrub = () => {
  if (typeof navigator === "undefined") return false;
  const { userAgent, platform, maxTouchPoints } = navigator;
  return /iPad|iPhone|iPod/.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
};

const STAY_COLUMNS = [
  ["Arrival", ["Mobile check-in completed", "Room 402 assigned", "Luggage held in storage"]],
  ["Room Preferences", ["Hypoallergenic pillows", "High floor requested", "Mini-bar restocked"]],
  ["In-Stay Services", ["Laundry pickup 10:00 AM", "Turndown service at 6:00 PM", "Spa slot confirmed"]],
  ["Departure", ["Express checkout enabled", "Late departure (2 PM)", "Airport transfer briefed"]],
];

const WEB3FORMS_ACCESS_KEY = "c216436b-6c56-4e2f-aad4-9ae69f15dfe6";

function WaitlistForm({
  source,
  label,
  loading,
  onSubmit,
  buttonClassName = "",
  className = "",
  style,
}) {
  return (
    <form
      className={`waitlist-form ${className}`.trim()}
      onSubmit={onSubmit}
      data-source={source}
      style={style}
    >
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        aria-label="Email address"
        autoComplete="email"
        required
      />
      <input
        className="waitlist-company-field"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button type="submit" className={buttonClassName} disabled={loading}>
        {loading ? "Joining" : label}
      </button>
    </form>
  );
}

function WaitlistStatus({ state }) {
  if (!state.message) return null;
  return <p className={`waitlist-status ${state.status}`}>{state.message}</p>;
}

function WaitlistDisclaimer() {
  return (
    <p className="waitlist-disclaimer">
      We will only use your email to send you important updates regarding our official launch.
    </p>
  );
}

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default function Home() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const heroFrameRef = useRef(null);
  const navRef       = useRef(null);
  const headerRef    = useRef(null);
  const heroOverlayRef = useRef(null);
  const heroImgRef   = useRef(null);
  const lenisRef     = useRef(null);
  const [waitlistState, setWaitlistState] = useState({ status: "idle", message: "" });
  const [heroCityIndex, setHeroCityIndex] = useState(0);

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setHeroCityIndex((index) => (index + 1) % HERO_CITIES.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.2 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenisRef.current?.destroy();
  }, []);

  const handleWaitlistSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const source = form.dataset.source || "waitlist";
    const company = String(formData.get("company") || "").trim();

    if (company) {
      form.reset();
      setWaitlistState({ status: "success", message: "You're on the early access list." });
      return;
    }

    if (!email) {
      setWaitlistState({ status: "error", message: "Enter an email first." });
      return;
    }

    setWaitlistState({ status: "loading", message: "Joining..." });

    try {
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", `IKAG waitlist request from ${source}`);
      formData.append("from_name", "IKAG Website");
      formData.append("source", source);
      formData.append("message", `${email} requested IKAG early access from the ${source} form.`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await readJsonResponse(response);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Could not join waitlist.");
      }

      window.localStorage?.setItem("ikag_waitlist_email", email);
      form.reset();
      setWaitlistState({ status: "success", message: "You're on the early access list." });
    } catch (error) {
      setWaitlistState({
        status: "error",
        message: error.message || "Something went wrong. Try again.",
      });
    }
  };

  // Delight effects — magnetic buttons, center phone glow, watermark parallax
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Magnetic buttons
    const btns = document.querySelectorAll(".btn-primary-custom, .outro-inner .btn-outro");
    btns.forEach((btn) => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx * 0.28, y: dy * 0.28, duration: 0.4, ease: "power2.out" });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
    });

    // Center phone glow pulse
    document.querySelectorAll(".feature-phones").forEach((wrap) => {
      const kids = Array.from(wrap.children);
      const center = kids[Math.floor(kids.length / 2)];
      if (!center) return;
      gsap.fromTo(center,
        { boxShadow: "inset 0 0 0px rgba(255,255,255,0)" },
        {
          boxShadow: "inset 0 0 30px rgba(255,255,255,0.14)",
          duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1,
          scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
        }
      );
    });

    // Outro watermark parallax
    const wm = document.querySelector(".outro-watermark");
    if (wm) {
      gsap.to(wm, {
        y: -80, ease: "none",
        scrollTrigger: { trigger: ".outro", start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = gsap.utils.toArray(".concierge-sim-section, .request-timeline-section");
    sections.forEach((section) => {
      gsap.from(section.querySelectorAll(".section-kicker, h2, .concierge-sim-copy > p, .simulator-shell, .timeline-step"), {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });
    });
  }, []);

  useGSAP(() => {
    const video = videoRef.current;
    const heroFrame = heroFrameRef.current;
    const useFrameScrub = shouldUseHeroFrameScrub();
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const ease = gsap.parseEase("power2.inOut");
    let currentFrame = 1;

    const updateVideoTime = (progress) => {
      if (!video?.duration || !Number.isFinite(video.duration)) return;
      video.currentTime = ease(progress) * video.duration;
    };

    const updateHeroFrame = (progress) => {
      if (!heroFrame) return;
      const frame = Math.min(
        HERO_FRAME_COUNT,
        Math.max(1, Math.round(ease(progress) * (HERO_FRAME_COUNT - 1)) + 1)
      );
      if (frame === currentFrame) return;
      currentFrame = frame;
      heroFrame.src = getHeroFrameSrc(frame);
    };

    video?.pause();
    gsap.set(video, { autoAlpha: useFrameScrub ? 0 : 1 });
    gsap.set(heroFrame, { autoAlpha: useFrameScrub ? 1 : 0 });
    if (useFrameScrub) updateHeroFrame(0);

    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: () => mobileQuery.matches ? "+=320%" : "+=500%",
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        const isMobile = mobileQuery.matches;
        const headerDepth = isMobile ? -260 : -500;
        const phoneStartY = isMobile ? 78 : 120;
        const phoneTiltX = isMobile ? 0 : 75;
        const phoneTiltY = isMobile ? 0 : -35;

        if (useFrameScrub) {
          updateHeroFrame(p);
        } else {
          updateVideoTime(p);
        }
        gsap.set(heroOverlayRef.current, { opacity: 1 - p });

        if (p <= 0.5) {
          const hp = p / 0.5;
          let op = 1;
          if (hp >= 0.7) op = 1 - (hp - 0.7) / 0.3;
          gsap.set(headerRef.current, {
            transform: `translate(-50%, -50%) translateZ(${hp * headerDepth}px)`,
            opacity: op,
          });
        } else {
          gsap.set(headerRef.current, { opacity: 0 });
        }

        if (p < 0.45) {
          gsap.set(heroImgRef.current, { y: `${phoneStartY}svh`, rotateX: phoneTiltX, rotateY: phoneTiltY, opacity: 0 });
        } else if (p <= 0.75) {
          const t = (p - 0.45) / 0.3;
          const e = 1 - Math.pow(1 - t, 3);
          gsap.set(heroImgRef.current, {
            y: `${phoneStartY * (1 - e)}svh`,
            rotateX: phoneTiltX * (1 - e),
            rotateY: phoneTiltY * (1 - e),
            opacity: t <= 0.3 ? t / 0.3 : 1,
          });
        } else {
          gsap.set(heroImgRef.current, { y: "0vh", rotateX: 0, rotateY: 0, opacity: 1 });
        }
      },
    });

/* ── Feature sections stagger in ── */
    gsap.utils.toArray(".feature-section").forEach((sec) => {
      gsap.from(sec.querySelectorAll(".feature-copy > *"), {
        y: 80, 
        opacity: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power4.out",
        scrollTrigger: { trigger: sec, start: "top 80%" },
      });
      gsap.from(sec.querySelectorAll(".phone, .g-phone"), {
        y: 150, 
        opacity: 0, 
        duration: 1.5, 
        stagger: 0.2, 
        ease: "power4.out",
        scrollTrigger: { trigger: sec, start: "top 75%" },
      });
    });

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { ScrollTrigger.refresh(); }, 150);
    };
    window.addEventListener("resize", onResize);
    video?.addEventListener("loadedmetadata", ScrollTrigger.refresh);
    return () => {
      window.removeEventListener("resize", onResize);
      video?.removeEventListener("loadedmetadata", ScrollTrigger.refresh);
      clearTimeout(resizeTimer);
    };
  }, { scope: containerRef });

  /* ── Helpers ── */
  const BrandBadge = ({ children }) => (
    <SectionBadge className="border-[#2d3a24]/30 bg-[#2d3a24]/[0.08] font-bold">
      {children}
    </SectionBadge>
  );

  return (
    <div ref={containerRef}>

      {/* ════════════════════════════════════════════ NAV */}
      <nav ref={navRef} className="site-nav" aria-label="Primary navigation">
        <div className="nav-pill">
          <div className="nav-logo-wrap"><a href="#"><img src="/logo-light.svg" alt="IKAG" style={{ height: 22, width: "auto", objectFit: "contain", display: "block" }} /></a></div>
          <div className="nav-links">
            <a href="#concierge">Concierge</a>
            <a href="#explore">Explore</a>
            <a href="#community">Community</a>
            <a href="#stays">Stays</a>
          </div>
          <Button
            className="btn-primary-custom shrink-0"
            onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════ HERO */}
      <section className="hero">
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero-video-scrub.mp4"
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <img
          ref={heroFrameRef}
          className="hero-frame-scroller"
          src={getHeroFrameSrc(1)}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <div className="hero-overlay" ref={heroOverlayRef} />
        <div className="hero-content">
          <div className="header" ref={headerRef}>
            <p className="launch-text">
              {Array.from({ length: 3 }, (_, offset) => HERO_CITIES[(heroCityIndex + offset) % HERO_CITIES.length]).join(" · ")}
            </p>
            <h1>Know a guy,<br /><em style={{ fontStyle: "italic" }}>everywhere.</em></h1>
            <p className="subtitle">
              One conversation. Private chefs, last-minute villas, hidden
              tables. Wherever you land, IKAG already knows someone.
            </p>
            <WaitlistForm
              source="hero"
              label="Notify Me"
              loading={waitlistState.status === "loading"}
              onSubmit={handleWaitlistSubmit}
            />
            <WaitlistDisclaimer />
            <div className="hero-proof-chips" aria-label="IKAG can arrange">
              {["Private tables", "Drivers", "Villas", "Handled in chat"].map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
            <WaitlistStatus state={waitlistState} />
            <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "1rem", fontFamily: "'DM Mono', monospace" }}>
              2,400+ members · Dubai early access
            </p>
          </div>
        </div>
        <div className="hero-img-container">
          <div className="hero-img" ref={heroImgRef}>
            <img src="/Screens/Home.png" alt="IKAG App" />
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <AudienceSection />

      <CuratedSection />

      <ConciergeSimulatorSection />

      {/* ════════════════════════════════════════════ PROFILE / ONBOARDING */}
      <section className="ledger-section">
        <div className="ledger-inner">
          <div className="ledger-copy">
            <BrandBadge>Your Profile</BrandBadge>
            <h2>Identity first.<br />Every time.</h2>
            <p className="feature-body">
              IKAG starts with your taste, not a blank search box. Early access
              members shape the preference layer before the full profile system
              goes live.
            </p>
            <div className="ledger-note">
              <span>Coming through early access</span>
              <strong>Tell IKAG what you care about once. Every request after that gets sharper.</strong>
            </div>
          </div>

          <div className="ledger-board">
            <div className="ledger-phone">
              <div className="ledger-phones">
                <PhoneMockup src="/Screens/Identity_first_01.png" alt="Identity selection 1" width={260} height={560} />
                <PhoneMockup src="/Screens/Identity_first_02.png" alt="Identity selection 2" width={260} height={560} />
              </div>
            </div>
            {LEDGER_ROWS.map(([label, value, meta]) => (
              <article className="ledger-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{meta}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ CONCIERGE */}
      <section className="command-section" id="concierge">
        <div className="command-head">
          <div>
            <BrandBadge>AI Concierge</BrandBadge>
            <h2>Your wish,<br />instantly fulfilled.</h2>
          </div>
          <p>
            Talk to IKAG like a trusted local. It turns loose intent into a
            confirmed plan with names, timings, and next steps.
          </p>
        </div>

        <div className="command-board">
          <article className="command-card request-card">
            <span>Guest request</span>
            <strong>Dinner tonight in Dubai. Hard to get, not touristy. Driver if possible.</strong>
            <small>Received 8:41 PM</small>
          </article>
          <div className="command-path">
            {COMMAND_STEPS.map((step, i) => (
              <div className="command-step" key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <article className="command-card result-card">
            <CheckCircle2 size={18} />
            <span>Ready to approve</span>
            <strong>Omakase counter held at 9:45. Driver can arrive in 18 minutes. Ask for Niko.</strong>
          </article>
          <div className="command-phone">
            <PhoneMockup src="/Sections/wish-filled-02.png" alt="Concierge chat" width={210} height={450} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ DINING & WELLNESS */}
      <section className="map-section" id="explore">
        <div className="map-copy">
          <div>
            <BrandBadge>Discover</BrandBadge>
            <h2>Dining & wellness,<br />hand-picked.</h2>
          </div>
          <p>
            Recommendations are pinned to real context: district, mood, access,
            timing, and what name gets you through the door.
          </p>
        </div>
        <div className="city-map">
          <div className="map-grid" />
          {MAP_PINS.map(([area, title, detail, left, top]) => (
            <article className="map-pin-card" style={{ left, top }} key={title}>
              <MapPin size={13} />
              <span>{area}</span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </article>
          ))}
          <div className="map-phone">
            <PhoneMockup src="/Screens/Onboarding_05.png" alt="Nearby location tailoring" width={210} height={450} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ COMMUNITY */}
      <section className="story-section" id="community">
        <div className="story-head">
          <div>
            <BrandBadge>Communities</BrandBadge>
            <h2>Travel together,<br />stay connected.</h2>
          </div>
          <p>
            Member knowledge becomes usable city context: notes, trusted names,
            last-minute fixes, and places worth skipping.
          </p>
        </div>

        <div className="story-grid">
          <div className="story-content">
            <article className="story-feature">
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1400" alt="Dubai skyline" />
              <div>
                <span>Member note · Dubai</span>
                <strong>“Skip the obvious list. Ask for the back room after 10:30.”</strong>
                <p>IKAG turns scattered member knowledge into useful city context: who answers, what to avoid, and when a place is worth the effort.</p>
              </div>
            </article>
            <div className="story-notes">
              {STORY_NOTES.map(([city, note, detail]) => (
                <article className="story-note" key={city}>
                  <span>{city}</span>
                  <strong>{note}</strong>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="story-phone">
            <PhoneMockup src="/Screens/Restaurant.png" alt="Community feed" width={280} height={600} />
          </div>
        </div>
      </section>

      <RequestTimelineSection />

      {/* ════════════════════════════════════════════ STAYS */}
      <section className="dossier-section" id="stays">
        <div className="dossier-head">
          <div>
            <BrandBadge>My Stays</BrandBadge>
            <h2>Your stay,<br />perfectly managed.</h2>
          </div>
          <p>
            Every stay becomes a live board: what is booked, what is waiting,
            who knows your name, and what happens next.
          </p>
        </div>

        <div className="stay-board">
          {STAY_COLUMNS.map(([column, items]) => (
            <div className="stay-column" key={column}>
              <span>{column}</span>
              {items.map((item) => (
                <article className="stay-task" key={item}>
                  <CheckCircle2 size={14} />
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          ))}
          <div className="stay-phone">
            <div className="stay-phones">
              <PhoneMockup src="/Screens/Your_Stay_perfectly_managed.png" alt="Stay management 1" width={240} height={510} />
              <PhoneMockup src="/Screens/Your_Stay_perfectly_managed_02.png" alt="Stay management 2" width={240} height={510} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ OUTRO */}
      <section className="outro" id="waitlist">
        <div className="outro-inner">
          <p style={{ color: "var(--accent-olive)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
            Request early access
          </p>
          <h1>
            Get the right name<br />
            <em>before you land.</em>
          </h1>
          <p className="outro-sub">
            Join the private beta for travellers, hosts, and hotels who want every stay handled before the ask becomes urgent.
          </p>
          <WaitlistForm
            source="outro"
            label="Notify Me"
            loading={waitlistState.status === "loading"}
            onSubmit={handleWaitlistSubmit}
            className="outro-waitlist-form"
            buttonClassName="btn-outro"
            style={{ maxWidth: 420 }}
          />
          <WaitlistDisclaimer />
          <WaitlistStatus state={waitlistState} />
          <div style={{ display: "flex", gap: "2rem", opacity: 0.3, marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["DIFC", "Marina", "Downtown", "Jumeirah"].map((c) => (
              <span key={c} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#fff", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <MapPin size={9} />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ FOOTER */}
      <footer className="footer-editorial">

        {/* Top rule */}
        <div className="footer-top-rule" />

        {/* Large typographic IKAG wordmark */}
        <div className="footer-wordmark-wrap">
          <img src="/logo-light.svg" alt="IKAG" className="footer-wordmark-logo" />
        </div>

        {/* Mid section: tagline left, nav columns right */}
        <div className="footer-mid">
          <div className="footer-tagline-col">
            <p className="footer-tagline">
              Your AI concierge.<br />
              <em>Everywhere you land.</em>
            </p>
            <div className="footer-cities">
              {["Dubai", "DIFC", "Marina", "Downtown", "Jumeirah"].map((city) => (
                <span key={city} className="footer-city">
                  <MapPin size={9} />
                  {city}
                </span>
              ))}
            </div>
          </div>

          <nav className="footer-nav-cols" aria-label="Footer navigation">
            <div className="footer-nav-col">
              <ul>
                <li><a href="#concierge">Concierge</a></li>
                <li><a href="#explore">Explore</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#stays">Stays</a></li>
                <li><a href="#waitlist">Waitlist</a></li>
              </ul>
            </div>
            <div className="footer-nav-col">
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-nav-col">
              <ul>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Cookies</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <Separator className="footer-separator" />
        <div className="footer-base">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} IKAG. All rights reserved.
          </span>
          <span className="footer-mono-tag">AI Travel Concierge &mdash; Private &amp; Curated</span>
        </div>

      </footer>

    </div>
  );
}

function ConciergeSimulatorSection() {
  const chips = ["Tonight", "Near Marina", "Not touristy", "Driver included"];
  const options = [
    { title: "Option one", detail: "Omakase counter, 9:45 PM", meta: "2 seats held", icon: Utensils },
    { title: "Transfer", detail: "Black car from your hotel", meta: "18 min pickup", icon: Car },
    { title: "Arrival", detail: "Ask for Niko at the side door", meta: "Name confirmed", icon: KeyRound },
  ];

  return (
    <section className="concierge-sim-section" id="simulator">
      <div className="concierge-sim-inner">
        <div className="concierge-sim-copy">
          <div className="section-kicker">Concierge Simulator</div>
          <h2>
            One ask.
            <br />
            <em>Three moves handled.</em>
          </h2>
          <p>
            IKAG turns a loose request into confirmed options, local context,
            and the exact next step.
          </p>
        </div>

        <div className="simulator-shell" aria-label="IKAG concierge request example">
          <div className="simulator-top">
            <span>Live request</span>
            <span className="simulator-status">Resolving</span>
          </div>
          <div className="message-row user">
            <div className="message-bubble">
              I need dinner in Dubai tonight. Somewhere hard to get, not touristy.
            </div>
          </div>
          <div className="simulator-chip-row" aria-label="Concierge filters">
            {chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <div className="message-row ikag">
            <div className="agent-avatar">IK</div>
            <div className="message-stack">
              <div className="message-bubble dark">
                Found the strongest fit. I can hold it for six minutes and pair it with a driver.
              </div>
              <div className="resolution-grid">
                {options.map(({ title, detail, meta, icon: Icon }) => (
                  <article className="resolution-card" key={title}>
                    <Icon size={17} />
                    <div>
                      <strong>{title}</strong>
                      <span>{detail}</span>
                      <small>{meta}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="simulator-confirm">
            <CheckCircle2 size={16} />
            <span>Booking held. Approve to confirm.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestTimelineSection() {
  const steps = [
    {
      time: "00:00",
      title: "Request received",
      body: "Dinner, driver, and door contact captured from one message.",
      icon: MessageSquare,
    },
    {
      time: "04:12",
      title: "Local options checked",
      body: "Tourist-heavy places removed. Trusted rooms and fixers checked.",
      icon: Sparkles,
    },
    {
      time: "07:38",
      title: "Availability confirmed",
      body: "Table held, driver assigned, and arrival contact verified.",
      icon: CalendarCheck,
    },
    {
      time: "09:00",
      title: "You approve",
      body: "One tap confirms the plan and sends the exact arrival notes.",
      icon: Building2,
    },
  ];

  return (
    <section className="request-timeline-section">
      <div className="request-timeline-inner">
        <div className="timeline-head">
          <div className="section-kicker">Request Timeline</div>
          <h2>
            From late ask
            <br />
            <em>to handled night.</em>
          </h2>
        </div>
        <div className="timeline-track">
          {steps.map(({ time, title, body, icon: Icon }) => (
            <article className="timeline-step" key={time}>
              <div className="timeline-time">
                <Clock3 size={13} />
                {time}
              </div>
              <div className="timeline-icon">
                <Icon size={18} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
