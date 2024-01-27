import React, { ReactNode, Suspense } from "react";
// import { Loading } from '@app/components/common/Loading';

const Loading = () => <div>loading...</div>;

type ReturnType<T> = (props: T) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-types
export const withLoading = <T extends object>(
  Component: React.ComponentType<T>,
  loading?: ReactNode,
): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={loading || <Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
