import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const galleryImages = [
  {
    src: '/Gallery images/Reception setup.jpg',
    alt: 'Reception set up in the main hall'
  },
  {
    src: '/Gallery images/Lawn event.jpg',
    alt: 'An event on the lawn'
  },
  {
    src: '/Gallery images/floral detail.jpg',
    alt: 'Table and floral detail'
  },
  {
    src: '/Gallery images/Banquet lighting.jpg',
    alt: 'Banquet hall lighting and table setup'
  },
  {
    src: '/Gallery images/Room interior.jpg',
    alt: 'A guest suite interior'
  },
  {
    src: '/Gallery images/Entrance decor.jpg',
    alt: 'Entrance decor for a celebration'
  }
];

export default function Gallery() {
  useEffect(() => {
    const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-item]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('visible')));
          observer.unobserve(target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section className="hero-block" data-reveal>
        <div className="wrap">
          <span className="eyebrow">Gallery</span>
          <h1>Moments and details from events hosted at Antra Luxe</h1>
          <p>Browse curated photography that highlights our ceremony settings, rooms, dining space and celebration lighting.</p>
          <div className="hero-cta">
            <Link className="btn btn--primary" to="/contact">Plan a visit</Link>
            <Link className="btn btn--secondary" to="/">Return home</Link>
          </div>
        </div>
      </section>

      <section className="sec" data-reveal>
        <div className="wrap">
          <div className="stories-grid">
            <div className="gallery-preview">
              {galleryImages.map((item) => (
                <figure key={item.src} data-reveal-item>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </figure>
              ))}
            </div>
            <div className="quote-block">
              <span className="mark-divider" aria-hidden="true">
                <svg width="102" height="101" viewBox="0 0 102 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64.8128 100.583L63.2553 101L51 56.1567L38.7447 101L37.4936 100.666L2.43191 35.5886C3.01915 33.7479 3.70851 31.9585 4.49361 30.2141L38.0426 96.4977L38.566 94.4518L9.7851 21.0684C10.8191 19.6382 11.9234 18.2657 13.0979 16.9573L39.6638 90.1676L40.5575 86.6979L20.7 10.0243C22.0404 9.02381 23.4383 8.09385 24.8745 7.22803L41.9936 81.0925L43.6532 74.634L34.0532 2.90532C35.5851 2.36659 37.1426 1.89199 38.7383 1.49435L45.7468 66.4889L49.3787 52.3407L48.7085 0.0577216C49.4681 0.0256541 50.234 0 51 0C51.8553 0 52.7106 0.0256541 53.5596 0.0641351L52.6021 52.2765L56.4383 67.2264L63.5234 1.5649C65.1128 1.96895 66.6766 2.44996 68.2021 3.00152L58.5192 75.3267L60.1404 81.6504L77.3553 7.36913C78.7915 8.24136 80.183 9.18415 81.517 10.1911L61.5702 87.2238L62.4383 90.6037L89.0809 17.1754C90.2489 18.4966 91.3468 19.8755 92.3809 21.3121L63.5362 94.8687L64.0468 96.8505L97.6277 30.4963C98.4 32.2471 99.0894 34.0493 99.6638 35.8964L64.8064 100.583H64.8128Z" fill="url(#paint0_linear_262_52)"/>
                  <defs>
                    <linearGradient id="paint0_linear_262_52" x1="51" y1="4.64338" x2="51" y2="100.275" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E8B077" />
                      <stop offset="1" stopColor="#7A5737" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <blockquote>Our gallery tells the story of each event — from ceremony details and dining to lighting, decor and the guests who made every moment feel special.</blockquote>
              <cite>Antra Luxe events</cite>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
