import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { sortByTask } from '../../store/database/asynchHandler';
import { getFirestore } from 'redux-firestore';



class ItemsList extends React.Component {
    state = {
        taskAscending: false,
        dueDateAscending: false,
        statusAscending: false
    }

    sortByTask = () => {
        if(this.state.taskAscending){
            this.props.todoList.items.sort(function (a,b){
                if(a.description > b.description){
                    return 1;
                }
                if(a.description < b.description){
                    return -1;
                }
                return 0;
            });
        }
        if(!this.state.taskAscending){
            this.props.todoList.items.sort(function (a,b){
                if(a.description > b.description){
                    return -1;
                }
                if(a.description < b.description){
                    return 1;
                }
                return 0;
            });
        }
        const firestore = getFirestore();
        this.props.todoList.items.map(todoItem => todoItem.key = this.props.todoList.items.indexOf(todoItem));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.setState({
            taskAscending: !this.state.taskAscending
         })
    }
    
    sortByDueDate = () => {
        if(this.state.dueDateAscending){
            this.props.todoList.items.sort(function (a,b){
                if(a.due_date > b.due_date){
                    return 1;
                }
                if(a.due_date < b.due_date){
                    return -1;
                }
                return 0;
            });
        }
        if(!this.state.dueDateAscending){
            this.props.todoList.items.sort(function (a,b){
                if(a.due_date > b.due_date){
                    return -1;
                }
                if(a.due_date < b.due_date){
                    return 1;
                }
                return 0;
            });
        }
        const firestore = getFirestore();
        this.props.todoList.items.map(todoItem => todoItem.key = this.props.todoList.items.indexOf(todoItem));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.setState({
            dueDateAscending: !this.state.dueDateAscending
         })
    }

    sortByStatus = () => {
        if(this.state.statusAscending){
            this.props.todoList.items.sort(function (a,b){
                if(a.completed > b.completed){
                    return -1;
                }
                if(a.completed < b.completed){
                    return 1;
                }
                return 0;
            });
        }
        if(!this.state.statusAscending){
            this.props.todoList.items.sort(function (a,b){
                if(a.completed > b.completed){
                    return 1;
                }
                if(a.completed < b.completed){
                    return -1;
                }
                return 0;
            });
        }
        const firestore = getFirestore();
        this.props.todoList.items.map(todoItem => todoItem.key = this.props.todoList.items.indexOf(todoItem));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.setState({
            statusAscending: !this.state.statusAscending
         })
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="row">
                    <div className="card blue-grey darken-1 horizontal">
                        <div className="task-header col s4" onClick={this.sortByTask}>Task</div>
                        <div className="date-header col s4" onClick={this.sortByDueDate}>Due Date</div>
                        <div className="status-header col s4" onClick={this.sortByStatus}>Status</div>
                    </div>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={'/todoList/' + todoList.id + '/' + item.id}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                    );})
                }
                <div className="row">
                    <div className="card blue-grey darken-1">
                        <Link to={'/todoList/' + todoList.id + '/new'}>
                            <div className="flow-text white-text add-card">+</div>
                        </Link>
                    </div>                   
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sortByTask: (taskAscending) => dispatch(sortByTask(taskAscending))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);