/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createFavouritesPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`FAVOURITES_PAGE:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
