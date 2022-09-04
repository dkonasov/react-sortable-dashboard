import { FC, HTMLAttributes } from "react";

export const Arrow: FC<HTMLAttributes<SVGElement>> = (props) => {
  const { className, ...restProps } = props;

  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 5L5 0L10 5H0Z" fill="black" />
    </svg>
  );
};
