/** Eenvoudige 404-pagina in de AVP-stijl (technisch nodig voor een stabiele build). */
export const metadata = { title: 'Pagina niet gevonden | Autoverkooppunt' };

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '0 16px', textAlign: 'center' }}>
      <div>
        <img src="/img/logo.png" alt="AVP Autoverkooppunt" style={{ height: 64, width: 'auto', margin: '0 auto 24px', display: 'block' }} />
        <h1 className="h2">Pagina niet gevonden<span className="dot">.</span></h1>
        <p className="lede" style={{ margin: '14px auto 28px' }}>Deze pagina bestaat niet.</p>
        <a className="btn btn-green" href="/">Naar de website</a>
      </div>
    </main>
  );
}
