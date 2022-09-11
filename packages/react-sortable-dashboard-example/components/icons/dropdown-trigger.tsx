import { FC, HTMLAttributes } from "react";

export const DropdownTrigger: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.12004 1.29001L6.00004 5.17001L9.88004 1.29001C9.97262 1.19742 10.0825 1.12399 10.2035 1.07388C10.3245 1.02378 10.4541 0.997986 10.585 0.997986C10.716 0.997986 10.8456 1.02378 10.9666 1.07388C11.0875 1.12399 11.1975 1.19742 11.29 1.29001C11.3826 1.38259 11.4561 1.4925 11.5062 1.61346C11.5563 1.73443 11.5821 1.86408 11.5821 1.99501C11.5821 2.12594 11.5563 2.25559 11.5062 2.37655C11.4561 2.49751 11.3826 2.60742 11.29 2.70001L6.70004 7.29001C6.60752 7.38271 6.49763 7.45626 6.37666 7.50644C6.25569 7.55662 6.12601 7.58245 5.99504 7.58245C5.86407 7.58245 5.73439 7.55662 5.61341 7.50644C5.49244 7.45626 5.38255 7.38271 5.29004 7.29001L0.700037 2.70001C0.607333 2.60749 0.533785 2.4976 0.483604 2.37663C0.433422 2.25566 0.407593 2.12598 0.407593 1.99501C0.407593 1.86404 0.433422 1.73436 0.483604 1.61338C0.533785 1.49241 0.607333 1.38252 0.700037 1.29001C1.09004 0.910007 1.73004 0.900007 2.12004 1.29001Z"
      fill="black"
    />
  </svg>
);
