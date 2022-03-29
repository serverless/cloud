export default function TypingIndicator() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="6"
      viewBox="0 0 24 6"
    >
      <g>
        <style jsx>
          {`
            .dot {
              fill: rgba(0, 0, 0, 0.7);
              transform-origin: 50% 50%;
              animation: ball-beat 1.1s 0s infinite
                cubic-bezier(0.445, 0.05, 0.55, 0.95);
            }
            .dot:nth-child(2) {
              animation-delay: 0.3s !important;
            }
            .dot:nth-child(3) {
              animation-delay: 0.6s !important;
            }
            @keyframes ball-beat {
              0% {
                opacity: 0.7;
              }
              33.33% {
                opacity: 0.55;
              }
              66.67% {
                opacity: 0.4;
              }
              100% {
                opacity: 1;
              }
            }
          `}
        </style>
        <circle className="dot" cx="3" cy="3" r="3" />
        <circle className="dot" cx="12" cy="3" r="3" />
        <circle className="dot" cx="21" cy="3" r="3" />
      </g>
    </svg>
  );
}
