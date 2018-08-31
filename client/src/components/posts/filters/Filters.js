import React from 'react';

class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
    }

    render() {
        return (
            <div className="more-filter">
                More Filters...
            </div>
        );
    }
}

export default Filters;