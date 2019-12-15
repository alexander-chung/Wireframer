import React from 'react'
import { connect } from 'react-redux';
import wireframerJson from './TestTodoListData.json';
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';



class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframers').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframers').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        wireframerJson.wireframers.forEach(wireJson => {
            fireStore.collection('wireframers').add({
                    name: wireJson.name,
                    uid: wireJson.uid,
                    pixelHeight: wireJson.pixelHeight,
                    pixelWidth: wireJson.pixelWidth,
                    controls: wireJson.controls,
                    timestamp: new Date()
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    isAdmin = () => {
        if(this.props.users) {
            const keys = Object.keys(this.props.users);
            const vals = Object.values(this.props.users);
            var i;
            for (i = 0; i < keys.length; i++) {
                if(keys[i] === this.props.auth.uid) {
                    if(vals[i].admin === "true") {
                        return true
                    }
                }
            }
            return false
        }
    }
        

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (this.isAdmin() == false) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = (state) => {
    const { users } = state.firestore.data;
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
        users
    };
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(DatabaseTester);