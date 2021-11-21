import styles from './inputContainer.module.css';

const InputContainer = ({
  placeholder,
  icon,
  type,
  showHideIcon,
  toggle,
  label,
  value,
  setValue,
  error,
}) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.label}>{label}</div>
      <div className={styles.inputWrapper}>
        <div className={styles.iconWrapper}>
          <img src={icon} />
        </div>
        <input
          className={error ? styles.inputerror : styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {showHideIcon && (
          <img
            src={showHideIcon}
            className={styles.showHideIcon}
            onClick={toggle}
          />
        )}
      </div>
    </div>
  );
};

export default InputContainer;
