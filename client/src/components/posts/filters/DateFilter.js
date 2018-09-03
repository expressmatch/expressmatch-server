import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

class DateFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        console.log(value);
        this.props.actions.uiDateFilter(value);
    }

    render() {
        return (
            <div className="date-filter">
                <Calendar maxDate={new Date()} onChange={this.onChange}/>
                <button className="today-filter">Today</button>
            </div>
        );
    }
}

export default DateFilter;