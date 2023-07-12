import { Link } from "react-router-dom";

export const BackButton = () => {
  return (
    <div className="max-w-[35px] max-h-[50px] p-1 rounded-full shadow-[3px_8px_12px_rgba(0,0,0,0.25)] text-center mb-11">
      <Link to="/">
        <i className="fa-solid fa-arrow-left fa-beat"></i>
      </Link>
    </div>
  );
};
