import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './posts/Posts';
import CreatePost from './posts/CreatePost';
import NotFoundPage from './NotFoundPage';

class Content extends React.Component {
    render() {
        return (
            <div id="content">
                <Switch>
                    <Route exact path="/posts" component={Posts} />
                    <Route path="/createpost" component={CreatePost} />
                    <Route component={NotFoundPage} />
                </Switch>
                Content
            </div>
        );
    }
}

export default Content;