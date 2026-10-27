'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check } from './icons';
import { PHONE_DISPLAY, PHONE_TEL, WA_URL } from '@/lib/contact';

const FUELS = ['Benzine', 'Diesel', 'Hybride', 'Elektrisch', 'LPG / CNG'];
const POSTCODE_EXAMPLES = ['bv. 2000 Antwerpen', 'bv. 1000 Brussel', 'bv. 9000 Gent'];

type Values = { merk: string; jaar: string; km: string; brandstof: string; naam: string; tel: string; postcode: string };
const EMPTY: Values = { merk: '', jaar: '', km: '', brandstof: FUELS[0], naam: '', tel: '', postcode: '' };

/** Zelfde berichtopbouw als het originele script. encodeURIComponent zorgt voor correcte speciale tekens. */
export function buildWhatsAppMessage(v: Values) {
  const t = (s: string) => s.trim();
  return (
    'Hallo AVP, ik wil graag een bod op mijn wagen.\n' +
    '\nMerk/model: ' + t(v.merk) +
    '\nBouwjaar: ' + (t(v.jaar) || '-') +
    '\nKm-stand: ' + (t(v.km) || '-') +
    '\nBrandstof: ' + t(v.brandstof) +
    '\n\nNaam: ' + t(v.naam) +
    '\nTelefoon: ' + t(v.tel) +
    '\nPostcode: ' + (t(v.postcode) || '-')
  );
}

export function validate(v: Values) {
  const miss: string[] = [];
  if (!v.merk.trim()) miss.push('merk en model');
  if (!v.naam.trim()) miss.push('naam');
  if (v.tel.trim().replace(/\D/g, '').length < 9) miss.push('een geldig telefoonnummer');
  return miss.length ? `Vul nog ${miss.join(', ')} in.` : null;
}

export default function OfferCard() {
  const [v, setV] = useState<Values>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [waHref, setWaHref] = useState(WA_URL);
  const [firstName, setFirstName] = useState('');
  const [pcIndex, setPcIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const pcRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLElement>(null);
  const scrollAfterSubmit = useRef(false);

  // Postcodevoorbeeld wisselt tussen Antwerpen, Brussel en Gent (niet tijdens typen).
  useEffect(() => {
    const id = window.setInterval(() => {
      const pc = pcRef.current;
      if (!pc || document.activeElement === pc || pc.value) return;
      setPcIndex((i) => (i + 1) % POSTCODE_EXAMPLES.length);
    }, 2500);
    return () => window.clearInterval(id);
  }, []);

  // Na verzenden: bevestiging centraal in beeld schuiven (zoals het origineel).
  useEffect(() => {
    if (done && scrollAfterSubmit.current) {
      scrollAfterSubmit.current = false;
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [done]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));

  function onKm(e: { target: { value: string } }) {
    const d = e.target.value.replace(/\D/g, '');
    setV((p) => ({ ...p, km: d ? Number(d).toLocaleString('nl-BE') : '' }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = validate(v);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    setWaHref(`${WA_URL}?text=${encodeURIComponent(buildWhatsAppMessage(v))}`);
    setFirstName(v.naam.trim().split(' ')[0]);
    scrollAfterSubmit.current = true;
    setDone(true);
  }

  function copy() {
    const selectNumber = () => {
      const el = phoneRef.current;
      const sel = window.getSelection();
      if (!el || !sel) return;
      const r = document.createRange();
      r.selectNodeContents(el);
      sel.removeAllRanges();
      sel.addRange(r);
    };
    try {
      navigator.clipboard.writeText(PHONE_TEL).then(() => setCopied(true), selectNumber);
    } catch {
      selectNumber();
    }
  }

  return (
    <div className="card" id="bod" ref={cardRef}>
      <form id="form" noValidate onSubmit={onSubmit} hidden={done}>
        <div className="card-head"><h2>Ontvang je bod</h2><span>± 2 minuten</span></div>
        <div className="fields">
          <div className="row2">
            <div className="field"><label htmlFor="merk">Merk en model</label><input id="merk" name="merk" placeholder="bv. VW Golf" required value={v.merk} onChange={set('merk')} /></div>
            <div className="field"><label htmlFor="jaar">Bouwjaar</label><input id="jaar" name="jaar" inputMode="numeric" placeholder="bv. 2017" maxLength={4} value={v.jaar} onChange={set('jaar')} /></div>
          </div>
          <div className="row2">
            <div className="field"><label htmlFor="km">Kilometerstand</label><input id="km" name="km" inputMode="numeric" placeholder="bv. 120 000" value={v.km} onChange={onKm} /></div>
            <div className="field"><label htmlFor="brandstof">Brandstof</label>
              <select id="brandstof" name="brandstof" value={v.brandstof} onChange={set('brandstof')}>
                {FUELS.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <p className="step-label">Jouw gegevens</p>
          <div className="row2">
            <div className="field"><label htmlFor="naam">Naam</label><input id="naam" name="naam" autoComplete="name" placeholder="Voor- en achternaam" required value={v.naam} onChange={set('naam')} /></div>
            <div className="field"><label htmlFor="tel">Telefoon</label><input id="tel" name="tel" type="tel" autoComplete="tel" placeholder="04xx xx xx xx" required value={v.tel} onChange={set('tel')} /></div>
          </div>
          <div className="field"><label htmlFor="postcode">Postcode</label><input id="postcode" name="postcode" inputMode="numeric" placeholder={POSTCODE_EXAMPLES[pcIndex]} maxLength={4} ref={pcRef} value={v.postcode} onChange={set('postcode')} /></div>
        </div>
        <div className="form-foot">
          <p className="err" id="err" hidden={!error} role="alert">{error}</p>
          <button className="btn btn-green" type="submit">Vraag mijn gratis bod aan <ArrowRight /></button>
          <p className="small">Geen verplichtingen. We nemen dezelfde dag contact op.</p>
        </div>
      </form>

      <div className="done" id="done" hidden={!done}>
        <div className="tick"><Check /></div>
        <h3>Bijna klaar, <span id="dn">{firstName || '!'}</span></h3>
        <p className="lede">Verstuur je aanvraag via WhatsApp, dan ontvang je je bod zo snel mogelijk. Liever bellen? Dat kan ook.</p>
        <a className="btn btn-green" id="waSend" href={waHref} target="_blank" rel="noopener">Verstuur via WhatsApp</a>
        <div className="copyline"><span className="small">Bel ons</span><b ref={phoneRef}>{PHONE_DISPLAY}</b><button type="button" data-copy={PHONE_TEL} onClick={copy}>{copied ? 'Gekopieerd' : 'Kopieer'}</button></div>
        <button className="btn btn-ghost" type="button" id="again" onClick={() => setDone(false)}>Gegevens aanpassen</button>
      </div>
    </div>
  );
}
