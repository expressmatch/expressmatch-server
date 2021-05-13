import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsContainer from '../containers/PostsContainer';
import CreatePostContainer from '../containers/CreatePostContainer';
import ProfileContainer from '../containers/ProfileContainer';
import ViewPostContainer from '../containers/ViewPostContainer';
import MessagesContainer from '../containers/MessagesContainer';
import PreferenceContainer from '../containers/PreferenceContainer';
import ContactUs from '../components/ContactUs';
import NotFoundPage from './NotFoundPage';

class Content extends React.Component {
    render() {
        return (
            <div id="content">
                <Switch>
                    <Route exact path="/posts" component={PostsContainer} />
                    <Route path="/createpost" component={CreatePostContainer} />
                    <Route path="/contactus" component={ContactUs} />
                    <Route exact path="/profile" render={props => {
                        return (
                            <ProfileContainer
                                {...props}
                                readonly={true} />
                        );
                    }}/>
                    <Route exact path="/profile/:userId" render={props => {
                        return (
                            <ProfileContainer
                                userId={props.match.params.userId}
                                {...props}
                                readonly={true}
                                otherProfile={true}/>
                        );
                    }}/>
                    <Route path="/editprofile" component={ProfileContainer} />
                    <Route path="/post/:postId" component={ViewPostContainer} />
                    {/*<Route path="/messages" component={MessagesContainer} />*/}
                    <Route path="/preference" component={PreferenceContainer} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default Content;