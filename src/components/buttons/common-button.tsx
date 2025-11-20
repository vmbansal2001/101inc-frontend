import React, { ElementType } from "react";
import { BeatLoader } from "react-spinners";

type Props = {
  className?: string;
  as?: ElementType;
  loaderColor?: string;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  buttonId?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
};

const Button = ({
  className,
  children,
  as: Component = "button",
  loading,
  loaderColor,
  onClick,
  disabled,
  buttonRef,
  buttonId,
  style,
}: Props) => {
  const buttonClickHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      id={buttonId}
      ref={buttonRef}
      disabled={disabled || loading}
      className={`${className} ${
        loading
          ? "cursor-wait"
          : disabled
          ? "cursor-not-allowed"
          : "cursor-pointer"
      }`}
      type="button"
      onClick={buttonClickHandler}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      style={style}
    >
      {loading ? <BeatLoader color={loaderColor} size={8} /> : children}
    </Component>
  );
};

export default Button;

Button.defaultProps = {
  className: "",
  loaderColor: "#00ffc3",
  loading: false,
  onClick: () => {},
  disabled: false,
};
