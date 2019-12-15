import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';


class WireframerCard extends React.Component {

    state = {
        close: false
    }

    stopProp = (e) => {
        e.preventDefault()
    }

    deleteWireframer = (e) => {
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.id).delete();
        this.setState({
            close: true
        })
    }

    componentDidMount(){
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, { opactity: 0.6});
    }

    render() {
        if(this.state.close == true) {
            return <Redirect to="/"/>
        }
        const { wireframer } = this.props;
        return (
            <div className="card z-depth-0">
                <div className="row">
                    <button data-target="modal2" className="modal-trigger col 3 delete-button" onClick={this.stopProp}>&#10007;</button>
                        <div className="card-content grey-text text-darken-3 col 9 card-width">
                            <span className="card-title">{wireframer.name}</span>
                        </div>
                </div>
                <div id="modal2" className="modal">
                    <div className="modal-content">
                        <h4>Delete this Wireframer?</h4>
                    </div>
                    <div className="modal-footer">
                        <a className="waves-effect waves-green btn-flat" onClick={this.deleteWireframer}>Yes</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat right" onClick={this.stopProp}>No</a>
                    </div>
                </div>
            </div>
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        wireframers: state.firestore.ordered.wireframers,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframerCard);
