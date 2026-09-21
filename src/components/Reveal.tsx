import { type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
};

/** Static wrapper — scroll reveal animations disabled site-wide */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const Component = Tag as ElementType;
  return <Component className={className}>{children}</Component>;
}
