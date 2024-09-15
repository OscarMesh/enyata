interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

export const GreetingsBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="lex flex-col gap-1">
      <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
        {title}
        {type === "greeting" && (
          <span className="text-cyan-600">&nbsp;{user}👋🏼</span>
        )}
      </h1>
      <p className="text-14 lg:text-16 font-normal text-gray-600">{subtext}</p>
    </div>
  );
};
