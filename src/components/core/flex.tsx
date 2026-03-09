import React from "react";

type FlexProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
};

const Flex = ({
  as: Component = "div",
  className,
  children,
  ...props
}: FlexProps) => {
  return (
    <Component className={`flex ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Flex;
