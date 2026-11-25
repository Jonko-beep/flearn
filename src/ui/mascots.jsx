// The course guides, drawn as simple flat characters so they look the
// same on every device (emoji faces differ between Windows, Mac and Android).
// Every drawing uses the same 120×120 grid: head centred low, eyes on y≈57.

const INK = "#2a1f1a";
const SHINE = "rgba(255,255,255,0.14)";

const BY_EMOJI = { "🦭": "walrus", "🐻": "bear", "🐿️": "chipmunk", "🐿": "chipmunk", "🦊": "fox", "🦡": "badger" };
const BY_COURSE = {
  investing: "walrus",
  "saving-budgeting": "bear",
  "real-estate-loans": "chipmunk",
  "fixed-income": "badger",
  options: "fox",
};
// Level titles in lib/gamification.js, in order.
const BY_LEVEL = ["bear", "chipmunk", "bear", "walrus", "fox"];

export const MASCOT_NAMES = {
  walrus: "Warren the Walrus",
  bear: "Benjamin the Bear",
  chipmunk: "Charlie the Chipmunk",
  fox: "Fischer the Fox",
  badger: "Bill the Badger",
};

/** Resolve a mascot id from an id, a course id, or one of the old emoji faces. */
export function mascotKey(value) {
  if (!value) return null;
  if (MASCOT_NAMES[value]) return value;
  return BY_COURSE[value] ?? BY_EMOJI[value] ?? null;
}

export function levelMascot(level) {
  return BY_LEVEL[Math.min(level, BY_LEVEL.length) - 1] ?? "bear";
}

function Eye({ x, y, r = 4.6, happy }) {
  if (happy) {
    return <path d={`M${x - 5} ${y + 1.5} q5 -6.5 10 0`} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />;
  }
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={INK} />
      <circle cx={x + 1.5} cy={y - 1.7} r={r * 0.38} fill="#fff" />
    </g>
  );
}

function Blush({ x, y }) {
  return <ellipse cx={x} cy={y} rx="6" ry="3.6" fill="#ff7f7f" opacity="0.32" />;
}

function Walrus({ happy }) {
  return (
    <g>
      <ellipse cx="60" cy="62" rx="40" ry="38" fill="#b28b75" />
      <ellipse cx="50" cy="38" rx="18" ry="8" fill={SHINE} />
      {/* tusks sit behind the whisker pads */}
      <path d="M51 84 L48.5 107 Q50.5 112 53.5 107.5 L58 86 Z" fill="#fffaf0" stroke="#d8c9b2" strokeWidth="1.2" />
      <path d="M69 84 L71.5 107 Q69.5 112 66.5 107.5 L62 86 Z" fill="#fffaf0" stroke="#d8c9b2" strokeWidth="1.2" />
      <circle cx="49.5" cy="76" r="14.5" fill="#e6c9ae" />
      <circle cx="70.5" cy="76" r="14.5" fill="#e6c9ae" />
      {[
        [43, 74], [48, 80], [42, 82], [53, 85],
        [77, 74], [72, 80], [78, 82], [67, 85],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill="#a3816a" />
      ))}
      <ellipse cx="60" cy="66" rx="8" ry="5.6" fill={INK} />
      <ellipse cx="57.5" cy="64.3" rx="2.4" ry="1.3" fill="#fff" opacity="0.5" />
      <Eye x={45} y={50} happy={happy} />
      <Eye x={75} y={50} happy={happy} />
      {/* Warren's reading glasses */}
      <circle cx="45" cy="50" r="10" fill="rgba(255,255,255,0.1)" stroke={INK} strokeWidth="2.6" />
      <circle cx="75" cy="50" r="10" fill="rgba(255,255,255,0.1)" stroke={INK} strokeWidth="2.6" />
      <path d="M55 49 q5 -3.5 10 0" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    </g>
  );
}

