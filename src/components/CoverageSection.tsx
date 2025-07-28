import USMap from '@/components/USMap';

export default function CoverageSection() {
  return (
    <section className="py-12 mx-auto bg-[#fcfbb1]">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Expanding Reach with Regional Excellence</h2>
      <div className="flex flex-col md:flex-row flex-reverse p-6 justify-between">
        <div className="max-w-sm space-y-10 mx-auto">
          <h3>UrgentShip proudly provides dedicated regional service throughout both Northern and Southern California, as well as select areas of Nevada and Arizona. Our footprint is further extended through strategic partnerships with trusted last-mile delivery providers in key states including Texas, Oklahoma, Colorado, Kansas, Missouri, Georgia, Florida, and Illinois.</h3>
          <h3>As part of our continued growth, we are always seeking opportunities to expand our regional coverage and form new partnerships that align with our commitment to reliable, on-time delivery. If you&#39;re a logistics provider or regional carrier interested in partnering with UrgentShip, we welcome the opportunity to connect.</h3>
        </div>
        <div className="mx-auto px-4 mt-20 md:min-w-100">
          <USMap highlightedStates={['TX', 'CA', 'FL', 'AZ', 'OK', 'KS', 'CO', 'IL', 'MO', 'GA']} />
        </div>
      </div>
    </section>
  );
}
