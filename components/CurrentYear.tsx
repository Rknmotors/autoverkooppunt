'use client';

import { useEffect, useState } from 'react';

/** Jaartal in de footer: wordt in de browser bijgewerkt naar het huidige jaar (zoals het origineel). */
export default function CurrentYear({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span id="yr">{year}</span>;
}
