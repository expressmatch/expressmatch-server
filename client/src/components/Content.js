import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsContainer from '../containers/PostsContainer';
import CreatePost from './posts/CreatePost';
import ProfileContainer from '../containers/ProfileContainer';
import NotFoundPage from './NotFoundPage';

class Content extends React.Component {
    render() {
        return (
            <div id="content">
                <Switch>
                    <Route exact path="/posts" component={PostsContainer} />
                    <Route path="/createpost" component={CreatePost} />
                    <Route path="/profile1" component={ProfileContainer} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default Content;