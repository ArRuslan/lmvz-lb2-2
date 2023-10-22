import CalendarPage from "./CalendarPage";
import TasksListPage from "./TasksListPage";
import {BrowserRouter, Route, Routes, useParams, Navigate} from "react-router-dom";
import store from "./redux/store";


function CalendarPageWrapper() {
    const params = useParams();
    if(params.taskId && store.getState().tasksState.tasks[Number(params.taskId)])
        return <CalendarPage taskId={Number(params.taskId)}/>
    return <Navigate to="/" replace />
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<TasksListPage/>}/>
                <Route index path="/:taskId" element={<CalendarPageWrapper/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
