import { stat } from "fs";

const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case 'CREATE_TODO_LIST':
            return state;
        case 'CREATE_TODO_LIST_ERROR':
            return state;
        case 'UPDATE_NAME': 
            return state;
        case 'UPDATE_OWNER':
            return state;
        case 'SORT_BY_TASK':
            if(action.taskAscending) {   
                return {
                    ...state,
                    taskAscending: false
                };
            }else{
                return {
                    ...state,
                    taskAscending: true
                };
            }
        default:
            return state;
    }
};

export default todoListReducer;