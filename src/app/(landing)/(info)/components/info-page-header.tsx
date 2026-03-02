import Column from "@/src/components/core/column";

interface InfoPageHeaderProps {
  title: string;
  description: string;
}

export default function InfoPageHeader({
  title,
  description,
}: InfoPageHeaderProps) {
  return (
    <Column as="header" className="mb-10">
      <Column className="relative mb-6 w-fit">
        <h1 className="z-10 text-4xl sm:text-5xl font-bold">{title}</h1>
      </Column>
      <p
        className="leading-7 text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Column>
  );
}
