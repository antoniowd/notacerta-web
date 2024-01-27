import React, { ReactNode, Suspense } from "react";
import SectionLoading from "../components/loading/SectionLoading";

type ReturnType<T> = (props: T) => JSX.Element;

export const withLoading = <T extends object>(
  Component: React.ComponentType<T>,
  loading?: ReactNode,
): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={loading || <SectionLoading />}>
      <Component {...props} />
    </Suspense>
  );
};
