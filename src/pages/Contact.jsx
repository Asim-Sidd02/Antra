import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function Contact() {
  const [formValues, setFormValues] = useState(initialForm);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [formStatus, setFormStatus] = useState('');

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

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateField = (name, value) => {
    if (!value.trim()) return 'Required';
    if (name === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(value)) return 'Enter a valid email';
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
    if (!hasErrors) {
      setFormStatus('Thank you — your enquiry has been noted. We will be in touch shortly.');
    }
  };

  return (
    <main>
      <section className="hero-block" data-reveal>
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1>Start planning your event at Antra Luxe</h1>
          <p>Reach out for availability, pricing and a private tour of the venue.</p>
          <div className="hero-cta">
            <Link className="btn btn--primary" to="/">Return home</Link>
            <Link className="btn btn--secondary" to="/gallery">View gallery</Link>
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
          <form noValidate onSubmit={handleSubmit}>
            <div className="row-2">
              <div className="field">
                <label htmlFor="f-first">First name</label>
                <input id="f-first" name="firstName" type="text" autoComplete="given-name" required value={formValues.firstName} onChange={handleFormChange} />
                <span className="err" data-for="f-first" aria-live="polite">{formErrors.firstName}</span>
              </div>
              <div className="field">
                <label htmlFor="f-last">Last name</label>
                <input id="f-last" name="lastName" type="text" autoComplete="family-name" required value={formValues.lastName} onChange={handleFormChange} />
                <span className="err" data-for="f-last" aria-live="polite">{formErrors.lastName}</span>
              </div>
            </div>
            <div className="row-2">
              <div className="field">
                <label htmlFor="f-email">Email address</label>
                <input id="f-email" name="email" type="email" autoComplete="email" required value={formValues.email} onChange={handleFormChange} />
                <span className="err" data-for="f-email" aria-live="polite">{formErrors.email}</span>
              </div>
              <div className="field">
                <label htmlFor="f-phone">Contact number</label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" required value={formValues.phone} onChange={handleFormChange} />
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
              <div className="field" aria-hidden="true" />
            </div>
            <div className="field">
              <label htmlFor="f-msg">Message (optional)</label>
              <textarea id="f-msg" name="message" rows="3" value={formValues.message} onChange={handleFormChange} />
            </div>
            <div className="form-foot">
              <button className="btn btn--primary" type="submit">Submit enquiry</button>
            </div>
            <p className="form-note" role="status" aria-live="polite" hidden={!formStatus}>{formStatus}</p>
          </form>
        </div>
      </section>
    </main>
  );
}
