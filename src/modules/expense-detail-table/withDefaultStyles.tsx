import { ComponentType, PropsWithChildren } from "react";

export const withDefaultStyles =
  <TStyles, P extends TStyles>(Component: ComponentType<P>, styles: TStyles) =>
  ({ children, ...props }: PropsWithChildren<P>) => {
    return (
      <Component {...styles} {...(props as P)}>
        {children}
      </Component>
    );
  };
