import Reveal from './Reveal';

const STEPS = [
  { n: 1, meta: '2 minuten', title: 'Vul het formulier in' },
  { n: 2, meta: 'Dezelfde dag', title: 'Ontvang je bod' },
  { n: 3, meta: 'Bij jou thuis', title: 'Wij komen langs en betalen' },
];

export default function Steps() {
  return (
    <section className="steps" id="hoe">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Hoe werkt het</p>
          <h2 className="h2 h2-sm">In drie stappen verkocht<span className="dot">.</span></h2>
        </Reveal>
        <ol className="track">
          {STEPS.map((st, i) => (
            <Reveal as="li" key={st.n} stagger={i}><span className="n">{st.n}</span><p className="meta">{st.meta}</p><h3>{st.title}</h3></Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
