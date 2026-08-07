// The interactive floor plan (from the Robonexus repo), hosted directly on
// this site for the same reason the intro is: keeps the whole experience
// under one origin, so it's not a separate site the user has fully
// navigated away to, and the app's own refresh-to-home behavior (see
// App.tsx) covers this page too.
const FLOORPLAN_URL = `${import.meta.env.BASE_URL}assets/robonexus-floorplan/index.html`;

export function FloorplanPage() {
  return (
    <div className="fixed inset-0 bg-black z-50">
      <iframe
        src={FLOORPLAN_URL}
        title="Robonexus floor plan"
        allow="autoplay"
        className="absolute inset-0 block w-full h-full border-0"
      />
    </div>
  );
}
