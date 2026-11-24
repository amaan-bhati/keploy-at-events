import QRCode from "qrcode";
import { KeployMascot } from "./keploy-mascot";

/**
 * A Keploy-styled QR code, drawn as one inline SVG on the server.
 *
 * - Error correction "H" (30%), so the bunny in the centre never stops a scan.
 * - Data modules are round dots in a dark, warm ink (high contrast for phone
 *   cameras in dim venues); the three corner "eyes" use the Keploy orange to
 *   red gradient with dark centres.
 * - Everything is one path per layer, so it stays light even on old phones.
 */
export function KeployQr({ value, label }: { value: string; label: string }) {
  const qr = QRCode.create(value, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const dark = (r: number, c: number) => qr.modules.data[r * n + c] === 1;

  const pad = 2; // quiet zone inside the SVG; the white card adds more around it
  const view = n + pad * 2;

  // corner eyes: 7x7 at three corners
  const eyes: [number, number][] = [
    [0, 0],
    [0, n - 7],
    [n - 7, 0],
  ];
  const inEye = (r: number, c: number) => eyes.some(([er, ec]) => r >= er && r < er + 7 && c >= ec && c < ec + 7);

  // centre logo window (odd size, about 22% of the code), kept free of dots
  let logo = Math.round(n * 0.22);
  if (logo % 2 === 0) logo += 1;
  const logoStart = Math.floor((n - logo) / 2);
  const inLogo = (r: number, c: number) =>
    r >= logoStart && r < logoStart + logo && c >= logoStart && c < logoStart + logo;

  const radius = 0.5; // touching dots: decodes reliably at every size we tested (jsQR, with blur)
  let dots = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!dark(r, c) || inEye(r, c) || inLogo(r, c)) continue;
      const cx = c + pad + 0.5;
      const cy = r + pad + 0.5;
      dots += `M${(cx - radius).toFixed(2)} ${cy}a${radius} ${radius} 0 1 0 ${radius * 2} 0a${radius} ${radius} 0 1 0 ${-radius * 2} 0`;
    }
  }

  const eyeRing = (er: number, ec: number) => {
    const x = ec + pad;
    const y = er + pad;
    // 7x7 rounded square minus a 5x5 rounded square = a 1-module ring
    return `M${x + 2} ${y}h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z M${x + 2.2} ${y + 1}a1.2 1.2 0 0 0-1.2 1.2v2.6a1.2 1.2 0 0 0 1.2 1.2h2.6a1.2 1.2 0 0 0 1.2-1.2v-2.6a1.2 1.2 0 0 0-1.2-1.2z`;
  };
  const eyeDot = (er: number, ec: number) => {
    const x = ec + pad + 2;
    const y = er + pad + 2;
    return `M${x + 0.9} ${y}h1.2a0.9 0.9 0 0 1 0.9 0.9v1.2a0.9 0.9 0 0 1-0.9 0.9h-1.2a0.9 0.9 0 0 1-0.9-0.9v-1.2a0.9 0.9 0 0 1 0.9-0.9z`;
  };

  const logoBox = logoStart + pad;
  const inset = 0.35;

  return (
    <svg
      viewBox={`0 0 ${view} ${view}`}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id="kqr-ink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c1917" />
          <stop offset="100%" stopColor="#5a230d" />
        </linearGradient>
        <linearGradient id="kqr-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      {/* no background rect: the page draws a soft white halo behind the code
          that fades into the background, so there are no hard edges */}
      <path d={dots} fill="url(#kqr-ink)" />
      <path d={eyes.map(([r, c]) => eyeRing(r, c)).join(" ")} fill="url(#kqr-brand)" fillRule="evenodd" />
      <path d={eyes.map(([r, c]) => eyeDot(r, c)).join(" ")} fill="url(#kqr-ink)" />
      <rect
        x={logoBox + inset}
        y={logoBox + inset}
        width={logo - inset * 2}
        height={logo - inset * 2}
        rx={1.6}
        fill="#fff"
        stroke="#fed7aa"
        strokeWidth={0.18}
      />
      <KeployMascot
        x={logoBox + logo * 0.2}
        y={logoBox + logo * 0.14}
        width={logo * 0.6}
        height={logo * 0.72}
        viewBox="0 0 190 220"
        aria-hidden="true"
      />
    </svg>
  );
}
