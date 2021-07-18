import React from 'react';

import QuickFilter from '../posts/filters/QuickFilter';
import DateFilter from '../posts/filters//DateFilter';
import Filters from '../posts/filters/Filters';

import Slider from "react-slick";

const SideBar = (props) => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 15000
    };
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
                            <Slider {...settings}>
                                <div>
                                    <span className="highlight">Create posts</span> to explain about yourself, your interests,
                                    job, hobbies etc., be expressive, and also do not forget to state your needs,
                                    i.e., if you are looking for matrimony, dating or friendships, and what you are looking for
                                    in your potential match.
                                </div>
                                <div>
                                    <span className="highlight">Complete your profile</span> as it is key to find the
                                    most suitable and compatible match. if you want to match caste, make sure to fill in
                                    your details too in your profile. Also, a fully completed profile will attract the
                                    right visitors based on your interactions.
                                </div>
                                <div>
                                    <span className="highlight">Participate in posts</span> by liking, showing interest,
                                    and commenting on them. This will increase your visibility and hence your popularity.
                                    Other users will take note and send interest, if you are a regular. Again, keep your
                                    profile updated.
                                </div>
                                <div>
                                    If you have any <span className="highlight">feedback, queries or suggestions,</span>
                                    write to us, using the Contact form. This can be found in the from the link on the
                                    drop down menu on the header, against your profile picture.
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SideBar;