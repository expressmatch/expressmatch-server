import React from 'react';

class QuickFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.actions.uiQuickFilter(e.target.dataset['id']);
    }

    render() {
        return (
            <div className="quick-filter" onClick={this.onClick}>
                <div className={`filter-item ${this.props.filters.city ? 'selected' : ''}`} data-id="city">My city</div>
                <div className={`filter-item ${this.props.filters.caste ? 'selected' : ''}`} data-id="caste">My caste</div>
                <div className={`filter-item ${this.props.filters.motherTongue ? 'selected' : ''}`} data-id="motherTongue">My mother tongue</div>
            </div>
        );
    }
}

export default QuickFilter;