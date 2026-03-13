import React from "react";

type RowProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
};

const Row = ({
  as: Component = "div",
  className,
  children,
  ...props
}: RowProps) => {
  return (
    <Component className={`flex flex-row ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Row;
