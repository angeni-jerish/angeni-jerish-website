import { useEffect, useState } from 'react';
import aboutme from '../assets/about.png';
import happy from '../assets/happy.png';
import { MailIcon, LinkedInIcon, GithubIcon } from './ContactIcons';

const NAME = "Hello, I'm Angeni!";
const IDLE_DELAY = 4000;

function Landing({ photoVisible = true }) {
  const [displayed, setDisplayed] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timers = [];
    for (let i = 0; i <= NAME.length; i++) {
      timers.push(setTimeout(() => setDisplayed(NAME.substring(0, i)), 100 * i));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const idleTimer = setTimeout(() => setShowHint(true), IDLE_DELAY);
    const handleScroll = () => {
      clearTimeout(idleTimer);
      setShowHint(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="landing">
      <div className="landing-content">
        <img
          id="landing-photo-target"
          src={happy}
          alt="Angeni smiling"
          className={`landing-photo ${photoVisible ? 'visible' : ''}`}
        />
        <div className="landing-text">
          <h1 className="header">
            <span>{displayed}</span>
            <span className="cursor">|</span>
          </h1>

          <p className="landing-bio">
            I'm a <b>first-year</b> student in the Engineering I program at{' '}
            <b>McMaster University</b>. As an aspiring <b>mechatronics engineer</b>, I enjoy
            turning ideas into things that actually work and experimenting with new tools and
            technologies to bring those ideas to life. When I'm not tinkering with projects,
            you'll find me <b>leading dance performances</b>, <b>engaging in community
            outreach</b>, or <b>enjoying a Bollywood movie marathon</b>.
          </p>

          <div className="contact-row">
            <a
              className="contact-icon-link hover-pop"
              href="mailto:angeni.jerish@gmail.com"
              aria-label="Email"
            >
              <MailIcon className="contact-icon" />
            </a>
            <a
              className="contact-icon-link hover-pop"
              href="https://www.linkedin.com/in/angeni-jerish/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="contact-icon" />
            </a>
            <a
              className="contact-icon-link hover-pop"
              href="https://github.com/angeni-jerish"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon className="contact-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className={`scroll-hint ${showHint ? 'visible' : ''}`}>
        <span>scroll</span>
        <div className="scroll-hint-arrow">↓</div>
      </div>
    </section>
  );
}

export default Landing;
