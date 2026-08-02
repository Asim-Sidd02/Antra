import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    title: 'Catering & culinary',
    description:
      'A resident kitchen brigade cooks South Indian, North Indian and continental menus, with Jain, vegan and allergen-aware options. Tastings are arranged before anything is confirmed.',
    img: '/Gallery images/Reception setup.jpg',
    alt: 'A dining setup prepared by the in-house kitchen',
    iconPaths: ['M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2', 'M5 2v20', 'M15 2v20', 'M15 8a4 4 0 0 0 4-4V2']
  },
  {
    number: '02',
    title: 'Guest accommodation',
    description:
      'Sixty rooms and suites sit on the property and are held together as a block, so out-of-town families and the wedding party stay a short walk from the hall.',
    img: '/Featured-space images (Desktop)/Guest Suites & Rooms - Desktop.jpg',
    alt: 'A guest suite on the property',
    iconPaths: ['M2 4v16', 'M2 8h18a2 2 0 0 1 2 2v10', 'M2 17h20', 'M6 8v9']
  },
  {
    number: '03',
    title: 'Event coordination',
    description:
      'One coordinator owns the timeline and the vendors, from the first site visit through to the floor on the day, so the hosts can stay with their guests.',
    img: '/Featured-space images (Desktop)/Grand Banquet Hall - Desktop.jpg',
    alt: 'The Grand Banquet Hall set for an event',
    iconPaths: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75']
  },
  {
    number: '04',
    title: 'Parking & amenities',
    description:
      'Three hundred parking spaces with valet, house sound and stage lighting, backup power and connectivity — the practical layer a large gathering leans on.',
    img: '/Featured-space images (Desktop)/Pre-function Foyer - Desktop.jpg',
    alt: 'The pre-function foyer and arrival area',
    iconPaths: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10.5 15.5 6c-.3-.6-.9-1-1.6-1H5c-.7 0-1.3.4-1.6 1L1 10.5V16c0 .6.4 1 1 1h2', 'M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4', 'M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4']
  }
];

export default function Services() {
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
    <main className="services-page">
      <section className="page-hero" data-reveal>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> &nbsp;&middot;&nbsp; Services
          </nav>
          <span className="eyebrow">Support</span>
          <h1>
            Held together by <span className="hl">one team</span>
          </h1>
          <p>
            The parts that usually take a dozen vendors are handled in-house, by people who know the building — dining, stay, coordination and the practical details.
          </p>
        </div>
      </section>

      <section className="sec sec--lg services" data-reveal>
        <div className="wrap">
          <div className="svc-detail">
            {services.map((service) => (
              <article className="svc-row" key={service.title} data-reveal-item>
                <div className="svc-figure">
                  <img src={service.img} alt={service.alt} loading="lazy" />
                </div>
                <div className="svc-body">
                  <span className="svc-num">{service.number}</span>
                  <div className="svc-icon-row">
                    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                      {service.iconPaths.map((path, index) => (
                        <path key={index} d={path} />
                      ))}
                    </svg>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.description}</p>
                  <hr className="svc-rule" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" data-reveal>
        <div className="wrap">
          <span className="mark" aria-hidden="true">
            <svg width="102" height="101" viewBox="0 0 102 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M64.8128 100.583L63.2553 101L51 56.1567L38.7447 101L37.4936 100.666L2.43191 35.5886C3.01915 33.7479 3.70851 31.9585 4.49361 30.2141L38.0426 96.4977L38.566 94.4518L9.7851 21.0684C10.8191 19.6382 11.9234 18.2657 13.0979 16.9573L39.6638 90.1676L40.5575 86.6979L20.7 10.0243C22.0404 9.02381 23.4383 8.09385 24.8745 7.22803L41.9936 81.0925L43.6532 74.634L34.0532 2.90532C35.5851 2.36659 37.1426 1.89199 38.7383 1.49435L45.7468 66.4889L49.3787 52.3407L48.7085 0.0577216C49.4681 0.0256541 50.234 0 51 0C51.8553 0 52.7106 0.0256541 53.5596 0.0641351L52.6021 52.2765L56.4383 67.2264L63.5234 1.5649C65.1128 1.96895 66.6766 2.44996 68.2021 3.00152L58.5192 75.3267L60.1404 81.6504L77.3553 7.36913C78.7915 8.24136 80.183 9.18415 81.517 10.1911L61.5702 87.2238L62.4383 90.6037L89.0809 17.1754C90.2489 18.4966 91.3468 19.8755 92.3809 21.3121L63.5362 94.8687L64.0468 96.8505L97.6277 30.4963C98.4 32.2471 99.0894 34.0493 99.6638 35.8964L64.8064 100.583H64.8128Z" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient id="paint0_linear" x1="51" y1="4.64338" x2="51" y2="100.275" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E8B077" />
                  <stop offset="1" stopColor="#7A5737" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <h2>
            Everything under <span className="hl">one roof</span>
          </h2>
          <p>
            Tell us about your event and we will walk you through how the kitchen, rooms and coordination come together for your day.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" to="/contact">
              Plan a visit
            </Link>
            <Link className="btn btn--secondary" to="/spaces">
              Explore the spaces
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
