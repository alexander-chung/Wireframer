import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { tsCallSignatureDeclaration, tsExpressionWithTypeArguments } from '@babel/types';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';


class ItemScreenAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            assigned_to: '',
            due_date: '',
            completed: '',
            cancelled: false
        };
        this.handleDueDateChange.bind(this);
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

    cancelEdit = () => {
        this.setState({
            cancelled: true
        })
    }

    addItem = (item) => {
        this.props.todoList.items.push(item);
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

    render() {
        var item = {
            assigned_to: this.state.assigned_to,
            description: this.state.description,
            due_date: this.state.due_date,
            completed: this.state.completed
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
                            <input id="description" type="text" onChange={this.handleDescriptionChange}/>
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="assigned-to" type="text" onChange={this.handleAssignedToChange}/>
                            <label htmlFor="assigned-to">Assigned To</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="due-date" type="date" className="datepicker" onChange={this.handleDueDateChange}/>
                            <label htmlFor="due-date">Due Date</label>
                        </div>
                    </div>
                    <label>
                        <input type="checkbox" onChange={this.handleCompletedChange}/>
                        <span>Completed</span>
                    </label>
                    <div className="row">
                        <button className="waves-effect waves-light btn-flat item-button" onClick={this.addItem.bind(this, item)}>Submit</button>
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
    if(todoList){
        todoList.id = id;
      }

    return {
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
  )(ItemScreenAdd);