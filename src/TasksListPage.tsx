import {List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {useNavigate} from "react-router-dom";

export default function TasksListPage() {
    const tasks = useSelector((state: RootState) => state.tasksState.tasks);
    const navigate = useNavigate();

    const subheader = (
        <ListSubheader component="div">
            All Tasks ({Object.keys(tasks).length})
        </ListSubheader>
    );

    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}} component="nav" subheader={subheader}>
            {Object.values(tasks).map(task => (
                <ListItemButton onClick={() => navigate(`/${task.id}`)}>
                    <ListItemIcon>
                        <TaskAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary={task.name}/>
                </ListItemButton>
            ))}
        </List>
    );
}