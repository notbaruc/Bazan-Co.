import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.25}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.924 15.924 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0Zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.322-5.656-1.216-4.748-1.966-7.804-6.782-8.038-7.098-.226-.316-1.886-2.512-1.886-4.792 0-2.28 1.192-3.402 1.616-3.868.39-.428 1.028-.624 1.64-.624.196 0 .374.01.534.018.468.02.702.048 1.012.784.388.92 1.334 3.258 1.452 3.496.118.238.236.556.076.872-.15.324-.282.468-.52.738-.238.27-.464.476-.702.768-.22.254-.466.526-.196.994.27.46 1.2 1.978 2.578 3.204 1.772 1.576 3.264 2.066 3.73 2.292.466.226.738.188 1.008-.118.278-.316 1.186-1.382 1.504-1.856.31-.476.628-.392 1.058-.236.436.148 2.77 1.306 3.244 1.544.474.238.79.354.908.556.116.196.116 1.158-.274 2.256Z" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
      />
    </svg>
  );
}
