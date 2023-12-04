import "./Button.scss";

const Button = ({ text, onClicked, className, disable = false, style }) => {
  return (
    <button onClick={onClicked} className={`button ${className}`} style={style} disabled={disable}>
      {text}
    </button>
  );
};

export default Button;
