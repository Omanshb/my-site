"use client";

import { useEffect, useState } from "react";

/** Side-by-side fixed hero only when there is enough width and height. */
const HOME_FIXED_LAYOUT_MEDIA =
  "(min-width: 1250px) and (min-height: 675px)";

export function useHomeFixedLayout() {
  // Always false on the server and first client render so HTML matches during
  // hydration. The real viewport check runs in useEffect after mount.
  const [useFixedLayout, setUseFixedLayout] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOME_FIXED_LAYOUT_MEDIA);
    const updateLayout = () => setUseFixedLayout(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  return useFixedLayout;
}
