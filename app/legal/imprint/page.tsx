export default function Imprint() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
        <p>[Company Name]<br />
        [Street]<br />
        [PLZ] [City]</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Vertreten durch</h3>
        <p>[Name of CEO/Managing Director]</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Kontakt</h3>
        <p>Telefon: [number]<br />
        E-Mail: [email]</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Registereintrag</h3>
        <p>Handelsregister: [Court]<br />
        Registernummer: [Number]</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Umsatzsteuer-ID</h3>
        <p>USt-IdNr.: [VAT number]</p>
      </section>
    </div>
  )
} 