import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="Antra home">
          <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554" />
            <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554" />
            <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554" />
            <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554" />
            <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554" />
          </svg>
        </Link>

        <div className="nav-menu">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/spaces" className={({ isActive }) => (isActive ? 'active' : '')}>
                Spaces
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active' : '')}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>
          <Link className="btn btn--primary nav-cta" to="/contact">
            Plan a visit
          </Link>
        </div>

        <button className="menu-toggle" aria-label="Open menu" aria-expanded={drawerOpen} aria-controls="drawer" type="button" onClick={openDrawer}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <div className="drawer" id="drawer" aria-hidden={!drawerOpen}>
        <div className="drawer-overlay" onClick={closeDrawer} />
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="drawer-top">
            <span aria-hidden="true">
              <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554" />
                <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554" />
                <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554" />
                <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554" />
                <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554" />
              </svg>
            </span>
            <button className="drawer-close" aria-label="Close menu" type="button" onClick={closeDrawer}>
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile">
            <Link to="/" onClick={closeDrawer}>Home</Link>
            <Link to="/spaces" onClick={closeDrawer}>Spaces</Link>
            <Link to="/gallery" onClick={closeDrawer}>Gallery</Link>
            <Link to="/services" onClick={closeDrawer}>Services</Link>
            <Link to="/contact" onClick={closeDrawer}>Contact</Link>
          </nav>
          <Link className="btn btn--primary" to="/contact" onClick={closeDrawer}>Plan a visit</Link>
        </div>
      </div>
    </header>
  );
}
