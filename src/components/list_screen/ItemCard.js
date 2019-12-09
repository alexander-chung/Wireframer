import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { sortByTask } from '../../store/database/asynchHandler';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';


class ItemCard extends React.Component {

    deleteItem = (item) => {
        var x = this.props.todoList.items.indexOf(item);
        this.props.todoList.items.splice(x,1);
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.props.todoList.items.map(todoItem => todoItem.key = this.props.todoList.items.indexOf(todoItem));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
    }

    moveItemUp = (item) => {

        const firestore = getFirestore();
        var i = this.props.todoList.items.indexOf(item);
        var temp = this.props.todoList.items[i-1];
        this.props.todoList.items[i-1] = this.props.todoList.items[i];
        this.props.todoList.items[i] = temp;
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.props.todoList.items.map(todoItem => todoItem.key = this.props.todoList.items.indexOf(todoItem));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
    }

    moveItemDown = (item) => {
        const firestore = getFirestore();
        var i = this.props.todoList.items.indexOf(item);
        var temp = this.props.todoList.items[i+1];
        this.props.todoList.items[i+1] = this.props.todoList.items[i];
        this.props.todoList.items[i] = temp;
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.props.todoList.items.map(todoItem => todoItem.key = this.props.todoList.items.indexOf(todoItem));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
    }

    preventDef = (e) => {
        e.preventDefault();
    } 

    componentDidMount(){
        var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems, {
              direction: 'left'
            });
    }
            
    render() {
        const { item } = this.props; 
        let isFirst = (item.key === 0);
        let isLast = (item.key === this.props.todoList.items.length-1)
 
        if(item.completed){
            return (
                <div className="row">
                    <div className="card z-depth-3 todo-list-link green accent-2">
                            <div className="row">
                                <div className="item-description">{item.description}</div>
                            </div>
                            <div className="row">
                                <div className="col s4">Assigned to: {item.assigned_to}</div>
                                <div className="col s4">{item.due_date}</div>
                                {item.completed ? <div className="col s4">Completed</div>: <div className="col s4">Pending</div>}
                                <div className="fixed-action-btn" onClick={this.preventDef}>
                                    <div className="btn-floating btn-medium blue setting-button">
                                        <i className="large material-icons">settings</i>
                                    </div>
                                    <ul>
                                        <li><div className={isFirst ? "btn-floating indigo disabled" : "btn-floating indigo"}><i className="large material-icons" onClick={this.moveItemUp.bind(this,item)}>keyboard_arrow_up</i></div></li>
                                        <li><div className={isLast ? "btn-floating indigo lighten-3 disabled" : "btn-floating indigo lighten-1"}><i className="large material-icons" onClick={this.moveItemDown.bind(this,item)}>keyboard_arrow_down</i></div></li>
                                        <li><div className="btn-floating black" onClick={this.deleteItem.bind(this,item)}><i className="large material-icons">delete</i></div></li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </div>
                
            );
        }else{
            return (
                <div className="row">
                    <div className="card z-depth-3 todo-list-link red accent-2">
                            <div className="row">
                                <div className="item-description">{item.description}</div>
                            </div>
                            
                            <div className="row">
                                <div className="col s4">Assigned to: {item.assigned_to}</div>
                                <div className="col s4">{item.due_date}</div>
                                {item.completed ? <div className="col s4">Completed</div>: <div className="col s4">Pending</div>}
                                <div className="fixed-action-btn" onClick={this.preventDef}>
                                    <div className="btn-floating btn-medium blue setting-button">
                                        <i className="large material-icons">settings</i>
                                    </div>
                                    <ul>
                                        <li><div className={isFirst ? "btn-floating indigo disabled" : "btn-floating indigo"}><i className="large material-icons" onClick={this.moveItemUp.bind(this,item)}>keyboard_arrow_up</i></div></li>
                                        <li><div className={isLast ? "btn-floating indigo lighten-3 disabled" : "btn-floating indigo lighten-1"}><i className="large material-icons" onClick={this.moveItemDown.bind(this,item)}>keyboard_arrow_down</i></div></li>
                                        <li><div className="btn-floating black" onClick={this.deleteItem.bind(this,item)}><i className="large material-icons" >delete</i></div></li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </div>
            );
        }
    }
}
export default compose(
    connect(),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemCard);