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

                {/*<div className="panel">*/}
                    {/*<div className="best-practices">*/}
                        {/*<div className="">FAQs</div>*/}
                        {/*<div className="">*/}
                            {/*<ul>*/}
                                {/*<li>Post Daily</li>*/}
                                {/*<li>Comment on users's Posts</li>*/}
                                {/*<li>Update Profile</li>*/}
                                {/*<li>Be a problem solver</li>*/}
                            {/*</ul>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
};

export default SideBar;