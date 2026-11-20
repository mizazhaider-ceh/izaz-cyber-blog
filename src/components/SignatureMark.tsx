/*
 * SignatureMark: the one hand-drawn mark for izaz.dev.
 * A drawn "$ izaz" prompt mark: the dollar glyph and the letters are
 * stroke paths with slightly uneven weights and wobbles, so the mark
 * reads as hand-drawn, never as a font. The red cursor block is the
 * only filled shape, and red stays an accent, never a background.
 * Colours come from the site tokens: strokes use currentColor, the
 * cursor block uses the primary token, so the mark works in both
 * themes without a restyle.
 */

type SignatureMarkProps = {
  /** Height of the mark in pixels. Width follows the viewBox ratio. */
  size?: number;
  className?: string;
  /**
   * When true the mark is decorative (for example inside a link that
   * already has its own accessible name) and is hidden from
   * assistive technology. Otherwise it is exposed as an image.
   */
  decorative?: boolean;
  /** Accessible name used when the mark is not decorative. */
  label?: string;
};

export function SignatureMark({
  size = 32,
  className,
  decorative = false,
  label = "izaz.dev, drawn dollar prompt mark",
}: SignatureMarkProps) {
  return (
    <svg
      width={(size * 112) / 40}
      height={size}
      viewBox="0 0 112 40"
      fill="none"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      focusable="false"
      className={className}
    >
      {/* Dollar glyph, drawn, not typed: wobbled S curve and a slightly tilted vertical stroke. */}
      <path
        d="M 21 7 C 15 6.5, 10 9, 10.5 14 C 11 19, 16 19.5, 20 21 C 24 22.5, 25 26, 22 30 C 19 34, 12 34.5, 9 31"
        stroke="currentColor"
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 15.5 3.5 L 15 36.5"
        stroke="currentColor"
        strokeWidth={2.7}
        strokeLinecap="round"
      />
      {/* i: dot and a stem that leans a little. */}
      <circle cx="35" cy="9" r="1.9" fill="currentColor" stroke="none" />
      <path
        d="M 35 15.5 L 34.6 33"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* z: top bar, diagonal, bottom bar, none of them quite straight. */}
      <path
        d="M 42 16 L 54 15.5 L 43.5 32.5 L 55 32"
        stroke="currentColor"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* a: a round bowl with a stem on the right. */}
      <circle
        cx="65"
        cy="25"
        r="7.5"
        stroke="currentColor"
        strokeWidth={3.1}
        strokeLinecap="round"
      />
      <path
        d="M 72.5 16 L 72 33"
        stroke="currentColor"
        strokeWidth={2.9}
        strokeLinecap="round"
      />
      {/* z again, with its own small wobble. */}
      <path
        d="M 80 16 L 92 15.5 L 81.5 32.5 L 93 32"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cursor block: the one red accent, crisp against the drawn strokes. */}
      <rect x="99" y="14" width="9" height="18" rx="1" className="fill-primary" />
    </svg>
  );
}
