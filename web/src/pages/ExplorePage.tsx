// The full particle-formation intro (Three.js scene + reveal video +
// narration), from the ROBONEXUS-OPENING repo, hosted directly on this site
// so this page doesn't depend on the separate Robonexus repo's state. It's
// embedded via iframe rather than ported into React since it's a large,
// self-contained canvas/WebGL scene. Its own script hands the top-level
// page off to the floor plan once the narration ends or Skip is clicked --
// see public/assets/robonexus-opening/index.html.
// Uses Vite's BASE_URL (e.g. "/umbau-new-webpage/" in production, "/"
// locally) rather than a hardcoded root-relative path, since this site is
// deployed under a repo subpath on GitHub Pages.
const INTRO_URL = `${import.meta.env.BASE_URL}assets/robonexus-opening/index.html`;

export function ExplorePage() {
  return (
    <div className="fixed inset-0 bg-black z-50">
      <iframe
        src={INTRO_URL}
        title="Robonexus intro"
        allow="autoplay"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
