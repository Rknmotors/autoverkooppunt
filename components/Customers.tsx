import Reveal from './Reveal';
import ReviewCarousel, { type Review } from './ReviewCarousel';

const PHOTOS = [
  { src: '/img/klant-1.jpg', alt: 'Klant met AVP-bord bij haar verkochte Peugeot' },
  { src: '/img/klant-2.jpg', alt: 'Klant met AVP-bord bij de verkochte wagen' },
  { src: '/img/klant-3.jpg', alt: 'Klant met AVP-bord bij zijn verkochte Peugeot 108' },
  { src: '/img/klant-4.jpg', alt: 'Klant met AVP-bord bij de verkochte wagen' },
];

const REVIEWS: Review[] = [
  { quote: 'Goede communicatie en houdt zich aan de afspraken. Dankjewel.', name: 'Marc V.', source: 'google' },
  { quote: 'Vlotte afhandeling..!', name: 'Ronny K.', source: 'google' },
  { quote: 'Snelle eerlijke afhandeling ;)', name: 'Kian V.', source: 'google' },
  { quote: 'Super vlot verlopen! Bod was eerlijk en de afhandeling ging heel snel. Aanrader.', name: 'Jan', source: 'Volkswagen Passat' },
  { quote: 'Eindelijk geen gedoe meer met advertenties en mensen die niet komen opdagen. Alles netjes geregeld.', name: 'Sarah', source: 'BMW 1 Reeks' },
  { quote: 'Correcte prijs gekregen en alles werd professioneel afgehandeld. Zou het zo opnieuw doen.', name: 'Marc', source: 'Mercedes-Benz C-Klasse' },
];

export default function Customers() {
  return (
    <section className="sold" id="klanten">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Echte klanten, echte auto&apos;s</p>
          <h2 className="h2">Zij verkochten al aan AVP<span className="dot">.</span></h2>
        </Reveal>
        <div className="gallery">
          {PHOTOS.map((p) => (
            <Reveal as="figure" key={p.src}><img src={p.src} alt={p.alt} width={540} height={720} loading="lazy" /><span className="stamp">Verkocht aan AVP</span></Reveal>
          ))}
        </div>
        <ReviewCarousel reviews={REVIEWS} />
      </div>
    </section>
  );
}
