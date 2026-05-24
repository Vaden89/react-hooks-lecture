export const Prose = ({
  info,
}: {
  info: { title: string; content: string }[];
}) => {
  return (
    <ul className="w-full text-fg-dim pl-4.5 my-2 mb-3.5 list-disc">
      {info.map((item, index) => (
        <li className="my-1 max-w-3xl" key={index}>
          <strong>{item.title}</strong> — {item.content}
        </li>
      ))}
    </ul>
  );
};
