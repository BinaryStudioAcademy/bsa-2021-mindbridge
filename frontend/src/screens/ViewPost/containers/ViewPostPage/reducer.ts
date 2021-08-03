import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataRoutine } from '@screens/Default/routines';
import { IData } from '@screens/ViewPost/models/IData';

export interface IViewPostReducerState {
  posts: any;
}

const initialState: IViewPostReducerState = {
  posts: [{
    id: '25g04522-2f6f-a5f8-s4aa-5ac2f82ff1ad',
    title: 'Modern Full-Stack Developer Tech Stack 2021',
    /* eslint-disable max-len */
    imgSource: 'https://i0.wp.com/vincenttechblog.com/wp-content/uploads/2020/12/computer_designs.jpg?fit=1200,630&ssl=1',
    likes: '3696',
    tags: ['IT', 'Code', 'Humor', 'Work', 'Tech'],
    userName: 'Nolan Saris',
    date: 'May 28',
    timeRead: '7 min read',
    text: 'Envision this: there is a technology currently undergoing testing that, when released \n'
      + ' to the public, will become a long-awaited revolution in energy. This new technology \n'
      + 'promises to be safer and more efficient than anything we have on the market now. It \n'
      + 'will affect that which we consider mundane — power tools, toys, laptops, smartphones — \n'
      + 'and that which we consider exceptional — medical devices, spacecraft, and the innovative \n'
      + 'new vehicle designs needed to wean us off of fossil fuels. We have known about this \n'
      + 'technology for centuries, yet until now we have only been able to take small steps towards \n'
      + 'its creation. Billions of dollars are pouring into research and billions more will be made once the \n'
      + 'technology has been perfected and released. \n'
      + '\n'
      + 'This description may sound a lot like that of fusion power. Yet it’s actually referring to the\n'
      + 'upcoming innovations in the realm of battery technology — specifically that of solid-state \n'
      + 'batteries. And while both fusion power and solid-state batteries have been labeled \n'
      + 'technologies of the future but never of today, advancements and investments in solid-state \n'
      + 'materials have increased tremendously over the years. Today not only are there many major\n'
      + 'companies and credible researchers involved, it seems we may finally start seeing these \n'
      + 'batteries released in just the next few years.\n'
      + '\n'
      + 'What can we expect once this elusive, transformative technology is finally ready for mass production?\n'
  }]
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IData>) => {
    state.posts = payload.posts;
  }
});
