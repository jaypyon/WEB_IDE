import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import PostUpload from './pages/PostUpload';

function PostUp(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path = {`${match.url}/view`} component = {PostUpload} />        
        </Switch>
    )
}

export default PostUp

