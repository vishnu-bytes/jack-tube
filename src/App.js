import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import RecommendedVideos from "./components/RecommendedVideos/RecommendedVideos";
import SearchPage from "./components/SearchPage/SearchPage";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn/";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/signin" component={SignIn}></Route>

          <Route path="/video/:videoId">
            <div className="app__mainpage">
              <VideoPlayer />
            </div>
          </Route>
          <Route path="/search/:searchQuery">
            <div className="app__mainpage">
              <SideBar />
              <SearchPage />
            </div>
          </Route>
          <Route path="/">
            <div className="app__mainpage">
              <SideBar />
              <RecommendedVideos />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
