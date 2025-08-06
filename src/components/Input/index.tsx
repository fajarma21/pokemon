import styles from './index.module.scss';
import type { InputProps } from './index.types';

const Input = ({ className, ...rest }: InputProps) => {
  return <input {...rest} className={`${styles.inputText} ${className}`} />;
};

export default Input;
