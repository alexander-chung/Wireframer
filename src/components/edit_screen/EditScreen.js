import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';



class EditScreen extends Component {

    state = {
        name: this.getWireframerName(),
        close: false,
        pixelWidth: 900,
        pixelHeight: 800,
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
        

    }

    processZoomIn = (e) => {
        console.log("ZOOM IN!!!!")

    }

    processZoomOut = (e) => {
        console.log("ZOOM OUT!!!!")
    }

    processSave = (e) => {
        console.log("SAVE!!!!!!!")
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).update({
            name: this.state.name
        })
        this.goHome();
    }  

    processClose = (e) => {
        console.log("CLOSE!!!!!!")
    }

    goHome = (e) => {
        this.setState({
            close: true
        })
    }

    createContainer = (e) => {
        console.log("CONTAINER CREATE")
    }

    createLabel = (e) => {
        console.log("LABEL CREATE")
    }

    createSubmitBox = (e) => {
        console.log("SUBMIT BOX CREATE")
    }

    createTextField = (e) => {
        console.log("TEXTFIELD CREATE")
    }

    componentDidMount() {
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).update({
            timestamp: new Date()
        })

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, { opactity: 0.6 });
    }

    render() {
        const auth = this.props.auth;
        const wireframer = this.props.wireframer;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!wireframer) {
            return <Redirect to="/" />;
        }
        if (this.state.close) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container main-container white">
                <div className="row edit-row">
                    <div className="col s2 edit1">
                        <div className="input-field">
                            <label className="active" htmlFor="name">name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label className="active" htmlFor="pixelWidth">Width:</label>
                                <input className="active" type="number" name="pixelWidth" max="5000" min="1" id="pixelWidth" onChange={this.handleChange} value={this.state.pixelWidth} />
                            </div>
                            <div className="input-field col s4">
                                <label className="active" htmlFor="pixelHeight">Height:</label>
                                <input className="active" type="number" name="pixelHeight" max="5000" min="1" id="pixelHeight" onChange={this.handleChange} value={this.state.pixelHeight} />
                            </div>
                            <button className="col s4 update-button">Update</button>
                            
                        </div>
                        <div className="row botBord">
                            <button className="col s3 zoomin" onClick={this.processZoomIn}><i className="material-icons">zoom_in</i></button>
                            <button className="col s3 zoomout" onClick={this.processZoomOut}><i className="material-icons">zoom_out</i></button>
                            <button onClick={this.processSave} className="save-button">Save</button>
                            <button data-target="modal1" className="close-button modal-trigger">Close</button>
                        </div>
                        <div className="container">
                            <br/><br/>
                            <div className="display-1" onClick={this.createContainer}>
                                <div className="display-container"> </div>
                                <div className="display-container-description">Container</div>
                            </div>
                            <br/><br/><br/>
                            <div className="display-2" onClick={this.createLabel}>
                                <div className="display-label">Prompt for Input:</div>
                                <div className="display-label-description">Label</div>
                            </div>
                            <br/><br/><br/>
                            <div className="display-3" onClick={this.createSubmitBox}>
                                <button className="display-submit">Submit</button>
                                <div className="display-submit-description">Button</div>
                            </div>
                            <br/><br/><br/>
                            <div className="display-4" onClick={this.createTextField}>
                                <div className="display-textfield">Input</div>
                                <div className="display-textfield-description">Textfield</div>
                            </div>
                        </div>
                    </div>
                    <div className="col s7 edit2">
                        
                    </div>
                    <div className="col s3 edit3">
                        
                    </div>
                </div>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Close this Wireframer?</h4>

                    </div>
                    <div className="modal-footer">
                        <a className="waves-effect waves-green btn-flat" onClick={this.saveAndClose}>Save & Close</a>
                        <a className="waves-effect waves-green btn-flat" onClick={this.goHome}>Close</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
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

    if (wireframer) {
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