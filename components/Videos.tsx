'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  { src: '/video/consignatie.mp4', poster: '/video/consignatie.jpg', label: 'Video over verkopen in consignatie bij AVP' },
  { src: '/video/personal-shopping.mp4', poster: '/video/personal-shopping.jpg', label: 'Video over personal shopping bij AVP' },
];

function play(v: HTMLVideoElement) {
  const p = v.play();
  if (p && typeof p.catch === 'function') p.catch(() => {}); // autoplay geweigerd door de browser: poster blijft staan
}

/**
 * De twee video's: spelen gedempt af zodra ze in beeld zijn, pauzeren buiten beeld.
 * Geluid via de knop; er speelt altijd maar één video met geluid.
 */
export default function Videos() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [soundIdx, setSoundIdx] = useState<number | null>(null);

  useEffect(() => {
    const vids = refs.current.filter((v): v is HTMLVideoElement => !!v);
    // "muted" als property zetten: nodig voor autoplay op mobiel.
    vids.forEach((v) => { v.muted = true; });
    if (!('IntersectionObserver' in window)) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          if (!still || !v.muted) play(v);
        } else {
          v.pause();
        }
      }),
      { threshold: 0.35 },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  function toggle(i: number) {
    const v = refs.current[i];
    if (!v) return;
    const on = v.muted; // gedempt → geluid aanzetten
    refs.current.forEach((o, j) => { if (o && j !== i) o.muted = true; });
    v.muted = !on;
    if (on) {
      v.currentTime = 0;
      play(v);
    }
    setSoundIdx(on ? i : null);
  }

  return (
    <>
      {VIDEOS.map((vid, i) => {
        const pressed = soundIdx === i;
        return (
          <article className="vcard" key={vid.src}>
            <div className="vbox">
              <video ref={(el) => { refs.current[i] = el; }} src={vid.src} poster={vid.poster} muted loop playsInline preload="metadata" aria-label={vid.label} />
              <button type="button" className="snd" aria-label={pressed ? 'Geluid uitzetten' : 'Geluid aanzetten'} aria-pressed={pressed} onClick={() => toggle(i)}>
                <svg className="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" /></svg>
                <svg className="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
}
