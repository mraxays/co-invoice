// Font configuration for all available fonts
export const FONTS = {
  serif: [
    {
      name: "Merriweather",
      value: "merriweather",
      family: "'Merriweather', serif",
    },
    {
      name: "Playfair Display",
      value: "playfair",
      family: "'Playfair Display', serif",
    },
    { name: "Lora", value: "lora", family: "'Lora', serif" },
    { name: "PT Serif", value: "pt-serif", family: "'PT Serif', serif" },
    { name: "Noto Serif", value: "noto-serif", family: "'Noto Serif', serif" },
    {
      name: "Libre Baskerville",
      value: "libre-baskerville",
      family: "'Libre Baskerville', serif",
    },
    { name: "Spectral", value: "spectral", family: "'Spectral', serif" },
    {
      name: "Crimson Text",
      value: "crimson-text",
      family: "'Crimson Text', serif",
    },
    { name: "Cormorant", value: "cormorant", family: "'Cormorant', serif" },
    {
      name: "Instrument Serif",
      value: "instrument-serif",
      family: "'Instrument Serif', serif",
    },
  ],
  sans: [
    { name: "Inter", value: "inter", family: "'Inter', sans-serif" },
    { name: "DM Sans", value: "dm-sans", family: "'DM Sans', sans-serif" },
    { name: "Poppins", value: "poppins", family: "'Poppins', sans-serif" },
    {
      name: "Montserrat",
      value: "montserrat",
      family: "'Montserrat', sans-serif",
    },
    {
      name: "Space Grotesk",
      value: "space-grotesk",
      family: "'Space Grotesk', sans-serif",
    },
    { name: "Roboto", value: "roboto", family: "'Roboto', sans-serif" },
    {
      name: "Open Sans",
      value: "open-sans",
      family: "'Open Sans', sans-serif",
    },
    { name: "Lato", value: "lato", family: "'Lato', sans-serif" },
    {
      name: "Source Sans Pro",
      value: "source-sans",
      family: "'Source Sans 3', sans-serif",
    },
    {
      name: "IBM Plex Sans",
      value: "ibm-plex-sans",
      family: "'IBM Plex Sans', sans-serif",
    },
    { name: "Nunito", value: "nunito", family: "'Nunito', sans-serif" },
    {
      name: "Work Sans",
      value: "work-sans",
      family: "'Work Sans', sans-serif",
    },
  ],
  mono: [
    {
      name: "IBM Plex Mono",
      value: "ibm-plex-mono",
      family: "'IBM Plex Mono', monospace",
    },
    {
      name: "Roboto Mono",
      value: "roboto-mono",
      family: "'Roboto Mono', monospace",
    },
    {
      name: "Source Code Pro",
      value: "source-code-pro",
      family: "'Source Code Pro', monospace",
    },
    {
      name: "JetBrains Mono",
      value: "jetbrains-mono",
      family: "'JetBrains Mono', monospace",
    },
    { name: "Fira Code", value: "fira-code", family: "'Fira Code', monospace" },
    {
      name: "Inconsolata",
      value: "inconsolata",
      family: "'Inconsolata', monospace",
    },
    { name: "PT Mono", value: "pt-mono", family: "'PT Mono', monospace" },
    {
      name: "Noto Sans Mono",
      value: "noto-sans-mono",
      family: "'Noto Sans Mono', monospace",
    },
  ],
};

// Get font family CSS string by value
export const getFontFamily = (fontValue) => {
  const allFonts = [...FONTS.serif, ...FONTS.sans, ...FONTS.mono];
  const font = allFonts.find((f) => f.value === fontValue);
  return font ? font.family : "'Inter', sans-serif";
};

// Get Tailwind class by font value (for fallback)
export const getFontClass = (fontValue) => {
  if (FONTS.serif.some((f) => f.value === fontValue)) return "font-serif";
  if (FONTS.mono.some((f) => f.value === fontValue)) return "font-mono";
  return "font-sans";
};
