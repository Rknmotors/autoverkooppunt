'use client';

import { createElement, useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Zachte scroll-reveal, zelfde gedrag als het originele script:
 * - alles start zichtbaar;
 * - alleen elementen die bij het laden nog onder de vouw liggen (top > 92% van de viewport)
 *   krijgen de klasse "pre" en schuiven in zodra ze in beeld komen;
 * - geen animatie bij "prefers-reduced-motion" of zonder IntersectionObserver.
 * Eén gedeelde observer voor alle elementen; elk element wordt na het tonen losgelaten.
 */

type Callback = () => void;
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            callbacks.get(e.target)?.();
            callbacks.delete(e.target);
            observer?.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
  }
  return observer;
}

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'figure' | 'li';
  /** Volgorde binnen de stappenlijst: elke stap krijgt 0,12 s extra vertraging. */
  stagger?: number;
  children?: ReactNode;
};

export default function Reveal({ as = 'div', stagger = 0, className, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [pre, setPre] = useState(false);
  const [delay, setDelay] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add('js');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;
    setPre(true);
    setDelay(`${stagger * 0.12}s`);
    const io = getObserver();
    callbacks.set(el, () => setPre(false));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, [stagger]);

  return createElement(
    as,
    {
      ...rest,
      ref,
      className: `${className ? `${className} ` : ''}rv${pre ? ' pre' : ''}`,
      style: delay ? { ...style, transitionDelay: delay } : style,
    },
    children,
  );
}
