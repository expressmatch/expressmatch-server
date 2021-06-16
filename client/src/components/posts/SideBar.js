import React from 'react';

import QuickFilter from '../posts/filters/QuickFilter';
import DateFilter from '../posts/filters//DateFilter';
import Filters from '../posts/filters/Filters';

const SideBar = (props) => {
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                {/*<DateFilter actions={props.actions} selected={props.filters.date}/>*/}
                {/*<QuickFilter*/}
                {/*actions={props.actions}*/}
                {/*filters={props.filters.quick}/>*/}
                {/*<Filters />*/}

                <div className="panel">
                    <div className="best-practices">
                        <div className="panel-header">How to use</div>
                        <div className="panel-text">
                            <ul>
                                <li>
                                    <span>1.&nbsp;</span>
                                    <span>
                                        Create posts to clearly explain about yourself in general, your interests,
                                        job, hobbies etc., be expressive, and also do not forget to state your needs,
                                        i.e., if you are looking for matrimony, dating or friendships, and also a brief
                                        about your expectations on your potential match.
                                    </span>
                                </li>
                                <li>
                                    <span>2.&nbsp;</span>
                                    <span>
                                        Complete your profile as it is key to find the the most suitable and compatible
                                        match. If you are looking for caste based search, make sure to fill in your
                                        details too, so that we can match against them. Also, a fully completed profile
                                        will attract the right visitors based on your interactions.
                                    </span>
                                </li>
                                <li>
                                    <span>3.&nbsp;</span>
                                    <span>
                                        Participate in other posts by liking, showing interest, and commenting on them.
                                        This will increase your visibility and hence your popularity. Other users will
                                        take note of this and send interest, if you are a regular. Again, keep your
                                        profile updated.
                                    </span>
                                </li>
                                <li>
                                    <span>4.&nbsp;</span>
                                    <span>
                                        For any feedback, queries or suggestion, write to us, using the Contact form.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SideBar;