import Reveal from './Reveal';
import Videos from './Videos';
import { Check } from './icons';

const CHIPS = ['Alle merken', 'Oudere wagens', 'Hoge kilometerstand', 'Met schade', 'Voor export', 'Bestelwagens', 'Elektrisch & hybride', 'Diesel & benzine'];

export default function Buy() {
  return (
    <section className="buy" id="wat">
      <div className="wrap grid">
        <Reveal className="buy-left">
          <div className="extra-head">
            <p className="eyebrow">Wat we kopen</p>
            <h2 className="h2">Elke wagen, elk merk<span style={{ color: 'var(--yellow)' }}>.</span></h2>
          </div>
          <ul className="chips">
            {CHIPS.map((c) => (
              <li className="chip" key={c}><span className="ck"><Check /></span>{c}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="extra">
          <div className="extra-head">
            <p className="eyebrow">Andere diensten</p>
            <h2 className="h2">Laten verkopen of laten zoeken<span style={{ color: 'var(--yellow)' }}>.</span></h2>
          </div>
          <Videos />
        </Reveal>
      </div>
    </section>
  );
}
