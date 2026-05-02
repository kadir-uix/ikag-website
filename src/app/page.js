"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function Home() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const navRef       = useRef(null);
  const headerRef    = useRef(null);
  const heroImgRef   = useRef(null);
  const contextRef   = useRef(null);
  const imagesRef    = useRef([]);
  const framesRef    = useRef({ frame: 0 });
  const lenisRef     = useRef(null);
  const [waitlistState, setWaitlistState] = useState({ status: "idle", message: "" });

  gsap.registerPlugin(ScrollTrigger, useGSAP);

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

    if (!email) {
      setWaitlistState({ status: "error", message: "Enter an email first." });
      return;
    }

    setWaitlistState({ status: "loading", message: "Joining..." });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Could not join waitlist.");
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

  // City ticker
  useEffect(() => {
    const cities = [
      "Dubai · London · Bali · New York",
      "Mykonos · Tokyo · Paris · Miami",
      "Maldives · Rome · Ibiza · Singapore",
      "Santorini · Tulum · Marrakech · Seoul",
    ];
    let idx = 0;
    const el = document.querySelector(".launch-text");
    if (!el) return;
    const interval = setInterval(() => {
      el.style.opacity = "0";
      setTimeout(() => {
        idx = (idx + 1) % cities.length;
        el.textContent = cities[idx];
        el.style.opacity = "1";
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

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
    const canvas  = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const setSize = () => {
      const pr = window.devicePixelRatio || 1;
      const vh = window.visualViewport?.height || window.innerHeight;
      canvas.width  = Math.floor(window.innerWidth * pr);
      canvas.height = Math.floor(vh * pr);
      canvas.style.width  = window.innerWidth + "px";
      canvas.style.height = vh + "px";
      context.setTransform(pr, 0, 0, pr, 0, 0);
    };
    setSize();

    const FC = 337;
    const src = (i) => `/frames/frame_${(i + 1).toString().padStart(4, "0")}.jpg`;

    let images = [];
    let left   = FC;
    const loaded = () => { if (!--left) { draw(); boot(); } };

    for (let i = 0; i < FC; i++) {
      const img = new Image();
      img.onload = img.onerror = loaded;
      img.src = src(i);
      images.push(img);
    }
    imagesRef.current = images;

    const draw = () => {
      const cw = window.innerWidth;
      const ch = window.visualViewport?.height || window.innerHeight;
      context.clearRect(0, 0, cw, ch);
      const img = images[framesRef.current.frame];
      if (!img?.complete || !img.naturalWidth) return;
      const ia = img.naturalWidth / img.naturalHeight, ca = cw / ch;
      let dw, dh, dx, dy;
      if (ia > ca) { dh = ch; dw = dh * ia; dx = (cw - dw) / 2; dy = 0; }
      else          { dw = cw; dh = dw / ia; dx = 0; dy = (ch - dh) / 2; }
      context.drawImage(img, dx, dy, dw, dh);
    };

    const boot = () => {
      const ease = gsap.parseEase("power2.inOut");

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
          const phoneTiltX = isMobile ? 52 : 75;
          const phoneTiltY = isMobile ? -22 : -35;
          framesRef.current.frame = Math.round(ease(p) * (FC - 1));
          draw();

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
    };

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { setSize(); draw(); ScrollTrigger.refresh(); }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(resizeTimer); };
  }, { scope: containerRef });

  /* ── Helpers ── */
  const Phone = ({ src, alt, w = 260, h = 530, style = {} }) => (
    <div className="phone" style={{ width: w, height: h, ...style }}>
      <img src={src} alt={alt} />
    </div>
  );

  const BrandBadge = ({ children }) => (
    <Badge
      variant="outline"
      className="rounded-full text-[0.62rem] tracking-[0.14em] uppercase px-5 py-1.5
                 border-[#2d3a24]/30 text-[#2d3a24] bg-[#2d3a24]/[0.08] w-fit font-bold"
    >
      {children}
    </Badge>
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
        <canvas ref={canvasRef} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="header" ref={headerRef}>
            <p className="launch-text">Dubai · London · Bali · New York</p>
            <h1>Know a guy,<br /><em style={{ fontStyle: "italic" }}>everywhere.</em></h1>
            <p className="subtitle">
              One conversation. Private chefs, last-minute villas, hidden
              tables — wherever you land, IKAG already knows someone.
            </p>
            <form className="waitlist-form" onSubmit={handleWaitlistSubmit} data-source="hero">
              <input name="email" type="email" placeholder="Enter your email" aria-label="Email address" autoComplete="email" required />
              <button type="submit" disabled={waitlistState.status === "loading"}>
                {waitlistState.status === "loading" ? "Joining" : "Early Access"}
              </button>
            </form>
            {waitlistState.message && (
              <p className={`waitlist-status ${waitlistState.status}`}>{waitlistState.message}</p>
            )}
            <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "1rem", fontFamily: "'DM Mono', monospace" }}>
              2,400+ members · Dubai · London · New York
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
      <section className="feature-section dark relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Lounge"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0d0a] via-transparent to-[#0f0d0a]" />
        </div>

        <div className="feature-inner relative z-10">
          <div className="feature-copy on-dark">
            <BrandBadge>Your Profile</BrandBadge>
            <h2>Identity first.<br />Every time.</h2>
            <p className="feature-body">
              IKAG learns your preferences from day one. Tell it your tastes
              once — from cuisines to cabin class — and watch every
              recommendation get sharper.
            </p>
            <Button
              variant="outline"
              className="btn-outline-custom"
              onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Create Profile <ArrowRight size={13} className="ml-1.5" />
            </Button>
          </div>

          <div className="feature-phones">
            <Phone src="/Screens/Onboarding_02.png" alt="Onboarding" w={260} h={560} style={{ transform: "rotate(-3deg) translateY(12px)" }} />
            <Phone src="/Screens/Profile.png"       alt="Profile"    w={280} h={600} />
            <Phone src="/Screens/Favourites.png"    alt="Favourites" w={260} h={560} style={{ transform: "rotate(3deg) translateY(12px)" }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ CONCIERGE */}
      <section className="feature-section dark relative overflow-hidden" id="concierge">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0d0a] via-transparent to-[#0f0d0a]" />
        </div>

        <div className="feature-inner reverse relative z-10">
          <div className="feature-copy on-dark">
            <BrandBadge>AI Concierge</BrandBadge>
            <h2>Your wish,<br />instantly fulfilled.</h2>
            <p className="feature-body">
              Talk to IKAG like you'd talk to a trusted local. Book a private
              beauty clinic, reserve a rooftop table, or arrange a driver — all
              from a single conversation.
            </p>
            <Button
              variant="outline"
              className="btn-outline-custom"
              onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Try the Concierge <ArrowRight size={13} className="ml-1.5" />
            </Button>
          </div>

          <div className="feature-phones">
            <Phone src="/Sections/wish-filled.png"    alt="Chat"    w={300} h={640} style={{ transform: "rotate(-6deg) translateY(30px)", zIndex: 1 }} />
            <Phone src="/Sections/wish-filled-02.png" alt="Chat 02" w={330} h={700} style={{ zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ DINING & WELLNESS */}
      <section className="feature-section light relative overflow-hidden" id="explore">
        <div className="feature-inner relative z-10">
          <div className="feature-copy on-warm">
            <BrandBadge>Discover</BrandBadge>
            <h2>Dining & wellness,<br />hand-picked.</h2>
            <p className="feature-body">
              From Michelin-starred restaurants to top-tier beauty clinics,
              IKAG surfaces only the best. Every recommendation is curated for
              the discerning traveler.
            </p>
            <Button
              variant="outline"
              className="btn-outline-custom"
              onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Now <ArrowRight size={13} className="ml-1.5" />
            </Button>
          </div>

          <div className="feature-phones">
            <Phone src="/Screens/Restaurant Inner View.png" alt="Restaurant View" w={240} h={510} style={{ transform: "rotate(3deg) translateY(15px)" }} />
            <Phone src="/Screens/Restaurant.png"           alt="Restaurant"      w={280} h={600} />
            <Phone src="/Screens/Beauty_Clinic.png"        alt="Clinic"          w={240} h={510} style={{ transform: "rotate(-3deg) translateY(15px)" }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ COMMUNITY */}
      <section className="feature-section dark relative overflow-hidden" id="community">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0d0a] via-transparent to-[#0f0d0a]" />
        </div>

        <div className="feature-inner relative z-10">
          <div className="feature-copy on-dark">
            <BrandBadge>Communities</BrandBadge>
            <h2>Travel together,<br />stay connected.</h2>
            <p className="feature-body">
              Join a curated network of like-minded travelers. Share
              discoveries, plan trips together, and get insider tips from
              people who've already been — in the cities you're heading to.
            </p>
            <Button
              variant="outline"
              className="btn-outline-custom"
              onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join the Community <ArrowRight size={13} className="ml-1.5" />
            </Button>
          </div>

          <div className="feature-phones">
            <Phone src="/Screens/Community01.png" alt="Community 01" w={260} h={560} style={{ transform: "rotate(-4deg) translateY(20px)", zIndex: 1 }} />
            <Phone src="/Screens/Community02.png" alt="Community 02" w={280} h={600} style={{ zIndex: 2 }} />
            <Phone src="/Screens/Community03.png" alt="Community 03" w={260} h={560} style={{ transform: "rotate(4deg) translateY(20px)", zIndex: 1 }} />
          </div>
        </div>
      </section>

      <RequestTimelineSection />

      {/* ════════════════════════════════════════════ STAYS */}
      <section className="feature-section dark relative overflow-hidden stays-feature" id="stays">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
            alt="Hotel Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0d0a] via-transparent to-[#0f0d0a]" />
        </div>

        <div className="feature-inner reverse relative z-10">
          <div className="feature-copy on-dark">
            <BrandBadge>My Stays</BrandBadge>
            <h2>Your stay,<br />perfectly managed.</h2>
            <p className="feature-body">
              Real-time itinerary, check-in reminders, and local tips — all in
              one place. IKAG keeps your trip running smoothly so you can focus
              on the experience.
            </p>
            <Button
              variant="outline"
              className="btn-outline-custom"
              onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Manage Stays <ArrowRight size={13} className="ml-1.5" />
            </Button>
          </div>

          <div className="feature-phones">
            <Phone src="/Screens/My_Stay_01.png" alt="Stay 01" w={280} h={600} style={{ transform: "rotate(4deg) translateY(20px)", zIndex: 1 }} />
            <Phone src="/Screens/My_Stay_03.png" alt="Stay 02" w={300} h={640} style={{ zIndex: 2 }} />
            <Phone src="/Screens/My_Stay_05.png" alt="Stay 03" w={280} h={600} style={{ transform: "rotate(-4deg) translateY(20px)", zIndex: 1 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ OUTRO */}
      <section className="outro" id="waitlist">
        <div className="outro-inner">
          <p style={{ color: "var(--accent-olive)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
            The list is short. The world is wide.
          </p>
          <h1>
            Everywhere<br />
            <em>you land.</em>
          </h1>
          <p className="outro-sub">
            Limited early access. Apply now and be first in line.
          </p>
          <form className="waitlist-form" onSubmit={handleWaitlistSubmit} data-source="outro" style={{ maxWidth: 420 }}>
            <input name="email" type="email" placeholder="Enter your email" aria-label="Email address" autoComplete="email" required />
            <button type="submit" className="btn-outro" disabled={waitlistState.status === "loading"}>
              {waitlistState.status === "loading" ? "Joining" : "I want in"}
            </button>
          </form>
          {waitlistState.message && (
            <p className={`waitlist-status ${waitlistState.status}`}>{waitlistState.message}</p>
          )}
          <div style={{ display: "flex", gap: "2rem", opacity: 0.3, marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["Dubai", "London", "Bali", "New York"].map((c) => (
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
              {["Dubai", "London", "Bali", "New York", "Tokyo"].map((city) => (
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
  const options = [
    { title: "Table held", detail: "Omakase counter, 9:45 PM", icon: Utensils },
    { title: "Driver ready", detail: "Hotel pickup in 18 min", icon: Car },
    { title: "Name at door", detail: "Ask for Niko on arrival", icon: KeyRound },
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
              I need dinner in Ibiza tonight. Somewhere hard to get, not touristy.
            </div>
          </div>
          <div className="message-row ikag">
            <div className="agent-avatar">IK</div>
            <div className="message-stack">
              <div className="message-bubble dark">
                Found three fits. Best one has two seats if you can arrive by 9:45.
              </div>
              <div className="resolution-grid">
                {options.map(({ title, detail, icon: Icon }) => (
                  <article className="resolution-card" key={title}>
                    <Icon size={17} />
                    <div>
                      <strong>{title}</strong>
                      <span>{detail}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="simulator-confirm">
            <CheckCircle2 size={16} />
            <span>Plan ready in 04:12</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestTimelineSection() {
  const steps = [
    {
      time: "11:07 PM",
      title: "Ask sent",
      body: "Dinner, driver, and door contact requested from one message.",
      icon: MessageSquare,
    },
    {
      time: "11:14 PM",
      title: "Options filtered",
      body: "Tourist-heavy places removed. Two trusted rooms checked.",
      icon: Sparkles,
    },
    {
      time: "11:31 PM",
      title: "Plan locked",
      body: "Table held, driver assigned, arrival name confirmed.",
      icon: CalendarCheck,
    },
    {
      time: "12:02 AM",
      title: "On arrival",
      body: "Guest walks in with the right name and no friction.",
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
