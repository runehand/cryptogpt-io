'use client';

import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export function useSearchParams() {
  const [searchParams, setSearchParams] = useState(() => new URLSearchParams());

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  return searchParams;
}