function Bear({ happy }) {
  return (
    <g>
      <circle cx="31" cy="35" r="13.5" fill="#8a5535" />
      <circle cx="31" cy="35" r="7" fill="#d9a27a" />
      <circle cx="89" cy="35" r="13.5" fill="#8a5535" />
      <circle cx="89" cy="35" r="7" fill="#d9a27a" />
      <circle cx="60" cy="65" r="38" fill="#9c6441" />
      <ellipse cx="50" cy="42" rx="16" ry="7" fill={SHINE} />
      <ellipse cx="60" cy="80" rx="19" ry="14.5" fill="#e8c29a" />
      <path d="M52.5 72.5 Q60 68 67.5 72.5 Q64.5 79 60 79.5 Q55.5 79 52.5 72.5 Z" fill={INK} />
      <path d="M60 79.5 v4 M53.5 84 q3.25 3.2 6.5 0 q3.25 3.2 6.5 0" fill="none" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
      <Eye x={46} y={59} happy={happy} />
      <Eye x={74} y={59} happy={happy} />
      <Blush x={37} y={71} />
      <Blush x={83} y={71} />
    </g>
  );
}

function Chipmunk({ happy }) {
  return (
    <g>
      <circle cx="36" cy="31" r="9.5" fill="#a9622f" />
      <circle cx="36" cy="31" r="5" fill="#f0c9a0" />
      <circle cx="84" cy="31" r="9.5" fill="#a9622f" />
      <circle cx="84" cy="31" r="5" fill="#f0c9a0" />
      <ellipse cx="60" cy="63" rx="37" ry="36" fill="#c9844c" />
      {/* forehead stripes */}
      <rect x="48.5" y="29" width="5" height="20" rx="2.5" fill="#f3dcbd" />
      <rect x="66.5" y="29" width="5" height="20" rx="2.5" fill="#f3dcbd" />
      <rect x="56.5" y="27.5" width="7" height="24" rx="3.5" fill="#6b3d20" />
      {/* light brow over each eye */}
      <path d="M36 52 q9 -7 18 -1" fill="none" stroke="#f3dcbd" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M84 52 q-9 -7 -18 -1" fill="none" stroke="#f3dcbd" strokeWidth="3.4" strokeLinecap="round" />
      {/* stuffed cheeks */}
      <ellipse cx="42" cy="78" rx="17.5" ry="14" fill="#f6e3c8" />
      <ellipse cx="78" cy="78" rx="17.5" ry="14" fill="#f6e3c8" />
      <path d="M53 77 q7 4.5 14 0" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="55.5" y="78.5" width="9" height="8.5" rx="2" fill="#fff" stroke="#e0d2bf" strokeWidth="1" />
      <path d="M60 79 v8" stroke="#e0d2bf" strokeWidth="1" />
      <ellipse cx="60" cy="70.5" rx="5.5" ry="4" fill={INK} />
      <Eye x={46} y={59} happy={happy} />
      <Eye x={74} y={59} happy={happy} />
      <Blush x={33} y={74} />
      <Blush x={87} y={74} />
    </g>
  );
}

