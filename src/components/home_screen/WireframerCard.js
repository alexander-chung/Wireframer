import React from 'react';

class WireframerCard extends React.Component {

    render() {
        const { wireframer } = this.props;
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframer.name}</span>
                </div>
            </div>
        );
    }
}
export default WireframerCard;