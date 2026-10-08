// Store global untuk state sidebar supaya tetap terbuka saat pindah halaman

let sidebarOpen = $state(true);

export const sidebar = {
  get open() { return sidebarOpen; },
  set open(val) { sidebarOpen = val; },
  toggle() { sidebarOpen = !sidebarOpen; },
  close() { sidebarOpen = false; },
};
