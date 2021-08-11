import React, { FunctionComponent } from 'react';
import { Loader } from 'semantic-ui-react';
import { LoaderProps } from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';

interface ILoaderWrapperProps extends LoaderProps {
  loading: boolean;
}

const LoaderWrapper: FunctionComponent<ILoaderWrapperProps> = ({ loading, children, ...props }) => (
  loading
    ? (
      <Loader active {...props} />
    ) : (
      <>
        {children}
      </>
    )
);

export default LoaderWrapper;
