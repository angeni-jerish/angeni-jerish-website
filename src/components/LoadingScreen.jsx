import { useEffect, useRef, useState } from 'react';
import tired from '../assets/tired.png';
import coffee from '../assets/coffee.png';
import energized from '../assets/energized.png';
import happy from '../assets/happy.png';

const PROGRESS_DURATION = 2200;
const HOLD_AT_FULL = 300;
const BOUNCE_DURATION = 4000;
const GRAVITY = 1150;
const LAND_DURATION = 700;
const HAPPY_HOLD = 300;
const EXIT_DURATION = 400;
const SPRITE_SIZE = 200;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function LoadingScreen({ onLanded, onComplete }) {
  const [phase, setPhase] = useState('progress'); // progress | bounce | land | exit
  const fillRef = useRef(null);
  const coffeeRef = useRef(null);
  const spriteRef = useRef(null);
  const percentRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Phase 1: fill the bar, coffee rides the leading edge toward tired.png
  useEffect(() => {
    if (phase !== 'progress') return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduceMotion ? 300 : PROGRESS_DURATION;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const pct = easeInOutCubic(t) * 100;
      if (fillRef.current) fillRef.current.style.width = `${pct}%`;
      if (coffeeRef.current) coffeeRef.current.style.left = `${pct}%`;
      if (percentRef.current) percentRef.current.textContent = `${Math.round(pct)}%`;
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase('bounce'), HOLD_AT_FULL);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Phase 2: tired.png -> energized.png, bounces freely around the viewport
  useEffect(() => {
    if (phase !== 'bounce') return undefined;
    const sprite = spriteRef.current;
    if (!sprite) return undefined;

    const startRect = sprite.getBoundingClientRect();
    sprite.src = energized;
    sprite.style.position = 'fixed';
    sprite.style.transition = 'none';
    sprite.style.left = `${startRect.left}px`;
    sprite.style.top = `${startRect.top}px`;
    sprite.style.transform = 'rotate(0deg)';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      const timer = setTimeout(() => setPhase('land'), 200);
      return () => clearTimeout(timer);
    }

    const MAX_SPEED = 1500;
    const pos = { x: startRect.left, y: startRect.top };
    const vel = {
      x: (Math.random() < 0.5 ? -1 : 1) * (650 + Math.random() * 320),
      y: -(780 + Math.random() * 320),
    };
    let last = performance.now();
    const bounceStart = last;
    const wobbleSeed = Math.random() * 1000;

    const step = (now) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      vel.y += GRAVITY * dt;
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;

      const maxX = window.innerWidth - SPRITE_SIZE;
      const maxY = window.innerHeight - SPRITE_SIZE;
      if (pos.x <= 0) {
        pos.x = 0;
        vel.x = Math.min(MAX_SPEED, Math.abs(vel.x) * 1.03);
      } else if (pos.x >= maxX) {
        pos.x = maxX;
        vel.x = -Math.min(MAX_SPEED, Math.abs(vel.x) * 1.03);
      }
      if (pos.y <= 0) {
        pos.y = 0;
        vel.y = Math.min(MAX_SPEED, Math.abs(vel.y) * 0.98);
      } else if (pos.y >= maxY) {
        pos.y = maxY;
        vel.y = -Math.min(MAX_SPEED, Math.abs(vel.y) * 0.98);
        if (Math.abs(vel.y) < 520) vel.y = -(700 + Math.random() * 300);
      }

      const speed = Math.hypot(vel.x, vel.y);
      const jitter = Math.min(6, speed / 220);
      const wobbleX = Math.sin(now * 0.045 + wobbleSeed) * jitter;
      const wobbleY = Math.cos(now * 0.06 + wobbleSeed) * jitter;
      const pulse = 1 + 0.05 * Math.sin(now * 0.03 + wobbleSeed);

      sprite.style.left = `${pos.x}px`;
      sprite.style.top = `${pos.y}px`;
      sprite.style.transform = `rotate(${(vel.x / 6).toFixed(2)}deg) translate(${wobbleX.toFixed(1)}px, ${wobbleY.toFixed(1)}px) scale(${pulse.toFixed(3)})`;

      if (now - bounceStart < BOUNCE_DURATION) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setPhase('land');
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Phase 3: settle to the left of the intro text, then energized.png -> happy.png
  useEffect(() => {
    if (phase !== 'land') return undefined;
    const sprite = spriteRef.current;
    const target = document.getElementById('landing-photo-target');
    if (!sprite || !target) {
      onComplete?.();
      return undefined;
    }
    const targetRect = target.getBoundingClientRect();

    void sprite.offsetWidth; // flush the bounce's final position before transitioning
    sprite.style.transition = [
      `left ${LAND_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
      `top ${LAND_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
      `width ${LAND_DURATION}ms ease`,
      `height ${LAND_DURATION}ms ease`,
      `transform ${LAND_DURATION}ms ease`,
    ].join(', ');
    sprite.style.transform = 'rotate(0deg)';
    sprite.style.left = `${targetRect.left}px`;
    sprite.style.top = `${targetRect.top}px`;
    sprite.style.width = `${targetRect.width}px`;
    sprite.style.height = `${targetRect.height}px`;

    const settleTimer = setTimeout(() => {
      sprite.src = happy;
      onLanded?.();
      setTimeout(() => setPhase('exit'), HAPPY_HOLD);
    }, LAND_DURATION);

    return () => clearTimeout(settleTimer);
  }, [phase, onLanded, onComplete]);

  // Phase 4: fade the overlay away, real happy.png is already in place underneath
  useEffect(() => {
    if (phase !== 'exit') return undefined;
    const timer = setTimeout(() => onComplete?.(), EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  return (
    <div className={`loading-overlay ${phase === 'exit' ? 'loading-exit' : ''}`}>
      <div className="loading-bar-row">
        {phase === 'progress' && (
          <div className="loading-track">
            <div className="loading-fill" ref={fillRef} />
            <img src={coffee} alt="" className="loading-coffee" ref={coffeeRef} />
          </div>
        )}
        <img
          ref={spriteRef}
          src={tired}
          alt=""
          className={`loading-sprite ${phase === 'progress' ? 'loading-sprite-inline' : ''}`}
        />
        {phase === 'progress' && (
          <span className="loading-percent" ref={percentRef}>0%</span>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
