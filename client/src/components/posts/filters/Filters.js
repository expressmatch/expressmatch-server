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
            <div className="panel">
                <div className="more-filter">
                    More Filters...
                </div>
            </div>
        );
    }
}

export default Filters;