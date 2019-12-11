import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframerCard from './WireframerCard';

class WireframerLinks extends React.Component {
    render() {
        const wireframers = this.props.wireframers;
        console.log(wireframers);
        var myWireframers = wireframers;
        if(wireframers) {
            myWireframers = wireframers.filter(wireframer => this.props.auth.uid == wireframer.uid)
        }
        console.log(myWireframers)
        return (
            <div className="section">
                {myWireframers && myWireframers.map(wireframer => (
                    <Link to={'/wireframers/' + wireframer.id} key={wireframer.id}>
                        <WireframerCard wireframer={wireframer} />
                    </Link>
                ))}
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

export default compose(connect(mapStateToProps))(WireframerLinks);