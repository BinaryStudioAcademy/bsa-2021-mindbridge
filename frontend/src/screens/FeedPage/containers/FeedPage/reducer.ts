import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataRoutine } from '@screens/FeedPage/routines';
import { IData } from '@screens/FeedPage/models/IData';

export interface IFeedPageReducerState {
  posts: any;
}

const initialState: IFeedPageReducerState = {
  posts: [{
    id: '80f08600-1b8f-11e8-9629-c7eca82aa7bd',
    userName: '',
    title: 'GraphCMS + Nuxt.js - Vote Your Favourite Tech Courses',
    text: 'The developer technology landscape changes all the time as new tools and technologies are introduced.\n'
      + ' After having lots of interviews and reading through countless job descriptions on job boards i think this\n'
      + ' is a great modern tech stack for JavaScript developers in 2021.\n'
      + ' The developer technology landscape changes all the time as new tools and technologies are introduced.\n'
      + ' After having lots of interviews and reading through countless job descriptions on job boards i think this\n'
      + ' is a great modern tech stack for JavaScript developers in 2021.',
    tags: [{ id: 1, name: 'IT' }, { id: 2, name: 'Code' }, { id: 3, name: 'Humor' }, { id: 4, name: 'Work' },
      { id: 5, name: 'Tech' }],
    date: 'May 28',
    timeRead: '7 min read',
    comments: '54',
    views: '367K',
    likes: '36K',
    dislikes: '18K'
  }]
};

export const feedPageReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IData>) => {
    state.posts = payload.posts;
  }
});
