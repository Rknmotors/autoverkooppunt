import OfferCard from './OfferCard';
import Reveal from './Reveal';
import { Check } from './icons';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap grid">
        <div>
          <p className="eyebrow">Auto verkopen in België</p>
          <h1><span className="ln"><span>Verkoop je auto</span></span><span className="ln"><span><span className="hl">snel</span> en zonder</span></span><span className="ln"><span>zorgen<span className="dot">.</span></span></span></h1>
          <ul className="promise">
            <li><span className="ic"><Check width={2.8} /></span>Gratis en vrijblijvend</li>
            <li><span className="ic"><svg viewBox="0 0 24 24" {...s}><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg></span>Wij komen naar jou</li>
            <li><span className="ic"><svg viewBox="0 0 24 24" {...s}><rect x="5" y="3.5" width="14" height="18" rx="2" /><path d="M9 3.5h6v3H9zM9.5 12.5l5 5M14.5 12.5l-5 5" /></svg></span>Geen keuring nodig</li>
            <li><span className="ic"><svg viewBox="0 0 24 24" {...s}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></svg></span>Niet meer poetsen</li>
            <li><span className="ic"><svg viewBox="0 0 24 24" {...s}><path d="M12 3v18M7 21h10M4 7h16M4 7l-2.5 6a3 3 0 0 0 5 0zM20 7l-2.5 6a3 3 0 0 0 5 0z" /></svg></span>Correct en eerlijk</li>
            <li><span className="ic"><svg viewBox="0 0 24 24" {...s}><rect x="2.5" y="6" width="19" height="13" rx="2" /><path d="M2.5 10.5h19M6.5 15h3" /></svg></span>Meteen betaald</li>
          </ul>
        </div>
        <OfferCard />
      </div>
      <div className="wrap">
        <Reveal as="figure" className="photo">
          <img src="/img/hero.jpg" alt="Tevreden klanten met de sleutels van hun verkochte wagen" width={1408} height={768} />
          <figcaption className="badge"><span className="bdot"></span><span><b>Binnen 24u verkocht</b></span></figcaption>
        </Reveal>
      </div>
    </section>
  );
}
