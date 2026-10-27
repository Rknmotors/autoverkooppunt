'use client';

import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { WA_URL } from '@/lib/contact';

/** Zwevende WhatsApp-knop; wijkt op kleine schermen (≤ 960 px) zolang het formulier in beeld is. */
export default function FloatingWhatsApp() {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const card = document.getElementById('bod');
    if (!card || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => setAway(e.isIntersecting && window.innerWidth <= 960)),
      { threshold: 0.15 },
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <a className={`wa${away ? ' away' : ''}`} href={WA_URL} target="_blank" rel="noopener" aria-label="Chat met ons via WhatsApp">
      <WhatsAppIcon />
    </a>
  );
}
