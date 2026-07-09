import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

// Same Firebase Realtime Database project the Robonexus floor plan
// (github.com/PragathiBhat/Robonexus) reads/writes -- this lets a scenario
// button here remotely select that marker on the floor plan, exactly as if
// a visitor had clicked it there directly, over any two devices with
// internet access (no shared network required).
const firebaseConfig = {
  apiKey: 'AIzaSyBfE0RK4fY1A4zemKQSwl8G3KI1AcHTk_c',
  authDomain: 'robonexus-22d2e.firebaseapp.com',
  databaseURL: 'https://robonexus-22d2e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'robonexus-22d2e',
  storageBucket: 'robonexus-22d2e.firebasestorage.app',
  messagingSenderId: '596614791257',
  appId: '1:596614791257:web:59604dd5fc89a440f13148',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Maps this site's scenario ids to the floor plan's data-marker-id values.
export const SCENARIO_MARKER_IDS: Record<string, number> = {
  'market-1': 0,
  'event-1': 1,
  'event-2': 2,
  'playground-1': 3,
  'playground-2': 4,
  'market-2': 5,
};

export function triggerScenarioMarker(scenarioId: string): void {
  const markerId = SCENARIO_MARKER_IDS[scenarioId];
  if (markerId === undefined) return;
  set(ref(db, 'activeMarker'), { marker: markerId, ts: Date.now() }).catch((err) => {
    console.warn('Could not reach the Robonexus sync database:', err);
  });
}

// Fired once when a visitor lands on the Explore page (not on every
// scenario click) -- tells the display device(s) to hard-reload, so each
// demo session starts from a clean page load. Deliberately not called on
// leaving the Explore page; nothing should happen to the display then.
export function triggerDisplayReload(): void {
  set(ref(db, 'displayReload'), Date.now()).catch((err) => {
    console.warn('Could not reach the Robonexus sync database:', err);
  });
}

// Fires `onActivity` whenever a scenario marker is selected on the shared
// channel, regardless of which device/page triggered it -- our own scenario
// buttons, a click on floorplan.html, anywhere. Used to pulse the particle
// background in sync with the video/floor-plan reveal elsewhere. Skips the
// value already sitting in the database when this subscription starts, so
// merely loading the page doesn't fire it immediately.
export function subscribeToScenarioActivity(onActivity: () => void): () => void {
  let first = true;
  const unsubscribe = onValue(ref(db, 'activeMarker'), () => {
    if (first) {
      first = false;
      return;
    }
    onActivity();
  });
  return unsubscribe;
}
