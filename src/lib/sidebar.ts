export const SIDEBAR_STORAGE_KEY = "pexlora-sidebar";
const COLLAPSED = "collapsed";

export const sidebarInitScript = `(function(){try{if(localStorage.getItem("${SIDEBAR_STORAGE_KEY}")==="${COLLAPSED}"){document.documentElement.dataset.sidebar="${COLLAPSED}";}}catch(e){}})();`;

export function readSidebarCollapsed() {
  return document.documentElement.dataset.sidebar === COLLAPSED;
}

export function saveSidebarCollapsed(collapsed: boolean) {
  const root = document.documentElement;
  if (collapsed) root.dataset.sidebar = COLLAPSED;
  else delete root.dataset.sidebar;
  try {
    if (collapsed) localStorage.setItem(SIDEBAR_STORAGE_KEY, COLLAPSED);
    else localStorage.removeItem(SIDEBAR_STORAGE_KEY);
  } catch {}
}
