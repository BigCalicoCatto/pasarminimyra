"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"klangvalley" | "kuantan">("klangvalley");
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoScrollRef = useRef<number | null>(null);
  const autoScrollPos = useRef(0);

  // Auto-scroll gallery
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const speed = 0.8;
    const step = () => {
      if (!isDragging.current && el) {
        autoScrollPos.current += speed;
        const halfWidth = el.scrollWidth / 2;
        if (autoScrollPos.current >= halfWidth) {
          autoScrollPos.current = 0;
        }
        el.scrollLeft = autoScrollPos.current;
      }
      autoScrollRef.current = requestAnimationFrame(step);
    };
    autoScrollRef.current = requestAnimationFrame(step);
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, []);

  // Drag scroll for gallery
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft ?? 0);
    scrollLeft.current = carouselRef.current?.scrollLeft ?? 0;
    autoScrollPos.current = carouselRef.current?.scrollLeft ?? 0;
  };
  const onMouseLeave = () => { isDragging.current = false; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch scroll for gallery
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    scrollLeft.current = carouselRef.current?.scrollLeft ?? 0;
    autoScrollPos.current = carouselRef.current?.scrollLeft ?? 0;
  };
  const onTouchEnd = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const x = e.touches[0].pageX;
    const walk = (startX.current - x) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft.current + walk;
  };

  const orderUrl =
    "https://form.jotform.com/250492124089457?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0AZ2hwcHBfaWQMMjU2MjgxMDQwNTU4AAGnSV_lQQ5g9zKUhKu3SeDoxGEFsMFzJRizRUbC5_6XiDBfzu7QEOVXUyQp2qU_aem_Hq5Ybk3hz_f5G0kVgjI7Xw";

  const menuItems = [
    { label: "Nak Lagi Tak?", href: "#nak-lagi-tak" },
    { label: "Ada Lagi Tak?", href: "#ada-lagi-tak" },
    { label: "Nak Tahu How Much?", href: "#harga" },
    { label: "Delivery Nak Tak?", href: "#delivery" },
  ];

  const card1Carousel = [
    "productnltinside.webp",
    "productnlti.webp",
    "productnltin.webp",
  ];

  const card2Carousel = [
    "productaltinside.webp",
    "productalti.webp",
    "productaltin.webp",
  ];

  const galleryImages = Array.from({ length: 23 }, (_, i) => `card${i + 1}.webp`);
  const doubledGallery = [...galleryImages, ...galleryImages];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bradley+Hand&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          --yellow: #FFF3B0;
          --yellow-bright: #FFE033;
          --brown-dark: #5C3317;
          --brown-mid: #8B5E3C;
          --brown-light: #C4956A;
          --white: #FFFDF5;
          --baby-blue: #D0E8F2;
          --font: 'Bradley Hand', 'Bradley Hand ITC', cursive;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--yellow);
          font-family: var(--font);
          overflow-x: hidden;
        }

        /* BANNER */
        .banner {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: var(--yellow);
          border-bottom: 3px solid var(--brown-dark);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          gap: 10px;
        }

        .banner-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
        }

        .banner-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .banner-order-btn {
          background-color: var(--yellow-bright);
          color: var(--brown-dark);
          border: 2px solid var(--brown-dark);
          border-radius: 24px;
          padding: 7px 16px;
          font-family: var(--font);
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 2px 2px 0 var(--brown-dark);
          transition: transform 0.1s, box-shadow 0.1s;
        }

        .banner-order-btn:active {
          transform: translate(2px, 2px);
          box-shadow: none;
        }

        .banner-ig {
          color: var(--brown-dark);
          font-size: 22px;
          text-decoration: none;
          transition: color 0.2s;
        }

        .banner-ig:hover {
          color: var(--brown-mid);
        }

        .hamburger {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 24px;
          height: 2.5px;
          background: var(--brown-dark);
          border-radius: 2px;
          transition: all 0.3s;
        }

        /* MOBILE MENU DRAWER */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 200;
          display: flex;
          justify-content: flex-end;
        }

        .drawer {
          background: var(--yellow);
          width: min(300px, 85vw);
          height: 100%;
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-left: 3px solid var(--brown-dark);
          animation: slideIn 0.25s ease;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-close {
          align-self: flex-end;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: var(--brown-dark);
          font-family: var(--font);
          line-height: 1;
        }

        .drawer-item {
          font-family: var(--font);
          font-size: 20px;
          color: var(--brown-dark);
          text-decoration: none;
          font-weight: bold;
          border-bottom: 1px dashed var(--brown-light);
          padding-bottom: 14px;
          display: block;
        }

        .drawer-item:hover {
          color: var(--brown-mid);
        }

        .drawer-order-btn {
          background-color: var(--yellow-bright);
          color: var(--brown-dark);
          border: 2px solid var(--brown-dark);
          border-radius: 24px;
          padding: 12px 20px;
          font-family: var(--font);
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          display: block;
          box-shadow: 2px 2px 0 var(--brown-dark);
          margin-top: 8px;
        }

        /* HERO */
        .hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000;
          line-height: 0;
        }

        .hero-video {
          width: 100%;
          height: 100svh;
          object-fit: cover;
          display: block;
        }

        .hero-arrow {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          animation: bounce 1.6s infinite;
          pointer-events: none;
        }

        .hero-arrow span {
          display: block;
          width: 2px;
          height: 10px;
          background: white;
          border-radius: 2px;
        }

        .hero-arrow-chevron {
          width: 20px;
          height: 20px;
          border-right: 2px solid white;
          border-bottom: 2px solid white;
          transform: rotate(45deg);
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        /* GALLERY */
        .gallery-section {
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .gallery-track {
          display: flex;
          cursor: grab;
          user-select: none;
          overflow: hidden;
          width: 100%;
        }

        .gallery-track:active {
          cursor: grabbing;
        }

        .gallery-card {
          flex-shrink: 0;
          aspect-ratio: 4/5;
          width: calc(100vw / 2.5);
          overflow: hidden;
        }

        @media (min-width: 600px) {
          .gallery-card {
            width: calc(100vw / 4);
          }
        }

        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        .section-title-bold {
          font-family: var(--font);
          color: var(--brown-dark);
          font-size: clamp(36px, 11vw, 60px);
          font-weight: bold;
          padding: 28px 20px 24px;
          text-align: center;
          line-height: 1.1;
        }
        /* SECTIONS */
        .section {
          background: var(--yellow);
        }

        .section-title {
          font-family: var(--font);
          color: var(--brown-dark);
          font-size: clamp(28px, 8vw, 42px);
          font-weight: bold;
          padding: 28px 20px 16px;
          text-align: center;
        }

        .full-img {
          width: 100%;
          display: block;
          line-height: 0;
        }

        .full-img img {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        /* PRODUCT CAROUSELS */
        .product-carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 0;
          scrollbar-width: none;
        }

        .product-carousel::-webkit-scrollbar {
          display: none;
        }

        .product-card {
          flex-shrink: 0;
          scroll-snap-align: start;
          width: 80vw;
          max-width: 320px;
          aspect-ratio: 4/5;
          border: 2.5px solid #7BAEC4;
          overflow: hidden;
        }

        .product-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* DELIVERY */
        .delivery-section {
          background: var(--yellow);
          padding: 0 0 32px;
        }

        .tab-bar {
          display: flex;
          border-bottom: 2.5px solid var(--brown-dark);
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          font-family: var(--font);
          font-size: 17px;
          font-weight: bold;
          color: var(--brown-mid);
          padding: 14px 8px;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
        }

        .tab-btn.active {
          color: var(--brown-dark);
          border-bottom-color: var(--brown-dark);
          background: rgba(255,224,51,0.3);
        }

        .tab-content {
          padding: 20px 20px;
          color: var(--brown-dark);
          font-family: var(--font);
          font-size: 16px;
          line-height: 1.7;
        }

        .delivery-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
          color: var(--brown-dark);
        }

        .delivery-rate-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed var(--brown-light);
          padding: 8px 0;
        }

        .delivery-rate-label {
          color: var(--brown-mid);
        }

        .delivery-rate-price {
          font-weight: bold;
          color: var(--brown-dark);
        }

        .delivery-note {
          margin-top: 14px;
          background: var(--white);
          border-left: 4px solid var(--brown-light);
          border-radius: 0 8px 8px 0;
          padding: 12px 14px;
          font-size: 15px;
        }

        .delivery-slot {
          margin-top: 12px;
          background: var(--baby-blue);
          border-radius: 10px;
          padding: 12px 14px;
        }

        .delivery-slot-title {
          font-weight: bold;
          margin-bottom: 4px;
        }

        /* CTA */
        .cta-section {
          position: relative;
          width: 100%;
          line-height: 0;
        }

        .cta-img {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        .cta-overlay {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 90%;
          text-align: center;
        }

        .cta-btn {
          background: var(--yellow-bright);
          color: var(--brown-dark);
          border: 2.5px solid var(--brown-dark);
          border-radius: 30px;
          padding: 16px 44px;
          font-family: var(--font);
          font-size: 20px;
          font-weight: bold;
          text-decoration: none;
          box-shadow: 3px 3px 0 var(--brown-dark);
          transition: transform 0.1s, box-shadow 0.1s;
          display: inline-block;
          white-space: nowrap;
        }

        .cta-btn:active {
          transform: translate(3px, 3px);
          box-shadow: none;
        }

        .cta-note {
          font-family: var(--font);
          font-size: 16px;
          color: var(--white);
          text-shadow: 1px 1px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8);
          max-width: 300px;
          line-height: 1.6;
          font-weight: bold;
        }

        /* FOOTER */
        .footer {
          background: var(--brown-dark);
          color: var(--yellow);
          font-family: var(--font);
          text-align: center;
          padding: 18px 16px;
          font-size: 15px;
        }
      `}</style>

      {/* FONT AWESOME */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* ===== BANNER ===== */}
      <header className="banner">
        <img src="/icon.webp" alt="Pasar Mini Myra" className="banner-logo" />
        <div className="banner-right">
          <a
            href="https://www.instagram.com/pasarminimyra"
            target="_blank"
            rel="noopener noreferrer"
            className="banner-ig"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>
          <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="banner-order-btn">
            Nakkk Order
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* DRAWER */}
      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="drawer" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="drawer-item"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="drawer-order-btn">
              Nakkk Order 🛒
            </a>
          </nav>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="hero-section">
        <video
          className="hero-video"
          src="https://res.cloudinary.com/dbcghcpes/video/upload/v1771906157/hero_p9xnxp.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="hero-arrow">
          <div className="hero-arrow-chevron" />
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="gallery-section">
        <div
          ref={carouselRef}
          className="gallery-track"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {doubledGallery.map((src, i) => (
            <div key={i} className="gallery-card">
              <img src={`/${src}`} alt="" draggable={false} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== INTRODUCING DUO ===== */}
      <section className="section">
        <h2 className="section-title">Pasar Mini Myra Iconic Duo!</h2>
        <div className="full-img">
          <img src="/productboth.webp" alt="Our favourite duo" />
        </div>
      </section>

      {/* ===== NAK LAGI TAK ===== */}
      <section id="nak-lagi-tak" className="section">
        <h2 className="section-title-bold">Nak Lagi Tak?</h2>
        <div className="full-img">
          <img src="/productnlt.webp" alt="Nak Lagi Tak" />
        </div>
        <div className="product-carousel">
          {card1Carousel.map((src, i) => (
            <div key={i} className="product-card">
              <img src={`/${src}`} alt="" />
            </div>
          ))}
        </div>
      </section>

      {/* ===== ADA LAGI TAK ===== */}
      <section id="ada-lagi-tak" className="section">
        <h2 className="section-title-bold">Ada Lagi Tak?</h2>
        <div className="full-img">
          <img src="/productalt.webp" alt="Ada Lagi Tak" />
        </div>
        <div className="product-carousel">
          {card2Carousel.map((src, i) => (
            <div key={i} className="product-card">
              <img src={`/${src}`} alt="" />
            </div>
          ))}
        </div>
      </section>

      {/* ===== HARGA ===== */}
      <section id="harga" className="section">
        <div className="full-img">
          <img src="/productprice.webp" alt="Harga" />
        </div>
        <div className="full-img">
          <img src="/productprizes.webp" alt="Harga S" />
        </div>
        <div className="full-img">
          <img src="/productprizel.webp" alt="Harga L" />
        </div>
      </section>

      {/* ===== DELIVERY ===== */}
      <section id="delivery" className="delivery-section">
        <h2 className="section-title">Delivery Nak Tak?</h2>
        <div className="tab-bar">
          <button
            className={`tab-btn${activeTab === "klangvalley" ? " active" : ""}`}
            onClick={() => setActiveTab("klangvalley")}
          >
            Klang Valley
          </button>
          <button
            className={`tab-btn${activeTab === "kuantan" ? " active" : ""}`}
            onClick={() => setActiveTab("kuantan")}
          >
            Kuantan
          </button>
        </div>

        {activeTab === "klangvalley" && (
          <div className="tab-content">
            <p className="delivery-title">We&apos;re based in Bukit Tunku 🏡</p>
            <p style={{ marginBottom: 14 }}>Here&apos;s how far we deliver:</p>

            {[
              { range: "Within 10km", price: "MYR 10" },
              { range: "Within 20km", price: "MYR 20" },
              { range: "Within 30km", price: "MYR 30" },
              { range: "Within 40km", price: "MYR 40" },
            ].map((r) => (
              <div key={r.range} className="delivery-rate-row">
                <span className="delivery-rate-label">{r.range}</span>
                <span className="delivery-rate-price">{r.price}</span>
              </div>
            ))}

            <div className="delivery-note">
              <p>All orders are delivered via private courier using a car. 🚗</p>
              <br />
              <p>Since our items are on pre-order, you get to choose your preferred delivery date!</p>
              <br />
              <p>Deliveries are available <strong>twice a week</strong> — place your order and select your date. We&apos;ll reach out to confirm your slot!</p>
            </div>

            <div className="delivery-note" style={{ marginTop: 14, borderLeftColor: "#FFE033", background: "#FFFDF5" }}>
              <p><strong>Heads-up! 🌙</strong></p>
              <br />
              <p>We recommend enjoying our items within 2 weeks of delivery.</p>
              <br />
              <p>If you want them for <strong>Ramadan</strong>, go with Delivery 01 or 02.</p>
              <p>For <strong>Raya</strong>, pick Delivery 03! 🎉</p>
            </div>

            {[
              { title: "Delivery 01", dates: ["Saturday, 28th February", "Sunday, 1st March"] },
              { title: "Delivery 02", dates: ["Saturday, 7th March", "Sunday, 8th March"] },
              { title: "Delivery 03", dates: ["Saturday, 14th March", "Sunday, 15th March"] },
            ].map((slot) => (
              <div key={slot.title} className="delivery-slot">
                <p className="delivery-slot-title">{slot.title}</p>
                {slot.dates.map((d) => (
                  <p key={d} style={{ fontSize: 15 }}>📅 {d}</p>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === "kuantan" && (
          <div className="tab-content">
            <p className="delivery-title">You&apos;re based in Kuantan? You&apos;re in luck! 🎉</p>
            <div className="delivery-note">
              <p>Both <strong>Ada Lagi Tak?</strong> and <strong>Nak Lagi Tak?</strong> are open for orders!</p>
              <br />
              <p>Deliveries will take place throughout Ramadan 🌙</p>
              <br />
              <p>Place your order now &amp; we&apos;ll make sure you&apos;re all set for Raya! 🎊</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <img src="/nakorder.webp" alt="Order now" className="cta-img" />
        <div className="cta-overlay">
          <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="cta-btn">
            Nakk Order 🛒
          </a>
          <p className="cta-note">
            After submitting your order, please note that we will reach out to you via WhatsApp to collect payment and confirm delivery details within 2 working days.
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        Pasar Mini Myra 2026 ✨
      </footer>
    </>
  );
}
