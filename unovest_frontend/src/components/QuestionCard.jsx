const QuestionCard = ({
  className = "",
  number,
  label,
  subtitle,
  subtitlePostion,
}) => {
  return (
    <div
      className="question-card-container bg-question-Card-gradiant1"
      style={{
        background:
          "linear-gradient(184deg, rgba(24, 33, 50, 0.20) 2.7%, rgba(24, 34, 51, 0.20) 96.07%)",
      }}
    >
      <div className="small-media-div question-card-number-div lg:bg-question-number-gradiant">
        <div className="small-media-div question-card-number-subdiv">
          {number}
        </div>
      </div>

      <div className="text-grey-2 lg:text-accent-bright-green relative">
        <p
          className={`small-heading lg:text-[1.2vw] question-card-heading ${className ? className : "leading-6 lg:leading-[1.6rem]"}  `}
        >
          {label}
        </p>

        {subtitle && (
          <p
            className={`question-card-subtitle ${subtitlePostion ? subtitlePostion : ""}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
