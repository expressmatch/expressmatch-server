import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

class DateFilter extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.setToday = this.setToday.bind(this);
    }

    onChange(value) {
        this.props.actions.uiDateFilter(value);
    }

    setToday() {
        this.props.actions.uiDateFilter(new Date());
    }

    render() {
        return (
            <div className="date-filter-container">
                <div className="panel date-filter">
                    <Calendar maxDate={new Date()}
                              value={this.props.selected ? new Date(this.props.selected) : new Date()}
                              onChange={this.onChange}/>
                </div>
                <button onClick={this.setToday} className="today-filter">Today</button>
            </div>
        );
    }
}

export default DateFilter;