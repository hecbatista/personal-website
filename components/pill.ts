// Shared pill styles for links and buttons. Every pill is at least 44px tall.
const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 font-semibold no-underline";

export const pill = {
  accent: `${base} h-12 bg-accent text-white hover:bg-accent-hover hover:text-white`,
  dark: `${base} h-12 bg-ink text-white hover:bg-black hover:text-white`,
  grey: `${base} h-12 bg-pill text-ink hover:bg-[#E3E3E3] hover:text-ink`,
  footer: `${base} h-12 bg-[#E3E7EE] text-ink hover:bg-[#D7DCE5] hover:text-ink`,
};
