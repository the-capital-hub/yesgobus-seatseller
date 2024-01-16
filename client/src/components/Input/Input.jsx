import "./Input.scss";

const Input = ({
  title,
  type,
  placeholder,
  onChanged,
  givenName,
  isKyc,
  value,
  required,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChanged((prev) => {
      return { ...prev, [givenName]: e.target.value };
    });
  };
  const handleOnChange = isKyc ? handleChange : onChanged;
  return (
    <div className="Input">
      <span className="title">{title}</span>
      <input
        name={givenName}
        onChange={handleOnChange}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required || false}
      />
    </div>
  );
};

export default Input;
