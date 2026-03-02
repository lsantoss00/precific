import { InfoTopicType } from "@/src/app/(landing)/types/info-topic-type";
import Column from "@/src/components/core/column";

interface InfoPageTopicsProps {
  topics: InfoTopicType[];
}

export default function InfoPageTopics({ topics }: InfoPageTopicsProps) {
  return (
    <Column className="space-y-10">
      {topics?.map((topic, index) => (
        <section key={topic?.title || `topic-${index}`}>
          <h2 className="mb-4 text-xl font-bold leading-8">{topic?.title}</h2>
          <p className="mb-3 leading-7 text-muted-foreground">
            {topic?.content}
          </p>
          {topic?.items && topic.items.length > 0 && (
            <ol className="ml-4 list-inside list-decimal space-y-2">
              {topic.items.map((item, itemIndex) => (
                <li
                  key={`${topic?.title}-item-${itemIndex}`}
                  className="leading-7 text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </Column>
  );
}
