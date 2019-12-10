import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframerCard from './WireframerCard';

class WireframerLinks extends React.Component {
    render() {
        const wireframers = this.props.wireframers;
        return (
            <div className="section">
                {wireframers && wireframers.map(wireframer => (
                    <Link to={'/wireframers/' + wireframer.id} key={wireframer.id}>
                        <WireframerCard wireframers={wireframers} />
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