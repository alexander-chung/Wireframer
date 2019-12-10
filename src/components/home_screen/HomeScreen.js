import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframerLinks from './WireframerLinks';
import { createList } from '../../store/database/asynchHandler';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    state = {
        gotNew: false
    }


    handleNewList = () => {
        var newFramer = {
            controls: [],
            name: 'Unknown',
            UID: this.auth.uid,
            timestamp: new Date()
        }
        const firestore = getFirestore();
        firestore.collection('wireframers').add(newFramer).then(() => {
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
            return <Redirect to={"/wireframers/" + this.props.wireframers[0].id} />;
        }
        const wireframers = this.props.wireframers
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframerLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer<br />
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New Wireframer
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
        wireframers: state.firestore.ordered.wireframers
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        createList: (wireframe) => dispatch(createList(wireframe))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([
      { collection: 'wireframers', orderBy: ['timestamp', 'desc'] },
    ]),
)(HomeScreen);