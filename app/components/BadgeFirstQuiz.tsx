import { IoMdThumbsUp } from "react-icons/io";
const BadgeFirstQuiz = () => {
  return (
      <div className="flex items-center mb-2">
        <IoMdThumbsUp className="text-4xl text-green-500" />
        <p className="ml-2">First Quiz!</p>
      </div>
  );
}
export default BadgeFirstQuiz;
