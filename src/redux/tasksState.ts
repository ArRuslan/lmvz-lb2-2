import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialTasks = {
    0: {id: 0, name: "Test 1", groups: []},
    1: {id: 1, name: "Test 2", groups: []},
    2: {id: 2, name: "Test 3", groups: []},
    3: {id: 3, name: "Test 4", groups: []},
    4: {id: 4, name: "Test 5", groups: []},
    5: {id: 5, name: "Test 6", groups: []},
    6: {id: 6, name: "Test 7", groups: []},
}

export interface GroupD {
    title: string,
    start: Date,
    end: Date,
    allDay: boolean,
}

export interface Task {
    id: number,
    name: string,
    groups: GroupD[],
}

export interface TasksState {
    tasks: {
        [key: number]: Task
    },
}

export const tasksState = createSlice({
    "name": "tasks",
    initialState: {
        tasks: initialTasks,
    } as TasksState,
    reducers: {
        addTask: (state: TasksState, action: PayloadAction<Task>) => {
            state.tasks[action.payload.id] = action.payload;
        },
        addTaskGroup: (state: TasksState, action: PayloadAction<{ task_id: number, group_d: {name: string, date: Date} }>) => {
            const groupD = {
                'title': action.payload.group_d.name,
                'allDay': true,
                'start': action.payload.group_d.date,
                'end': action.payload.group_d.date
            }
            state.tasks[action.payload.task_id].groups.push(groupD);
        },
    }
});

export const {addTask, addTaskGroup} = tasksState.actions;