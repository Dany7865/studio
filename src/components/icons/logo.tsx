import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-5" />
       <path d="M14.5 10.5c-1.28 1.28-1.28 3.32 0 4.6" />
      <path d="M17.5 7.5c2.49 2.49 2.49 6.51 0 9" />
    </svg>
  );
}
