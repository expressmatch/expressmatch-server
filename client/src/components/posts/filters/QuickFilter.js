import React from 'react';

class QuickFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: []
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        console.log(e.target.dataset['id']);
    }

    render() {
        return (
            <div className="quick-filter" onClick={this.onClick}>
                <div className="filter-item" data-id="city">My city</div>
                <div className="filter-item" data-id="caste">My caste</div>
                <div className="filter-item" data-id="mothertongue">My mother tongue</div>
                <div className="filter-item selected" data-id="hometown">My hometown</div>
            </div>
        );
    }
}

export default QuickFilter;