import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import { createList } from '../../store/database/asynchHandler';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    state = {
        gotNew: false
    }


    handleNewList = () => {
        var newList = {
            items: [],
            name: 'Unknown',
            owner: 'Unknown',
            timestamp: new Date()
        }
        const firestore = getFirestore();
        firestore.collection('todoLists').add(newList).then(() => {
            this.setState({
                gotNew: true
            })
        })

    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if (this.state.gotNew) {
            return <Redirect to={"/todoList/" + this.props.todoLists[0].id} />;
        }
        const todoLists = this.props.todoLists
        console.log(todoLists);
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.ordered.todoLists
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        createList: (todoList) => dispatch(createList(todoList))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['timestamp', 'desc'] },
    ]),
)(HomeScreen);