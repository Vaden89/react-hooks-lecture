export const Prose = ({
  info,
}: {
  info: {
    title: string;
    content: string;
    completed?: boolean;
    footnote?: string;
  }[];
}) => {
  return (
    <ul className="w-full text-fg-dim pl-4.5 my-2 mb-3.5 list-disc">
      {info.map((item, index) => (
        <li className="my-2 max-w-3xl" key={index}>
          <strong>{item.title}</strong> —{" "}
          <span className={item.completed ? "line-through" : ""}>
            {item.content}
          </span>
          {item.footnote && (
            <span className="block text-xs">{item.footnote}</span>
          )}
        </li>
      ))}
    </ul>
  );
};
