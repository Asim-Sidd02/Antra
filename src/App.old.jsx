import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const spaces = [
  {
    name: 'Grand Banquet Hall',
    tag: 'Indoor · Air-conditioned',
    desc: 'The main indoor room — wide, column-free and set up as easily for a wedding dinner as a company conference.',
    spec: [
      ['Seated dinner', '1,500 guests'],
      ['Floor area', '12,000 sq ft'],
      ['Stage & LED wall', 'Included'],
      ['Best for', 'Receptions, conferences']
    ],
    imgD: '/Featured-space images (Desktop)/Grand Banquet Hall - Desktop.jpg',
    imgM: '/Featured-space images (Mobile)/Grand Banquet Hall - Mobile.jpg',
    alt: 'The Grand Banquet Hall set for a reception'
  },
  {
    name: 'The Lawn',
    tag: 'Open-air · Evening-lit',
    desc: 'A landscaped stretch of green, lit for the evening and open to the sky, for the parts of a wedding that spill outdoors.',
    spec: [
      ['Standing', '2,000 guests'],
      ['Area', '18,000 sq ft'],
      ['Cover', 'Marquee available'],
      ['Best for', 'Mehendi, sangeet, haldi']
    ],
    imgD: '/Featured-space images (Desktop)/The Lawn - Desktop.jpg',
    imgM: '/Featured-space images (Mobile)/The Lawn - Mobile.jpg',
    alt: 'The landscaped lawn lit for an evening gathering'
  },
  {
    name: 'Pre-function Foyer',
    tag: 'Arrival · Climate-controlled',
    desc: 'A calm indoor area to gather guests before the doors open — welcome drinks, registration or a small exhibition.',
    spec: [
      ['Reception', '400 guests'],
      ['Area', '3,500 sq ft'],
      ['Desks', 'Included'],
      ['Best for', 'Welcome drinks, expos']
    ],
    imgD: '/Featured-space images (Desktop)/Pre-function Foyer - Desktop.jpg',
    imgM: '/Featured-space images (Mobile)/Pre-function Foyer - Mobile.jpg',
    alt: 'The climate-controlled pre-function foyer'
  },
  {
    name: 'Board Room',
    tag: 'Meetings · AV-equipped',
    desc: 'A private, fully wired room for briefings, interviews and smaller working sessions away from the main floor.',
    spec: [
      ['Boardroom', '40 guests'],
      ['Area', '900 sq ft'],
      ['Video conf.', 'Included'],
      ['Best for', 'Meetings, briefings']
    ],
    imgD: '/Featured-space images (Desktop)/Board Room - Desktop.jpg',
    imgM: '/Featured-space images (Mobile)/Board Room - Mobile.jpg',
    alt: 'The private board room equipped for meetings'
  },
  {
    name: 'Guest Suites & Rooms',
    tag: 'Stay · On the property',
    desc: 'Rooms and suites on site, held as a block, so families and the wedding party stay a short walk from the hall.',
    spec: [
      ['Keys', '60 rooms'],
      ['Suites', '6'],
      ['Rate', 'Fixed event block'],
      ['Best for', 'Out-of-town families']
    ],
    imgD: '/Featured-space images (Desktop)/Guest Suites & Rooms - Desktop.jpg',
    imgM: '/Featured-space images (Desktop)/Guest Suites & Rooms - Desktop.jpg',
    alt: 'A guest suite for families staying on the property'
  }
];

const quotes = [
  {
    text: 'The venue felt thoughtfully planned from the moment our guests arrived. The team managed the flow beautifully, allowing both families to enjoy the evening without worrying about the details.',
    cite: 'Niharika & Varun · Wedding Reception'
  },
  {
    text: 'Having the hall, guest rooms and event support in one place made the entire wedding weekend much easier for our family.',
    cite: 'Sravya & Aditya · Wedding Celebrations'
  },
  {
    text: 'The spaces worked equally well for our formal conference presentations and the more intimate family reception the following evening.',
    cite: 'Ramesh & Priya · Corporate + Social'
  },
  {
    text: 'From the morning ceremonies to the late-night celebrations, everything was cared for. We only had to show up and enjoy our own wedding.',
    cite: 'Anjali & Karthik · Wedding'
  }
];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  type: '',
  startDate: '',
  endDate: '',
  message: ''
};

