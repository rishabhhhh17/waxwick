export const tokens = {
  color: {
    bg: '#fdfaf5',
    surface: '#ffffff',
    bone: '#f5efe2',
    ink: '#1a120c',
    inkSoft: '#4d3120',
    muted: '#7a6657',
    ember: '#b85f24',
    emberDeep: '#9a4a18',
    line: '#ece2d1',
    success: '#3a6b3f',
    error: '#a4321e',
  },
  spacing: {
    section: 'py-20 md:py-28',
    sectionTight: 'py-14 md:py-20',
    container: 'mx-auto max-w-7xl px-5 md:px-8',
  },
  type: {
    h1: 'font-display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-ink',
    h2: 'font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.015em] text-ink',
    h3: 'font-display text-[22px] md:text-[28px] leading-[1.2] tracking-[-0.01em] text-ink',
    eyebrow: 'text-[12px] uppercase tracking-[0.18em] text-ember-600 font-medium',
    body: 'text-[16px] leading-[1.65] text-clay-700',
    small: 'text-[13px] leading-[1.5] text-clay-700',
  },
  radius: {
    sm: 'rounded-md',
    md: 'rounded-xl',
    lg: 'rounded-xl2',
    full: 'rounded-full',
  },
  shadow: {
    soft: 'shadow-soft',
    warm: 'shadow-warm',
  },
  motion: {
    base: 'transition-all duration-200 ease-out',
    slow: 'transition-all duration-300 ease-out',
  },
} as const;
