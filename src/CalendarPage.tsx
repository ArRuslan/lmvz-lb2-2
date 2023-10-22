import React, {useState} from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Calendar, momentLocalizer, ToolbarProps} from 'react-big-calendar';
import moment from 'moment';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {addTaskGroup} from "./redux/tasksState";
import {useNavigate} from "react-router-dom";

const localizer = momentLocalizer(moment);

const CustomToolbar: React.FC<ToolbarProps> = ({label, onNavigate}) => {
    const navigate = useNavigate();

    return (
        <div className="rbc-toolbar space-between">
            <div>
                <button className="flex-start" onClick={() => navigate("/")}>Back to task list</button>
                <button className="flex-start" onClick={() => onNavigate('TODAY')}>Today</button>
            </div>

            <div>
                <button onClick={() => onNavigate('PREV')}>Back</button>
                <span className="rbc-toolbar-label">{label}</span>
                <button onClick={() => onNavigate('NEXT')}>Next</button>
            </div>
        </div>
    )
};

interface Params {
    taskId: number,
}

export default function CalendarPage({taskId}: Params) {
    const task = useSelector((state: RootState) => state.tasksState.tasks[taskId]);
    const [date, setDate] = useState<Date | null>(null);
    const [group, setGroup] = useState<string | null>("PZPI-22-6");
    const modalOpen = Boolean(date);
    const dispatch = useDispatch();

    const modalClose = () => setDate(null);

    const handleClickEvent = (slotInfo: {
        start: Date;
        end: Date;
        slots: Date[] | string[];
        action: 'select' | 'click' | 'doubleClick';
    }) => {
        if (slotInfo.action !== "doubleClick")
            return;
        setDate(slotInfo.start)
    };

    return (<>
        <div style={{textAlign: "center"}}>
            <h2 style={{marginBlock: 0}}>{task.name}</h2>
        </div>
        <Calendar
            localizer={localizer}
            events={task.groups}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
            components={{toolbar: CustomToolbar}}
            selectable={true}
            onSelectSlot={handleClickEvent}
        />
        <Dialog open={modalOpen} onClose={modalClose}>
            <DialogTitle>Select group to assign task</DialogTitle>

            <DialogContent>
                <Select value={group} label="Group" onChange={(e) => setGroup(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
                        const g = `PZPI-22-${i}`;
                        return <MenuItem value={g}>{g}</MenuItem>;
                    })}
                </Select>
            </DialogContent>

            <DialogActions>
                <Button onClick={modalClose}>Cancel</Button>

                <Button variant="contained" onClick={() => {
                    dispatch(addTaskGroup({task_id: task.id, group_d: {name: group!, date: date!}}))
                    modalClose()
                }}>Save</Button>
            </DialogActions>
        </Dialog>
    </>);
}
