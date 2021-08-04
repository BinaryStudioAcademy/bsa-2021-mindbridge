import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import { IData } from '@screens/Default/models/IData';
import { RootState } from '@root/store';
import { fetchDataRoutine } from '@screens/Default/routines';
import { extractData, extractFetchDataError, extractFetchDataLoading } from '@screens/Default/reducers';
import LoaderWrapper from '@components/LoaderWrapper';

export interface IDefaultProps extends IState, IActions {
}

interface IState {
  data: IData;
  dataLoading: boolean;
  dataError?: string;
}

interface IActions {
  fetchData: IBindingAction;
}

const Default: React.FC<IDefaultProps> = (
  { data, fetchData, dataError, dataLoading }
) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendSomething = () => {
    fetch('/api/data/hello', {
      method: 'GET',
      mode: 'no-cors'
    }).then();
  };

  return (
    <div>
      <SemanticButtonExample
        loading={dataLoading}
        onClick={fetchData}
        disabled={dataLoading}
      >
        Fetch data
      </SemanticButtonExample>
      <SemanticButtonExample
        onClick={sendSomething}
      >
        Send socket
      </SemanticButtonExample>
      <LoaderWrapper loading={dataLoading}>
        <h1>Inner component</h1>
        {dataError ? (
          <p>{`Error: ${dataError}`}</p>
        ) : (
          <>
            <span>Data loaded: </span>
            <span>{data.message}</span>
          </>
        )}
      </LoaderWrapper>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  dataLoading: extractFetchDataLoading(state),
  dataError: extractFetchDataError(state)
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Default);