const initialErrors = { firstName: '', lastName: '', email: '', phone: '' };

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentSpaceIndex, setCurrentSpaceIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [formValues, setFormValues] = useState(initialForm);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [formStatus, setFormStatus] = useState('');
  const headerRef = useRef(null);
  const drawerRef = useRef(null);
  const tablistRef = useRef(null);

  const currentSpace = spaces[currentSpaceIndex];
  const currentQuote = quotes[quoteIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 40) headerRef.current.classList.add('scrolled');
      else headerRef.current.classList.remove('scrolled');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', drawerOpen);
  }, [drawerOpen]);

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

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const focusTab = (index) => {
    const tab = tablistRef.current?.querySelectorAll('[role="tab"]')[index];
    tab?.focus();
  };

  const handleSpaceSelect = (index) => {
    setCurrentSpaceIndex(index);
    focusTab(index);
  };

  const handleSpaceNav = (delta) => {
    const next = (currentSpaceIndex + delta + spaces.length) % spaces.length;
    setCurrentSpaceIndex(next);
  };

  const handleQuoteNav = (delta) => {
    setQuoteIndex((prev) => (prev + delta + quotes.length) % quotes.length);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateField = (name, value) => {
    if (!value.trim()) return 'Required';
    if (name === 'email' && value && !/^[^@]+@[^@]+\.[^@]+$/.test(value)) return 'Enter a valid email';
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {
      firstName: validateField('firstName', formValues.firstName),
      lastName: validateField('lastName', formValues.lastName),
      email: validateField('email', formValues.email),
      phone: validateField('phone', formValues.phone)
    };
    setFormErrors(nextErrors);
    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (!hasErrors) setFormStatus('Thank you — your enquiry has been noted. We will be in touch shortly.');
  };

  const tabs = useMemo(
    () =>
      spaces.map((space, index) => (
        <button
          key={space.name}
          className="select-tab"
          type="button"
          role="tab"
          aria-selected={index === currentSpaceIndex}
          tabIndex={index === currentSpaceIndex ? 0 : -1}
          onClick={() => handleSpaceSelect(index)}
          onKeyDown={(event) => {
            let nextIndex = null;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % spaces.length;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + spaces.length) % spaces.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = spaces.length - 1;
            if (nextIndex !== null) {
              event.preventDefault();
              handleSpaceSelect(nextIndex);
            }
          }}
        >
          {space.name}
        </button>
      )),
    [currentSpaceIndex]
  );

  return (
    <>
      <header className="site-header" ref={headerRef} id="siteHeader">
        <div className="wrap nav">
          <a className="brand" href="#top" aria-label="Antra home">
            <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554"/>
              <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554"/>
              <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554"/>
              <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554"/>
              <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554"/>
            </svg>
          </a>
          <div className="nav-menu">
            <ul className="nav-links">
              <li><a href="#spaces">Spaces</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#visit">Contact</a></li>
            </ul>
            <a className="btn btn--primary nav-cta" href="#visit">Plan a visit</a>
          </div>
          <button className="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded={drawerOpen} aria-controls="drawer" type="button" onClick={openDrawer}>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      <div className="drawer" id="drawer" aria-hidden={!drawerOpen} ref={drawerRef}>
        <div className="drawer-overlay" data-close onClick={closeDrawer}></div>
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="drawer-top">
            <span aria-hidden="true">
              <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554"/>
                <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554"/>
                <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554"/>
                <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554"/>
                <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554"/>
              </svg>
            </span>
            <button className="drawer-close" id="drawerClose" aria-label="Close menu" type="button" onClick={closeDrawer}>
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <nav aria-label="Mobile">
            <a href="#spaces" data-close onClick={closeDrawer}>Spaces</a>
            <a href="#services" data-close onClick={closeDrawer}>Services</a>
            <a href="#gallery" data-close onClick={closeDrawer}>Gallery</a>
            <a href="#visit" data-close onClick={closeDrawer}>Contact</a>
          </nav>
          <a className="btn btn--primary" href="#visit" data-close onClick={closeDrawer}>Plan a visit</a>
        </div>
      </div>

      <main id="top">
        <section className="hero" aria-label="Introduction" data-reveal>
          <div className="hero-media" aria-hidden="false">
            <picture>
              <source media="(max-width:768px)" srcSet="/Hero page banners/Hero banner - Mobile.jpg" />
              <img src="/Hero page banners/Hero banner - Desktop.jpg" alt="A couple sharing a warm moment at a celebration held at Antra Luxe" width="1600" height="690" fetchPriority="high" />
            </picture>
          </div>
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Patamata · Vijayawada</span>
              <h1>A venue that holds <span className="hl">the whole occasion</span></h1>
              <p>Five spaces, in-house kitchens and rooms for the family — Antra Luxe brings the parts of a large gathering together under one roof.</p>
              <div className="hero-cta">
                <a className="btn btn--primary" href="#visit">Plan a visit</a>
                <a className="btn btn--secondary" href="#spaces">Explore our spaces</a>
              </div>
            </div>
          </div>
        </section>

        <section className="hero-block" aria-label="Introduction" data-reveal>
          <div className="wrap">
            <span className="eyebrow">Patamata · Vijayawada</span>
            <h1>A venue that holds <span className="hl">the whole occasion</span></h1>
            <p>Five spaces, in-house kitchens and rooms for the family — Antra Luxe brings the parts of a large gathering together under one roof.</p>
            <div className="hero-cta">
              <a className="btn btn--primary" href="#visit">Plan a visit</a>
              <a className="btn btn--secondary" href="#spaces">Explore our spaces</a>
            </div>
          </div>
        </section>

        <section className="hero-stats" aria-label="Venue at a glance">
          <div className="wrap">
            <div className="stat" data-reveal-item><b>1,500</b><span>Seated in the main hall</span></div>
            <div className="stat" data-reveal-item><b>5</b><span>Distinct spaces</span></div>
            <div className="stat" data-reveal-item><b>60</b><span>Rooms on site</span></div>
            <div className="stat" data-reveal-item><b>300</b><span>Car parking spaces</span></div>
          </div>
        </section>

        <section className="sec" id="spaces" aria-labelledby="spaces-h" data-reveal>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Featured spaces</span>
              <h2 id="spaces-h">Look closer at a single room</h2>
              <p>Move through each space to see how it is set up, who it suits and what it holds.</p>
            </div>

            <div className="select-tabs" role="tablist" aria-label="Choose a space" ref={tablistRef}>
              {tabs}
            </div>

            <div className="feature">
              <div className="feature-media">
                <picture>
                  <source media="(max-width:768px)" srcSet={currentSpace.imgM} />
                  <img src={currentSpace.imgD} alt={currentSpace.alt} width="720" height="520" loading="lazy" />
                </picture>
                <button className="feature-arrow feature-arrow--prev" id="featurePrev" type="button" aria-label="Previous space" onClick={() => handleSpaceNav(-1)}>
                  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>
                </button>
                <button className="feature-arrow feature-arrow--next" id="featureNext" type="button" aria-label="Next space" onClick={() => handleSpaceNav(1)}>
                  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                </button>
              </div>
              <div className="feature-body">
                <span className="eyebrow" id="featureTag">{currentSpace.tag}</span>
                <h3 id="featureName">{currentSpace.name}</h3>
                <p id="featureDesc">{currentSpace.desc}</p>
                <dl className="spec" id="featureSpec">
                  {currentSpace.spec.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="feature-cta">
                  <a className="btn btn--secondary" href="#visit">Enquire about this space</a>
                  <a className="tlink" href="#gallery">
                    View gallery
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec sec--lg services" id="services" aria-labelledby="services-h" data-reveal>
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: '44px' }}>
              <span className="eyebrow">Support</span>
              <h2 id="services-h">Held together by one team</h2>
              <p>The parts that usually take a dozen vendors are handled in-house, by people who know the building.</p>
            </div>

            <div className="svc-detail">
              <article className="svc-card" data-reveal-item>
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2"/><path d="M5 2v20"/><path d="M15 2v20"/><path d="M15 8a4 4 0 0 0 4-4V2"/></svg>
                <div>
                  <h3>Catering & culinary</h3>
                  <p>A resident kitchen brigade cooks South Indian, North Indian and continental menus, with Jain, vegan and allergen-aware options. Tastings are arranged before anything is confirmed.</p>
                </div>
              </article>
              <article className="svc-card" data-reveal-item>
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                <div>
                  <h3>Guest accommodation</h3>
                  <p>Sixty rooms and suites sit on the property and are held together as a block, so out-of-town families and the wedding party stay a short walk from the hall.</p>
                </div>
              </article>
              <article className="svc-card" data-reveal-item>
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <div>
                  <h3>Event coordination</h3>
                  <p>One coordinator owns the timeline and the vendors, from the first site visit through to the floor on the day, so the hosts can stay with their guests.</p>
                </div>
              </article>
              <article className="svc-card" data-reveal-item>
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10.5 15.5 6c-.3-.6-.9-1-1.6-1H5c-.7 0-1.3.4-1.6 1L1 10.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                <div>
                  <h3>Parking & amenities</h3>
                  <p>Three hundred parking spaces with valet, house sound and stage lighting, backup power and connectivity — the practical layer a large gathering leans on.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="sec" id="gallery" aria-labelledby="stories-h" data-reveal>
          <div className="wrap">
            <h2 id="stories-h" className="visually-hidden">Stories and gallery</h2>
            <div className="stories-grid">
              <div className="quote-block">
                <span className="mark-divider" aria-hidden="true">
                  <svg width="102" height="101" viewBox="0 0 102 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64.8128 100.583L63.2553 101L51 56.1567L38.7447 101L37.4936 100.666L2.43191 35.5886C3.01915 33.7479 3.70851 31.9585 4.49361 30.2141L38.0426 96.4977L38.566 94.4518L9.7851 21.0684C10.8191 19.6382 11.9234 18.2657 13.0979 16.9573L39.6638 90.1676L40.5575 86.6979L20.7 10.0243C22.0404 9.02381 23.4383 8.09385 24.8745 7.22803L41.9936 81.0925L43.6532 74.634L34.0532 2.90532C35.5851 2.36659 37.1426 1.89199 38.7383 1.49435L45.7468 66.4889L49.3787 52.3407L48.7085 0.0577216C49.4681 0.0256541 50.234 0 51 0C51.8553 0 52.7106 0.0256541 53.5596 0.0641351L52.6021 52.2765L56.4383 67.2264L63.5234 1.5649C65.1128 1.96895 66.6766 2.44996 68.2021 3.00152L58.5192 75.3267L60.1404 81.6504L77.3553 7.36913C78.7915 8.24136 80.183 9.18415 81.517 10.1911L61.5702 87.2238L62.4383 90.6037L89.0809 17.1754C90.2489 18.4966 91.3468 19.8755 92.3809 21.3121L63.5362 94.8687L64.0468 96.8505L97.6277 30.4963C98.4 32.2471 99.0894 34.0493 99.6638 35.8964L64.8064 100.583H64.8128ZM80.4383 93.0729L95.2468 76.7056C97.0979 73.4604 98.6234 69.9971 99.7404 66.3542L72.9957 97.4854C75.6128 96.2283 78.0894 94.7468 80.4383 93.0729ZM101.802 46.8828L66.1979 100.166C67.5383 99.7429 68.8532 99.2619 70.1426 98.736L101.936 53.7068C101.974 52.8922 102 52.0649 102 51.2376C102 49.7689 101.923 48.3194 101.802 46.8828ZM6.28723 75.8975L22.3149 93.6116C24.5681 95.1509 26.9489 96.5105 29.4383 97.6778L2.12553 65.886C3.16595 69.3942 4.56383 72.7485 6.28723 75.8975ZM0 51.244C0 51.9366 0.0255282 52.6293 0.0510601 53.3155L32.2277 98.8835C33.5043 99.3902 34.8064 99.8584 36.134 100.262L0.223403 46.5236C0.0829777 48.0757 0 49.647 0 51.244Z" fill="url(#paint0_linear_262_52)"/>
                    <defs>
                      <linearGradient id="paint0_linear_262_52" x1="51" y1="4.64338" x2="51" y2="100.275" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E8B077"/>
                        <stop offset="1" stopColor="#7A5737"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <blockquote id="qText">{currentQuote.text}</blockquote>
                <cite id="qCite">{currentQuote.cite}</cite>
                <div className="quote-nav">
                  <button id="qPrev" aria-label="Previous testimonial" type="button" onClick={() => handleQuoteNav(-1)}>
                    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>
                  </button>
                  <button id="qNext" aria-label="Next testimonial" type="button" onClick={() => handleQuoteNav(1)}>
                    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                  </button>
                </div>
              </div>
              <div className="gallery-preview">
                <figure data-reveal-item><img src="/Gallery images/Reception setup.jpg" alt="Reception set up in the main hall" width="320" height="320" loading="lazy" /></figure>
                <figure data-reveal-item><img src="/Gallery images/Lawn event.jpg" alt="An event on the lawn" width="320" height="320" loading="lazy" /></figure>
                <figure data-reveal-item><img src="/Gallery images/floral detail.jpg" alt="Table and floral detail" width="320" height="320" loading="lazy" /></figure>
                <a href="#" aria-label="View the full gallery">View full gallery</a>
              </div>
            </div>
          </div>
        </section>

        <section className="visit" id="visit" aria-labelledby="visit-h" data-reveal>
          <div className="visit-map">
            <iframe
              title="ANTRA LUXE location on Google Maps"
              src="https://www.google.com/maps?q=16.4886531,80.6642461&z=16&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="pin" href="https://www.google.com/maps/place/?q=place_id:ChIJafwXdwD7NToRGnYNvoU6zLw" target="_blank" rel="noopener noreferrer">Donka Road, Patamata · Vijayawada 520010</a>
          </div>
          <div className="visit-form">
            <span className="eyebrow">Visit & enquire</span>
            <h2 id="visit-h">At the Heart of Vijayawada</h2>
            <p>We are easy to reach from across the city, with parking on site and someone to walk you through dates and details in person.</p>
            <form id="enquiryForm" noValidate onSubmit={handleSubmit}>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="f-first">First name</label>
                  <input id="f-first" name="firstName" type="text" autoComplete="given-name" required aria-required="true" value={formValues.firstName} onChange={handleFormChange} />
                  <span className="err" data-for="f-first" aria-live="polite">{formErrors.firstName}</span>
                </div>
                <div className="field">
                  <label htmlFor="f-last">Last name</label>
                  <input id="f-last" name="lastName" type="text" autoComplete="family-name" required aria-required="true" value={formValues.lastName} onChange={handleFormChange} />
                  <span className="err" data-for="f-last" aria-live="polite">{formErrors.lastName}</span>
                </div>
              </div>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="f-email">Email address</label>
                  <input id="f-email" name="email" type="email" autoComplete="email" required aria-required="true" value={formValues.email} onChange={handleFormChange} />
                  <span className="err" data-for="f-email" aria-live="polite">{formErrors.email}</span>
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Contact number</label>
                  <input id="f-phone" name="phone" type="tel" autoComplete="tel" required aria-required="true" value={formValues.phone} onChange={handleFormChange} />
                  <span className="err" data-for="f-phone" aria-live="polite">{formErrors.phone}</span>
                </div>
              </div>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="f-type">Event type</label>
                  <select id="f-type" name="type" value={formValues.type} onChange={handleFormChange}>
                    <option value="">Please choose</option>
                    <option>Wedding</option>
                    <option>Reception</option>
                    <option>Conference</option>
                    <option>Milestone or birthday</option>
                    <option>Cultural or social</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-start">Start date</label>
                  <input id="f-start" name="startDate" type="date" value={formValues.startDate} onChange={handleFormChange} />
                </div>
              </div>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="f-end">End date</label>
                  <input id="f-end" name="endDate" type="date" value={formValues.endDate} onChange={handleFormChange} />
                </div>
                <div className="field" aria-hidden="true"></div>
              </div>
              <div className="field">
                <label htmlFor="f-msg">Message (optional)</label>
                <textarea id="f-msg" name="message" rows="3" value={formValues.message} onChange={handleFormChange} />
              </div>
              <div className="form-foot">
                <button className="btn btn--primary" type="submit">Submit enquiry</button>
              </div>
              <p className="form-note" id="formStatus" role="status" aria-live="polite" hidden={!formStatus}>{formStatus}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer" data-reveal>
        <div className="wrap footer-top">
          <div className="footer-brand">
            <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554"/>
              <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554"/>
              <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554"/>
              <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554"/>
              <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554"/>
            </svg>
            <p>A convention and celebration venue in Patamata, Vijayawada.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#spaces">Spaces</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <address>Donka Road, Patamata,<br/>Vijayawada 520010</address>
            <a className="btn btn--primary footer-cta" href="#visit">Plan a visit</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Antra Luxe. All rights reserved.</span>
          <span className="links"><a href="#">Privacy policy</a><a href="#">Terms of service</a></span>
        </div>
      </footer>
    </>
  );
}