function Fox({ happy }) {
  return (
    <g>
      <path d="M22 52 L29 13 L55 37 Z" fill="#d9672c" strokeLinejoin="round" />
      <path d="M29.5 45 L32.5 22.5 L47 36.5 Z" fill="#3b2318" />
      <path d="M98 52 L91 13 L65 37 Z" fill="#d9672c" strokeLinejoin="round" />
      <path d="M90.5 45 L87.5 22.5 L73 36.5 Z" fill="#3b2318" />
      <path d="M17 59 Q19 33 60 31 Q101 33 103 59 Q103 73 86 85 L67 100 Q60 105 53 100 L34 85 Q17 73 17 59 Z" fill="#ea7a3b" />
      <ellipse cx="50" cy="41" rx="16" ry="6.5" fill={SHINE} />
      <path d="M17 61 Q33 71 46 77 Q60 69 74 77 Q87 71 103 61 Q102 74 86 85 L67 100 Q60 105 53 100 L34 85 Q18 74 17 61 Z" fill="#fff4e6" />
      <ellipse cx="60" cy="97" rx="5.8" ry="4.2" fill={INK} />
      <ellipse cx="58" cy="95.6" rx="1.8" ry="1" fill="#fff" opacity="0.5" />
      {happy ? (
        <>
          <Eye x={45} y={61} happy />
          <Eye x={75} y={61} happy />
        </>
      ) : (
        <>
          <ellipse cx="45" cy="61" rx="3.8" ry="5" fill={INK} />
          <circle cx="46.3" cy="59" r="1.5" fill="#fff" />
          <ellipse cx="75" cy="61" rx="3.8" ry="5" fill={INK} />
          <circle cx="76.3" cy="59" r="1.5" fill="#fff" />
        </>
      )}
      <path d="M38 51.5 q7 -3.5 13 0.5 M82 51.5 q-7 -3.5 -13 0.5" fill="none" stroke="#a8461a" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}

function Badger({ happy }) {
  const stripe = "#2f2b29";
  return (
    <g>
      <circle cx="30" cy="40" r="11" fill="#3a3633" />
      <circle cx="30" cy="40" r="5.5" fill="#d8d1c5" />
      <circle cx="90" cy="40" r="11" fill="#3a3633" />
      <circle cx="90" cy="40" r="5.5" fill="#d8d1c5" />
      <ellipse cx="60" cy="65" rx="39" ry="36" fill="#f4efe6" />
      {/* the badger stripes run from the nose up over each eye */}
      <path d="M32 40 Q40 30 49 31 L57 80 Q56 87 51.5 84 Q37 66 32 40 Z" fill={stripe} />
      <path d="M88 40 Q80 30 71 31 L63 80 Q64 87 68.5 84 Q83 66 88 40 Z" fill={stripe} />
      <ellipse cx="60" cy="40" rx="7" ry="5" fill={SHINE} />
      {/* light rings keep the eyes readable on the dark stripes */}
      <circle cx="46" cy="58" r="7.2" fill="#f4efe6" />
      <circle cx="74" cy="58" r="7.2" fill="#f4efe6" />
      <Eye x={46} y={58} r={4.2} happy={happy} />
      <Eye x={74} y={58} r={4.2} happy={happy} />
      <ellipse cx="60" cy="88" rx="7" ry="5" fill={INK} />
      <ellipse cx="57.6" cy="86.4" rx="2.2" ry="1.2" fill="#fff" opacity="0.5" />
      <path d="M54 94.5 q3 3 6 0 q3 3 6 0" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <Blush x={32} y={76} />
      <Blush x={88} y={76} />
      {/* Bill's crown — the Bond King */}
      <path
        d="M46 32 L43.5 16 L52.5 23.5 L60 12.5 L67.5 23.5 L76.5 16 L74 32 Z"
        fill="#e9b44c"
        stroke="#b07d1f"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="45.5" y="28" width="29" height="4.5" rx="1.5" fill="#d49a2a" />
      <circle cx="43.5" cy="16" r="2.3" fill="#fff3c4" />
      <circle cx="60" cy="12.5" r="2.5" fill="#fff3c4" />
      <circle cx="76.5" cy="16" r="2.3" fill="#fff3c4" />
    </g>
  );
}

const DRAWINGS = { walrus: Walrus, bear: Bear, chipmunk: Chipmunk, fox: Fox, badger: Badger };

/** A mascot face. `who` takes a mascot id, a course id, or a legacy emoji. */
export function Mascot({ who, size = 64, happy = false, className, title }) {
  const key = mascotKey(who);
  const Drawing = DRAWINGS[key];
  if (!Drawing) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Drawing happy={happy} />
    </svg>
  );
}
