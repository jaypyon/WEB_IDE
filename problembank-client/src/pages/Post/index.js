import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import DetailPost from './pages/DetailPost';

function Post(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path = {`${match.url}/view`} component = {DetailPost} />        
        </Switch>
    )
}

export default Post

