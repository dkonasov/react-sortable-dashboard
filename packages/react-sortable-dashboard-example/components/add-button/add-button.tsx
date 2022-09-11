import { ComponentProps, FC } from "react";
import { Button } from "../button/button";
import { Plus } from "../icons/plus";

export const AddButton: FC<ComponentProps<typeof Button>> = (props) => {
  const { children, ...restProps } = props;
  return (
    <Button {...restProps}>
      <Plus /> {children}
    </Button>
  );
};
