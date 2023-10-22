import {configureStore} from '@reduxjs/toolkit';
import {tasksState, TasksState} from "./tasksState";

export interface RootState {
    tasksState: TasksState,
}

export default configureStore({
    reducer: {
        tasksState: tasksState.reducer,
    },
});