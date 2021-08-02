import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import { IData } from '@screens/Default/models/IData';
import { RootState } from '@root/store';
import { fetchDataRoutine } from '@screens/Default/routines';
import { extractData } from '@screens/Default/reducers';
import LoaderWrapper from '@components/LoaderWrapper';
import { Button } from 'semantic-ui-react';

export interface IDefaultProps extends IState, IActions {
}

interface IState {
  data: IData;
}

interface IActions {
  fetchData: IBindingAction;
}

const Default: React.FC<IDefaultProps> = (
  { data, fetchData }
) => {
  useEffect(() => {
    fetchData();
  }, []);

  const sendSomething = () => {
    fetch('http://localhost:5000/data/hello',{
      method: 'GET',
      mode: 'no-cors'
    }).then();
  };

  return (
    <div>
      <Button loading={dataLoading} onClick={fetchData} disabled={dataLoading}>Fetch data</Button>
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
      <button onClick={sendSomething}>Send message</button>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state)
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Default);
