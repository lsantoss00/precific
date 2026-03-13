import React from "react";

type ColumnProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
};

const Column = ({
  as: Component = "div",
  className,
  children,
  ...props
}: ColumnProps) => {
  return (
    <Component className={`flex flex-col ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Column;
