import * as actionCreators from '../actions/actionCreators.js'
import { NavLink, Redirect } from 'react-router-dom';


export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    console.log(newUser)
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
        admin: newUser.admin,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const createList = (todoList) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').add({
      ...todoList
    }).then(() => {
      dispatch({ type: 'CREATE_TODO_LIST', todoList })
    }).catch((err) => {
      dispatch({ type: 'CREATE_TODO_LIST_ERROR', err })
    })
  }
}

export const sortByTask = (taskAscending) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SORT_BY_TASK', taskAscending})
  }
}