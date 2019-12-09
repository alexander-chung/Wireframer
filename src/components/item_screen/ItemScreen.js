import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { tsCallSignatureDeclaration, tsExpressionWithTypeArguments } from '@babel/types';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';


class ItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.recItem.description,
            assigned_to: this.props.recItem.assigned_to,
            due_date: this.props.recItem.due_date,
            completed: this.props.recItem.completed,
            cancelled: false
        };
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
    }

    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    
    handleAssignedToChange = (e) => {
        this.setState({
            assigned_to: e.target.value
        })
    }

    handleDueDateChange = (e) => {
        this.setState({
            due_date: e.target.value
        })
    }

    handleCompletedChange = (e) => {
        this.setState({
            completed: e.target.checked
        })
    }

    confirmEdit = (item) => {
        this.props.todoList.items[this.props.itemKey] = item;
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.props.todoList.items.map(todoItem => todoItem.key = this.props.todoList.items.indexOf(todoItem));
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.todoList.items
        })
        this.setState({
            cancelled: true
        })
    }

    cancelEdit = () => {
        this.setState({
            cancelled: true
        })
    }

    // componentDidMount() {
    //     var elems = document.querySelectorAll('.datepicker');
    //     var instances = M.Datepicker.init(elems, { autoClose: true, format: 'yyyy-mm-dd' });
    // }

    render() {
        const {description, assigned_to, completed, due_date} = this.state
        var item = {
            assigned_to: this.state.assigned_to,
            description: this.state.description,
            due_date: this.state.due_date,
            completed: this.state.completed,
            key: this.props.itemKey
        }
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        const items = todoList.items;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (this.state.cancelled) {
            return <Redirect to={"/todoList/" + todoList.id} />;
        }
        return (
            <div className="row item_background">
                <form className="col s12">
                    <h3>Item</h3>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="description" type="text" value={description} onChange={this.handleDescriptionChange}/>
                            <label className={"active"} htmlFor="description">Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="assigned-to" type="text" value={assigned_to} onChange={this.handleAssignedToChange}/>
                            <label className={"active"} htmlFor="assigned-to">Assigned To</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="due-date" type="date" className="datepicker" value={due_date} onChange={this.handleDueDateChange}/>
                            <label className={"active"} htmlFor="due-date">Due Date</label>
                        </div>
                    </div>
                    <label>
                        <input type="checkbox" onChange={this.handleCompletedChange} checked={completed}/>
                        <span>Completed</span>
                    </label>
                    <div className="row">
                        <a className="waves-effect waves-light btn-flat item-button" onClick={this.confirmEdit.bind(this, item)}>Submit</a>
                        <a className="waves-effect waves-light btn-flat item-button" onClick={this.cancelEdit}>Cancel</a>
                    </div>
                    <div className="row">

                    </div>
                </form>
            </div>
        );
    }



}

const mapStateToProps = (state, ownProps) => {
    const { id, key } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    const itemKey = key;
    const recItem = todoList.items[key]
    if(todoList){
        todoList.id = id;
      }
    return {
      recItem,  
      todoList,
      itemKey,
      auth: state.firebase.auth,
    };
  };
  
  const mapDispatchtoProps = (dispatch) => {
      return {
          
      }
  }

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemScreen);