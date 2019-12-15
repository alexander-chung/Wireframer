import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';
import { Rnd } from "react-rnd";


class EditScreen extends Component {

    state = {
        name: this.getWireframerName(),
        controls: this.getWireframerControls(),
        updateChanged: false,
        close: false,
        zoom: 1,
        selected: -1,
        pixelWidth: this.getWireframerWidth(),
        pixelHeight: this.getWireframerHeight(),
        pixelWidthProxy: this.getWireframerWidth(),
        pixelHeightProxy: this.getWireframerHeight(),
        text: "",
        fontsize: 0,
        fontcolor: "",
        backgroundcolor: "",
        bordercolor: "",
        borderthickness: 0,
        borderradius: 0
    }

    getWireframerName() {
        if (this.props.wireframer) {
            let name = this.props.wireframer.name;
            return name;
        }
    }

    getWireframerControls() {
        if (this.props.wireframer) {
            let controls = this.props.wireframer.controls
            return controls;
        }
    }

    getWireframerWidth() {
        if (this.props.wireframer) {
            let width = this.props.wireframer.pixelWidth
            return width

        }
    }

    getWireframerHeight() {
        if (this.props.wireframer) {
            let height = this.props.wireframer.pixelHeight
            return height

        }
    }


    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

    }

    handleChangeUpdate = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState({
            updateChanged: true
        })
    }

    handleChangeText = (e) => {
        const { target } = e;
        this.state.controls[this.state.selected].text = target.value
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleChangeFontSize = (e) => {
        const { target } = e;
        this.state.controls[this.state.selected].fontsize = target.value + "px"
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleChangeFontColor = (e) => {
        const { target } = e;
        this.state.controls[this.state.selected].fontcolor = target.value
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleChangeBackgroundColor = (e) => {
        const { target } = e;
        this.state.controls[this.state.selected].backgroundcolor = target.value
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleChangeBorderColor = (e) => {
        const { target } = e;
        this.state.controls[this.state.selected].bordercolor = target.value
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleChangeBorderThickness = (e) => {
        const { target } = e;
        this.state.controls[this.state.selected].borderthickness = target.value + "px"
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleChangeBorderRadius = (e) => {
        const { target } = e;
        this.state.controls[this.state.selected].borderradius = target.value + "px"
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    updatePressed = (e) => {
        this.setState({
            pixelWidth: this.state.pixelWidthProxy,
            pixelHeight: this.state.pixelHeightProxy
        })
    }

    processZoomIn = (e) => {
        this.setState({
            zoom: (this.state.zoom * 2)
        })
        this.forceUpdate();
    }

    processZoomOut = (e) => {
        this.setState({
            zoom: (this.state.zoom * 0.5)
        })
        this.forceUpdate();

    }

    processSave = (e) => {
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).update({
            name: this.state.name,
            pixelHeight: this.state.pixelHeight,
            pixelWidth: this.state.pixelWidth,
            controls: this.state.controls
        })
    }

    processSaveAndClose = (e) => {
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).update({
            name: this.state.name,
            pixelHeight: this.state.pixelHeight,
            pixelWidth: this.state.pixelWidth,
            controls: this.state.controls
        })
        this.goHome();
    }

    goHome = (e) => {
        this.setState({
            close: true
        })
    }

    createContainer = (e) => {
        var newContainer = {
            id: this.state.controls.length,
            type: "container",
            width: "200px",
            height: "150px",
            x: 0,
            y: 0,
            text: "N/A",
            fontsize: "0px",
            fontcolor: "#000000",
            backgroundcolor: "#ffffff",
            bordercolor: "#000000",
            borderthickness: "1px",
            borderradius: "1px"
        }

        var newControls = this.state.controls;
        newControls.push(newContainer);
        this.setState({
            controls: newControls,
            selected: newContainer.id
        })
    }

    createLabel = (e) => {
        var newLabel = {
            id: this.state.controls.length,
            type: "label",
            width: "40px",
            height: "20px",
            x: 0,
            y: 0,
            text: "Label",
            fontsize: "12px",
            fontcolor: "#000000",
            backgroundcolor: "transparent",
            bordercolor: "#000000",
            borderthickness: "0px",
            borderradius: "0px"
        }

        var newControls = this.state.controls;
        newControls.push(newLabel);
        this.setState({
            controls: newControls,
            selected: newLabel.id
        })
    }

    createSubmitBox = (e) => {
        var newSubmitBox = {
            id: this.state.controls.length,
            type: "button",
            width: "100px",
            height: "25px",
            x: 0,
            y: 0,
            text: "Submit",
            fontsize: "12px",
            fontcolor: "#000000",
            backgroundcolor: "#d3d3d3",
            bordercolor: "#000000",
            borderthickness: "1px",
            borderradius: "1px"
        }

        var newControls = this.state.controls;
        newControls.push(newSubmitBox);
        this.setState({
            controls: newControls,
            selected: newSubmitBox.id
        })
    }

    createTextField = (e) => {
        var newTextfield = {
            id: this.state.controls.length,
            type: "textfield",
            width: "150px",
            height: "25px",
            x: 0,
            y: 0,
            text: "Input",
            fontsize: "12px",
            fontcolor: "#d3d3d3",
            backgroundcolor: "#ffffff",
            bordercolor: "#000000",
            borderthickness: "1px",
            borderradius: "1px"
        }

        var newControls = this.state.controls;
        newControls.push(newTextfield);
        this.setState({
            controls: newControls,
            selected: newTextfield.id
        })
    }

    handleReposition = (id, d) => {
        var controls = this.state.controls;
        controls[id].x = d.x;
        controls[id].y = d.y;
        this.setState({
            controls: controls
        })
    }

    handleResize = (id, ref, position) => {
        var controls = this.state.controls;
        controls[id].width = ref.style.width;
        controls[id].height = ref.style.height;
        controls[id].x = position.x;
        controls[id].y = position.y;
        this.setState({
            controls: controls
        })
    }

    handleSelected = (id, evt) => {
        evt.stopPropagation();
        this.setState({
            selected: id
        })
    }

    handleInputOnFocus = (id) => {
        this.setState({
            selected: id
        })
    }

    handleDeselect = (e) => {
        this.setState({
            selected: -1
        })
    }

    handleDeleteDuplicate = (e) => {
        if (e.keyCode === 68 && e.ctrlKey) {
            e.preventDefault();
            if(this.state.selected != -1) {
                var controls = this.state.controls;
                var duplicateControl = JSON.parse(JSON.stringify(controls[this.state.selected]));
                duplicateControl.id = controls.length
                var x = duplicateControl.x
                var y = duplicateControl.y
                x += 100
                y += 100
                duplicateControl.x = x;
                duplicateControl.y = y;
                controls.push(duplicateControl);
                controls.map(control => control.id = controls.indexOf(control))
                this.setState({
                    controls: controls,
                    selected: this.state.controls.length-1
                })
            }
        }
        if (e.keyCode === 46) {
            e.preventDefault();
            if(this.state.selected != -1) {
                var controls = JSON.parse(JSON.stringify(this.state.controls));
                controls.splice(this.state.selected, 1)
                controls.map(control => control.id = controls.indexOf(control))
                this.setState({
                    controls: controls,
                    selected: -1
                })
            }
        }
    }

    componentDidMount() {
        const firestore = getFirestore()
        firestore.collection('wireframers').doc(this.props.wireframer.id).update({
            timestamp: new Date()
        })

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, { opactity: 0.6 });

        window.addEventListener("keydown", this.handleDeleteDuplicate)
    }

    render() {
        const auth = this.props.auth;
        const wireframer = this.props.wireframer;
        const updateChanged = this.state.updateChanged;
        const { controls, selected } = this.state;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!wireframer) {
            return <Redirect to="/" />;
        }
        if (this.state.close) {
            return <Redirect to="/" />;
        }
        console.log(auth)

        var fontsize = 0;
        var borderthickness = 0;
        var borderradius = 0;
        if (selected != -1) {
            var fontsizeString = controls[selected].fontsize
            fontsize = parseInt(fontsizeString.slice(0,-2),10)
            var borderthicknessString = controls[selected].borderthickness
            borderthickness = parseInt(borderthicknessString.slice(0,-2), 10)
            var borderradiusString = controls[selected].borderradius
            borderradius = parseInt(borderradiusString.slice(0,-2), 10)
            
        }

        var handleStylesTL = {
            border: "solid 1px black",
            width: "10px",
            height: "10px",
            background: "white",
            transform: "translate(5px, 5px)"
        }

        var handleStylesTR = {
            border: "solid 1px black",
            width: "10px",
            height: "10px",
            background: "white",
            transform: "translate(-5px, 5px)"
        }

        var handleStylesBL = {
            border: "solid 1px black",
            width: "10px",
            height: "10px",
            background: "white",
            transform: "translate(5px, -5px)"
        }

        var handleStylesBR = {
            border: "solid 1px black",
            width: "10px",
            height: "10px",
            background: "white",
            transform: "translate(-5px, -5px)"
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
                                <input className="active" type="number" name="pixelWidth" max="5000" min="1" id="pixelWidthProxy" onChange={this.handleChangeUpdate} value={this.state.pixelWidthProxy} />
                            </div>
                            <div className="input-field col s4">
                                <label className="active" htmlFor="pixelHeight">Height:</label>
                                <input className="active" type="number" name="pixelHeight" max="5000" min="1" id="pixelHeightProxy" onChange={this.handleChangeUpdate} value={this.state.pixelHeightProxy} />
                            </div>
                            {updateChanged ? <button className="col s4 update-button" onClick={this.updatePressed}>Update</button> : <button className="col s4 update-button" disabled>Update</button>}

                        </div>
                        <div className="row botBord">
                            <button className="col s3 zoomin" onClick={this.processZoomIn}><i className="material-icons">zoom_in</i></button>
                            <button className="col s3 zoomout" onClick={this.processZoomOut}><i className="material-icons">zoom_out</i></button>
                            <button onClick={this.processSave} className="save-button">Save</button>
                            <button data-target="modal1" className="close-button modal-trigger">Close</button>
                        </div>
                        <div className="container">
                            <br /><br />
                            <div className="display-1" onClick={this.createContainer}>
                                <div className="display-container"> </div>
                                <div className="display-container-description">Container</div>
                            </div>
                            <br /><br /><br />
                            <div className="display-2" onClick={this.createLabel}>
                                <div className="display-label">Prompt for Input:</div>
                                <div className="display-label-description">Label</div>
                            </div>
                            <br /><br /><br />
                            <div className="display-3" onClick={this.createSubmitBox}>
                                <button className="display-submit">Submit</button>
                                <div className="display-submit-description">Button</div>
                            </div>
                            <br /><br /><br />
                            <div className="display-4" onClick={this.createTextField}>
                                <div className="display-textfield">Input</div>
                                <div className="display-textfield-description">Textfield</div>
                            </div>
                        </div>
                    </div>
                    <div className="col s8 edit2">
                        <div className="main-edit-screen" id="main-edit-screen">
                            <div className="main-wireframer" onClick={this.handleDeselect} id="main-wireframer" style={{ width: (this.state.pixelWidth + "px"), height: (this.state.pixelHeight + "px"), background: "white",zoom: this.state.zoom}}>
                                {controls && controls.map(control => (
                                    <Rnd
                                        bounds="parent"
                                        size = {{width: control.width, height: control.height}}
                                        position = {{x: control.x, y: control.y}}
                                        
                                        resizeHandleStyles={selected == control.id ? {
                                            topLeft: handleStylesTL,
                                            topRight: handleStylesTR,
                                            bottomLeft: handleStylesBL,
                                            bottomRight: handleStylesBR
                                        } : {}}
                                        onDragStop={(e, d) => this.handleReposition(control.id, d)}
                                        onResize={(e, dir, ref, delta, position) => this.handleResize(control.id, ref, position)}
                                    >{control.type == "container" ?
                                        <div onClick={(evt) => this.handleSelected(control.id, evt)} style={{ width: control.width, height: control.height, border: (control.borderthickness + " " + control.bordercolor + " solid"), background: control.backgroundcolor, borderRadius: control.borderradius }}></div> :
                                        control.type == "label" ?
                                            <div onClick={(evt) => this.handleSelected(control.id, evt)} style={{ overflow: "hidden", width: control.width, height: control.height, border: (control.borderthickness + " " + control.bordercolor + " solid"), background: control.backgroundcolor, borderRadius: control.borderradius, fontSize: control.fontsize, color: control.fontcolor }}>{control.text}</div> :
                                            control.type == "button" ?
                                                <button onClick={(evt) => this.handleSelected(control.id, evt)} style={{ overflow: "hidden", width: control.width, height: control.height, border: (control.borderthickness + " " + control.bordercolor + " solid"), background: control.backgroundcolor, borderRadius: control.borderradius, fontSize: control.fontsize, color: control.fontcolor }}>{control.text}</button> :
                                                <input onClick={(evt) => this.handleSelected(control.id, evt)} onFocus={() => this.handleInputOnFocus(control.id)} style={{ overflow: "hidden", width: control.width, height: control.height, border: (control.borderthickness + " " + control.bordercolor + " solid"), background: control.backgroundcolor, borderRadius: control.borderradius, fontSize: control.fontsize, color: control.fontcolor }} type="text" placeholder={control.text}></input>
                                        }</Rnd>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col s2 edit3">
                        <div className="properties-label">Properties</div>
                        {selected == -1 ? <input type="textfield" className="properties-box" value="" disabled></input> :
                        controls[selected].type == "container" ? <input type="textfield" className="properties-box" value={controls[selected].text} disabled></input> : 
                        <input type="textfield" className="properties-box" value={controls[selected].text} id="text" onChange={this.handleChangeText} ></input>}
                        <br />
                        <div className="row">
                            <div className="font-size-label col s6">Font Size:</div>
                            {selected == -1 ? <input type="number" className="browser-default font-size-box col s6" value="" disabled></input> :
                            controls[selected].type == "container" ? <input type="number" className="browser-default font-size-box col s6" disabled></input> :
                            <input type="number" className="browser-default font-size-box col s6" id="fontsize" value={fontsize} onChange={this.handleChangeFontSize}></input>}
                        </div>
                        <br /><br /><br />
                        <div className="row">
                            <div className="font-color-label col s5">Font Color:</div>
                            {selected == -1 ? <input type="color" className="browser-default font-color-box col s7" disabled value=""></input> :
                            controls[selected].type == "container" ? <input type="color" className="browser-default font-color-box col s7" disabled value=""></input> :
                            <input type="color" className="browser-default font-color-box col s7"  value={controls[selected].fontcolor} id="fontcolor" onChange={this.handleChangeFontColor}></input>}
                        </div>
                        <br /><br /><br />
                        <div className="row">
                            <div className="background-color-label col s5">Background Color:</div>
                            {selected == -1 ? <input type="color" className="background-color-box col s7" disabled value=""></input> :
                            <input type="color" className="background-color-box col s7" value={controls[selected].backgroundcolor} id="backgroundcolor" onChange={this.handleChangeBackgroundColor}></input>}
                        </div>
                        <br /><br />
                        <div className="row">
                            <div className="border-color-label col s5">Border Color:</div>
                            {selected == -1 ? <input type="color" className="border-color-box col s7" disabled value=""></input> :
                            <input type="color" className="border-color-box col s7" value={controls[selected].bordercolor} id="bordercolor" onChange={this.handleChangeBorderColor}></input>}
                        </div>
                        <br /><br />
                        <div className="row">
                            <div className="border-thickness-label col s5">Border Thickness:</div>
                            {selected == -1 ? <input type="number" className="browser-default border-thickness-box col s7" disabled value=""></input> :
                            <input type="number" className="browser-default border-thickness-box col s7" value={borderthickness} id="borderthickness" onChange={this.handleChangeBorderThickness}></input>}
                        </div>
                        <br /><br />
                        <div className="row">
                            <div className="border-radius-label col s5">Border Radius:</div>
                            {selected == -1 ? <input type="number" className="browser-default border-radius-box col s7" disabled value=""></input> :
                            <input type="number" className="browser-default border-radius-box col s7" value={borderradius} id="borderradius" onChange={this.handleChangeBorderRadius}></input>}
                        </div>
                    </div>
                </div>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Close this Wireframer?</h4>

                    </div>
                    <div className="modal-footer">
                        <a className="waves-effect waves-green btn-flat" onClick={this.processSaveAndClose}>Save & Close</a>
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