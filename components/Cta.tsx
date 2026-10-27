import Reveal from './Reveal';
import { WA_URL } from '@/lib/contact';

export default function Cta() {
  return (
    <section className="cta">
      <div className="wrap">
        <Reveal className="box">
          <div>
            <h2>Benieuwd wat je auto waard is?</h2>
            <p>Vraag nu je gratis bod aan. Je zit nergens aan vast.</p>
          </div>
          <div className="acts">
            <a className="btn btn-green" href="#bod">Gratis bod aanvragen</a>
            <a className="btn btn-ghost" href={WA_URL} target="_blank" rel="noopener">Stuur een WhatsApp</a>
          </div>
          <span className="road" aria-hidden="true"></span>
        </Reveal>
      </div>
    </section>
  );
}
