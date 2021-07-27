import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import { IData } from '@screens/Default/models/IData';
import { RootState } from '@root/store';
import { fetchDataRoutine } from '@screens/Default/routines';
import { extractData } from '@screens/Default/reducers';

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

  return (
    <div>
      <h1>Inner component</h1>
      <span>Data loaded: </span>
      <span>{data.message}</span>
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
