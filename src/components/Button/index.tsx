import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.scss';

const Button = ({
  className,
  children,
  color,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      {...rest}
      className={`${styles.btnModifier} ${className}`}
      data-color={color}
    >
      {children}
    </button>
  );
};

export default Button;
