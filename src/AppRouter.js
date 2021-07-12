import React from 'react';
import {BrowserRouter, Route, useLocation, Switch} from 'react-router-dom';
import ProfessorPage from './components/ProfessorPage'
import App from './App';
import CoursePage from './components/CoursePage';
import NotFoundPage from './components/NotFoundPage';
import Author from './components/Author';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-181247198-1');
const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const HomePage = () => {
    return <App />;
}

const ProfQueryParamParser = () => {
  let query = new URLSearchParams(useLocation().search);
  return query.get("profID");
}

const CourseQueryParamParser = () => {
  let query = new URLSearchParams(useLocation().search);
  return query.get("courseID");
}

const FromCourseParamParser = () => {
  let query = new URLSearchParams(useLocation().search);
  return query.get("fromCourse");
}

const AppRouter = () => (
    <BrowserRouter history={history}>
      <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/prof" component={() => <ProfessorPage professorId={ProfQueryParamParser()} fromCourse={FromCourseParamParser()} key={Math.random()} />}/>
          <Route path="/course" component={() => <CoursePage courseId={CourseQueryParamParser()} key={Math.random()} />}/>
          <Route path="/author" component={() => <Author/>}/>
          <Route path="/*" component={() => <NotFoundPage />}/>
      </Switch>
    </BrowserRouter>
  );

export default AppRouter;