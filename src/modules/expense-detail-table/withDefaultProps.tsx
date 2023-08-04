import { ComponentType, PropsWithChildren } from "react";

export const withDefaultProps =
  <P extends object>(Component: ComponentType<P>, styles: Partial<P>) =>
  ({ children, ...props }: PropsWithChildren<P>) => {
    return (
      <Component {...styles} {...(props as P)}>
        {children}
      </Component>
    );
  };
