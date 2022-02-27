import React from "react";
import ReactPlayer from 'react-player'

const Video = ({ videoId }) => {
  console.log(videoId,"video url")
  return (
    <div>
      <ReactPlayer controls playing url={videoId} />
    </div>
  );
};

export default Video;
