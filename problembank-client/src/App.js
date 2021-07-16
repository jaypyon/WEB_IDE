import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/styles/grid.css'

import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './hocs/Authentication';

import NotFound from './components/404NotFound';
import Loading from './components/Loading/Loading';

const MainPage = React.lazy(() => import('./pages/MainPage'))
const ProblemsByCategories = React.lazy(() => import('./pages/ProblemsByCategories'));
const TotalProblems = React.lazy(() => import('./pages/TotalProblems'))
const Problem = React.lazy(() => import('./pages/Problem'))
const MyProblems = React.lazy(() => import('./pages/MyProblems'))
const Post = React.lazy(() => import('./pages/Post'))
const ProblemBoard = React.lazy(()=> import('./pages/ProblemBoard'))
const PostUpload = React.lazy(()=> import('./pages/PostUpload'))

// check user Id && paswword for authentication 
function App() {
  return (
      <Suspense fallback = {<Loading type={'bars'} color={'black'} />}>
        <BrowserRouter>
            <Switch>
                <Route exact path = "/"  component = {MainPage}/>
                <Route path = "/problemsbank"  component = {ProblemsByCategories}/>
                <Route path = "/problem"  component = {Problem}/>
                <Route path = "/totalproblems"  component = {TotalProblems}/>
                <Route path = "/problemboard"  component = {ProblemBoard}/>
                <Route path = "/board"  component = {Post}/>
                <Route path = "/postupload"  component = {PostUpload}/>
                <Route component = {NotFound} />
            </Switch>
          </BrowserRouter>
      </Suspense>
  );
}

export default App;
