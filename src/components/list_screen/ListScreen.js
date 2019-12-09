import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js';
import { firestoreConnect } from 'react-redux-firebase';
import { tsCallSignatureDeclaration } from '@babel/types';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';
import { sortByTask } from '../../store/database/asynchHandler';



class ListScreen extends Component {
    
    state = {
        name:this.getListName(),
        owner:this.getListOwner(),
        
    }

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return name;
        }
    }

    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return owner;
        }
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        const firestore = getFirestore()
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            [target.id]: target.value
        })

    }

    deleteList = (e) => {
        const firestore = getFirestore()
        firestore.collection('todoLists').doc(this.props.todoList.id).delete();
    }


    componentDidMount(){
        const firestore = getFirestore()
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            timestamp: new Date()
        })

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, { opactity: 0.6});
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container main-container white">
                <div className="row">
                    <div className="col s11"><h5 className="grey-text text-darken-3">Todo List</h5></div>
                    <a data-target="modal1" className="red btn trash-can col s1 black-text modal-trigger">&#128465;</a>
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name} />
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={this.state.owner} />
                </div>
                
                <ItemsList todoList={todoList} />

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Delete List?</h4>
                        <p><b>Are you sure you want to delete this list?</b></p>
                        <p>The list will not be retrievable.</p>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat" onClick={this.deleteList}>Yes</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">No</a>
                    </div>
                </div>
            </div>

            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;

  if(todoList){
    todoList.id = id;
  }
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        sortByTask: (todoList) => dispatch(sortByTask(todoList))
    }
}

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);