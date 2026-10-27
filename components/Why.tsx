import Reveal from './Reveal';

export default function Why() {
  return (
    <section className="why" id="waarom">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Waarom Autoverkooppunt</p>
          <h2 className="h2">Waar we voor staan<span className="dot">.</span></h2>
        </Reveal>
        <Reveal className="vals">
          <div><p className="w">Eerlijk<span className="dot">.</span></p></div>
          <div><p className="w">Snel<span className="dot">.</span></p></div>
          <div><p className="w">Betrouwbaar<span className="dot">.</span></p></div>
        </Reveal>
      </div>
    </section>
  );
}
