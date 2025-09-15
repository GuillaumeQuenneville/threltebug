import { mount, unmount } from "svelte";
import Widget from "./Widget.svelte";

const host = document.getElementById("host");
let app = null;

// helper: mount fresh into the same host element
function doMount() {
  console.log("[main] mount()");
  app = mount(Widget, { target: host });
}

// helper: idempotent unmount + clear host
function doUnmount() {
  if (!app) return;
  console.log("[main] unmount()");
  try {
    unmount(app);
  } catch (e) {
    console.warn("unmount error", e);
  }
  app = null;
  // ensure an identical fresh subtree next time
  host.replaceChildren();
}

// wire up buttons
document.getElementById("mount").addEventListener("click", () => {
  if (app) doUnmount();
  doMount();
});

document.getElementById("rerun").addEventListener("click", () => {
  // simulate a notebook cell re-run with proper teardown
  doUnmount();
  doMount();
});

document.getElementById("rerun-no-unmount").addEventListener("click", () => {
  // simulate a notebook re-run that *doesn't* unmount (leaks)
  console.log("[main] rerun without unmount()");
  doMount();
});

document.getElementById("unmount").addEventListener("click", () => {
  doUnmount();
});
