import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';



class ListScreen extends Component {
    
    state = {
        name:this.getListName(),
        owner:this.getListOwner(),
        
    }

    getListName() {
        if (this.props.wireframer) {
            let name = this.props.wireframer.name;
            return name;
        }
    }

    getListOwner() {
        if (this.props.wireframe) {
            let owner = this.props.wireframe.owner;
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
        firestore.collection('wireframers').doc(this.props.wireframe.id).update({
            [target.id]: target.value
        })

    }

    deleteList = (e) => {
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframe.id).delete();
    }


    componentDidMount(){
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframe.id).update({
            timestamp: new Date()
        })

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, { opactity: 0.6});
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!wireframe) {
            return <Redirect to="/" />;
        }
        return (
            <div>
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

            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframers } = state.firestore.data;
  const wireframe = wireframers ? wireframers[id] : null;

  if(wireframe){
    wireframe.id = id;
  }
  return {
    wireframe,
    auth: state.firebase.auth,
  };
};


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'wireframers' },
  ]),
)(EditScreen);