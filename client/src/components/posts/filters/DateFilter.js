import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

class DateFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        alert(value);
    }

    render() {
        return (
            <div className="date-filter">
                <Calendar maxDate={new Date()} onChange={this.onChange}/>
            </div>
        );
    }
}

export default DateFilter;