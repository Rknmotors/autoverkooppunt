import CurrentYear from './CurrentYear';
import { WhatsAppIcon } from './icons';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WA_URL } from '@/lib/contact';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="grid">
          <div>
            <h4>Contact</h4>
            <div className="cbtns">
              <a className="cbtn" href={`tel:${PHONE_TEL}`}><span className="ci"><svg viewBox="0 0 24 24" {...s}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg></span><span><small>Bel ons</small>{PHONE_DISPLAY}</span></a>
              <a className="cbtn" href={`mailto:${EMAIL}`}><span className="ci"><svg viewBox="0 0 24 24" {...s}><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3 6 9 7 9-7" /></svg></span><span><small>Mail ons</small>{EMAIL}</span></a>
              <a className="cbtn wa-b" href={WA_URL} target="_blank" rel="noopener"><span className="ci"><WhatsAppIcon /></span><span><small>Chat met ons</small>WhatsApp</span></a>
            </div>
          </div>
        </div>
        <div className="legal"><span>© <CurrentYear initial={new Date().getFullYear()} /> Autoverkooppunt</span><span>www.autoverkooppunt.be</span></div>
      </div>
    </footer>
  );
}
