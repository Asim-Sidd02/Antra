import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function Spaces() {
  const [currentSpaceIndex, setCurrentSpaceIndex] = useState(0);
  const tablistRef = useRef(null);
  const currentSpace = spaces[currentSpaceIndex];

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
    <main>
      <section className="hero-block" data-reveal>
        <div className="wrap">
          <span className="eyebrow">Featured spaces</span>
          <h1>Rooms, lawns and gathering spaces for events big and small</h1>
          <p>Move through each space to discover the setup, capacity and the kind of event it suits best.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/#visit">Plan a visit</a>
            <Link className="btn btn--secondary" to="/">Return home</Link>
          </div>
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
              <button className="feature-arrow feature-arrow--prev" type="button" aria-label="Previous space" onClick={() => handleSpaceNav(-1)}>
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>
              </button>
              <button className="feature-arrow feature-arrow--next" type="button" aria-label="Next space" onClick={() => handleSpaceNav(1)}>
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
              </button>
            </div>
            <div className="feature-body">
              <span className="eyebrow">{currentSpace.tag}</span>
              <h3>{currentSpace.name}</h3>
              <p>{currentSpace.desc}</p>
              <dl className="spec">
                {currentSpace.spec.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="feature-cta">
                <a className="btn btn--secondary" href="/#visit">Enquire about this space</a>
                <a className="tlink" href="/#gallery">
                  View gallery
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
