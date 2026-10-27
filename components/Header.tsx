'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#hoe', label: 'Hoe werkt het' },
  { href: '#klanten', label: 'Ervaringen' },
  { href: '#wat', label: 'Wat we kopen' },
  { href: '#waarom', label: 'Waarom AVP' },
  { href: '#faq', label: 'Vragen' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cls = ['nav', solid && 'solid', open && 'open'].filter(Boolean).join(' ');

  return (
    <header className={cls} id="nav">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Autoverkooppunt, naar boven">
          <img src="/img/logo.png" alt="AVP Autoverkooppunt" />
        </a>
        <ul id="navList">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-r">
          <a className="btn btn-green" href="#bod">
            Gratis bod
          </a>
          <button
            className="menu-btn"
            id="menuBtn"
            type="button"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            aria-controls="navList"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
