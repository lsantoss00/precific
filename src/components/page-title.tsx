import Row from "@/src/components/core/row";
import { ReactNode } from "react";

interface PageTitleProps {
  icon: ReactNode;
  title: string;
}

const PageTitle = ({ icon, title }: PageTitleProps) => {
  return (
    <Row className="items-center gap-2">
      {icon}
      <h1 className="text-3xl font-semibold">{title}</h1>
    </Row>
  );
};

export default PageTitle;
