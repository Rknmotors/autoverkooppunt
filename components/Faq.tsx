import Reveal from './Reveal';

const pm = <span className="pm" aria-hidden="true"></span>;

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap grid">
        <Reveal>
          <p className="eyebrow">Vragen</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Goed om te weten<span className="dot">.</span></h2>
        </Reveal>
        <Reveal>
          <details open><summary>Moet ik verkopen als ik een bod aanvraag?{pm}</summary><div className="ans">Nee. Het bod is gratis en vrijblijvend. Je beslist zelf of je ingaat op onze prijs.</div></details>
          <details><summary>Wanneer krijg ik mijn geld?{pm}</summary><div className="ans">Meteen bij de overname. Na de korte controle ter plaatse schrijven we het bedrag direct over.</div></details>
          <details><summary>Wat moet ik klaarleggen?{pm}</summary><div className="ans">Leg deze zaken klaar voor de afspraak:<ul><li>Inschrijvingsbewijs</li><li>Gelijkvormigheidsattest (COC)</li><li>Alle sleutels</li><li>Onderhoudsboekje of facturen, als je die hebt</li></ul></div></details>
          <details><summary>Kopen jullie ook een wagen met schade?{pm}</summary><div className="ans">Ja. Ook wagens met schade, veel kilometers of bestemd voor export. Vermeld het gerust in je aanvraag.</div></details>
          <details><summary>Komen jullie overal langs?{pm}</summary><div className="ans">We komen naar je toe in heel België. Vul je postcode in, dan plannen we een moment dat jou past.</div></details>
        </Reveal>
      </div>
    </section>
  );
}
