import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return <div className={`main__box ${className}`}>{children}</div>;
};

export default Card;
