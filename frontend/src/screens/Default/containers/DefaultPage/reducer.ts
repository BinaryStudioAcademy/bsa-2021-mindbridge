import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '@screens/Default/models/IData';
import { fetchDataRoutine } from '@screens/Default/routines';

export interface IDefaultReducerState {
  message: string;
}

const initialState: IDefaultReducerState = {
  message: 'Empty string'
};

export const defaultReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IData>) => {
    state.message = payload.message;
  }
});
