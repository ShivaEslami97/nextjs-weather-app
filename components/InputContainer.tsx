import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  type: string;
  placeholder?: string;
  iconAlt: string;
  iconsrc: string;
};

const InputContainer = ({
  className,
  type,
  placeholder,
  iconAlt,
  iconsrc,
}: Props) => {
  return (
    <div className={`auth__input-container ${className}`}>
      <Image width={25} height={25} src={iconsrc} alt={iconAlt} />
      <input type={type} className="auth__input" placeholder={placeholder} />
    </div>
  );
};

export default InputContainer;
