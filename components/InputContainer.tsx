import Image from "next/image";
import { forwardRef, ReactNode } from "react";

type Props = {
  className?: string;
  type: string;
  placeholder?: string;
  iconAlt: string;
  iconsrc: string;
};
type Ref = HTMLInputElement;

const InputContainer = forwardRef<Ref, Props>(function InputContainer(
  props,
  ref
) {
  const { className, iconsrc, iconAlt, placeholder, type } = props;

  return (
    <div className={`auth__input-container ${className}`}>
      <Image width={25} height={25} src={iconsrc} alt={iconAlt} />
      <input
        type={type}
        ref={ref}
        className="auth__input"
        placeholder={placeholder}
      />
    </div>
  );
});

export default InputContainer;
