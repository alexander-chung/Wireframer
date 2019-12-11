import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';



class EditScreen extends Component {
    
    state = {
        name:this.getWireframerName(),
        
    }

    getWireframerName() {
        if (this.props.wireframer) {
            let name = this.props.wireframer.name;
            return name;
        }
    }


    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).update({
            [target.id]: target.value
        })

    }

    deleteList = (e) => {
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).delete();
    }


    componentDidMount(){
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).update({
            timestamp: new Date()
        })

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, { opactity: 0.6});
    }

    render() {
        const auth = this.props.auth;
        const wireframer = this.props.wireframer;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!wireframer) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container main-container white">
                <div className="row edit-row">
                    <div className="col s3">
                        s3
                    </div>
                    <div className="col s6">
                        s6
                    </div>
                    <div className="col s3">
                        s3
                    </div>
                </div>

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
  const { wireframers } = state.firestore.data;
  const wireframer = wireframers ? wireframers[id] : null;

  if(wireframer){
    wireframer.id = id;
  }
  return {
    wireframer,
    auth: state.firebase.auth,
  };
};


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'wireframers' },
  ]),
)(EditScreen);