'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { ArrowLeft, ArrowRight, GoogleG } from './icons';

export type Review = { quote: string; name: string; source: 'google' | string };

/** Reviews-carrousel: zelfde gedrag als het origineel (auto-door om de 5 s, pauze bij hover/focus/touch). */
export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [cur, setCur] = useState(0);
  const curRef = useRef(0);
  const timer = useRef<number | null>(null);
  const scrollTimer = useRef<number | null>(null);
  const still = useRef(false);

  const paint = useCallback((i: number) => {
    curRef.current = i;
    setCur(i);
  }, []);

  const go = useCallback(
    (i: number) => {
      const tr = trackRef.current;
      const n = reviews.length;
      i = (i + n) % n;
      paint(i);
      const sl = slideRefs.current[i];
      if (tr && sl) tr.scrollTo({ left: sl.offsetLeft - tr.offsetLeft, behavior: still.current ? 'auto' : 'smooth' });
    },
    [paint, reviews.length],
  );

  const stop = useCallback(() => {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }, []);
  const start = useCallback(() => {
    if (still.current) return;
    stop();
    timer.current = window.setInterval(() => go(curRef.current + 1), 5000);
  }, [go, stop]);
  const restart = useCallback(() => {
    stop();
    start();
  }, [start, stop]);

  useEffect(() => {
    still.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, [start, stop]);

  // Bij handmatig scrollen/swipen de actieve review bijwerken.
  function onScroll() {
    if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      const tr = trackRef.current;
      if (!tr) return;
      const x = tr.scrollLeft;
      let best = 0;
      let bd = 1e9;
      slideRefs.current.forEach((sl, j) => {
        if (!sl) return;
        const d = Math.abs(sl.offsetLeft - tr.offsetLeft - x);
        if (d < bd) {
          bd = d;
          best = j;
        }
      });
      if (x >= tr.scrollWidth - tr.clientWidth - 2 && curRef.current > best) best = curRef.current;
      paint(best);
    }, 90);
  }

  return (
    <Reveal
      className="revcar"
      id="revcar"
      aria-roledescription="carrousel"
      aria-label="Klantenreviews"
      onMouseEnter={stop}
      onMouseLeave={start}
      onFocus={stop}
      onBlur={start}
    >
      <div className="revcar-head">
        <div className="score"><GoogleG large /><b className="num">4,8</b><span className="stars" aria-hidden="true">★★★★★</span><span>op Google</span></div>
        <div className="revcar-nav">
          <button type="button" id="revPrev" aria-label="Vorige review" onClick={() => { go(curRef.current - 1); restart(); }}><ArrowLeft /></button>
          <button type="button" id="revNext" aria-label="Volgende review" onClick={() => { go(curRef.current + 1); restart(); }}><ArrowRight /></button>
        </div>
      </div>
      <div className="revtrack" id="revtrack" ref={trackRef} onScroll={onScroll} onTouchStart={stop}>
        {reviews.map((r, i) => (
          <figure
            key={i}
            className={`rev${i === cur ? ' on' : ''}`}
            aria-roledescription="review"
            aria-label={`${i + 1} van ${reviews.length}`}
            ref={(el) => { slideRefs.current[i] = el; }}
          >
            <div className="stars" role="img" aria-label="5 op 5 sterren">★★★★★</div>
            <blockquote>{r.quote}</blockquote>
            <figcaption>
              <b>{r.name}</b>
              {r.source === 'google' ? <span className="src"><GoogleG />Google-review</span> : <span>{r.source}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="revdots" id="revdots">
        {reviews.map((_, i) => (
          <button key={i} type="button" aria-label={`Toon review ${i + 1}`} aria-current={i === cur ? 'true' : 'false'} onClick={() => { go(i); restart(); }} />
        ))}
      </div>
    </Reveal>
  );
}
