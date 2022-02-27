import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Video from "./../Video/Video";
import "./VideoPlayer.css";
import RecommendedVideos from "../RecommendedVideos/RecommendedVideos";
import VideoInfo from "../VideoInfo/VideoInfo";
import { useWebinarStore } from "../../store";

const VideoPlayer = () => {
  let { videoId } = useParams();
  console.log(videoId,"video id first")

  const [videoInfo, setVideoInfo] = useState({});
  const [
    { studentList,},
    {
      
      getStudent,
     
    },
  ] = useWebinarStore();

  useEffect(() => {
    setVideoInfo([]);
      getStudent()
  }, [videoId]);

  useEffect(() => {
   studentList.forEach(element => {
     if(videoId===element.id){
       setVideoInfo(element)
     }
   });
  }, [studentList]);


  return (
    <div className="videoplayer">
      <div className="videoplayer__videodetails">
        <div className="videoplayer__video">
          {/* {isLoading ? (
            <CircularProgress className="loading" color="secondary" />
          ) : ( */}
            <Video videoId={videoInfo?.videoUrl} />
          {/* )} */}
        </div>
        <div className="videoplayer__videoinfo">
          {/* {!isLoading ? ( */}
            <VideoInfo
              title={videoInfo.title}
              description={videoInfo.description}
              publishedDate={videoInfo.publishedDate}
              id={videoInfo.id}
              channelImage={videoInfo.channelImage}
              viewCount={videoInfo.viewCount}
              likeCount={videoInfo?.like}
              dislikeCount={videoInfo?.dislike}
              subs={videoInfo.subs}
            />
          {/* ) : null} */}
        </div>
      </div>
      <div className="videoplayer__suggested">
        <RecommendedVideos />
      </div>
    </div>
  );
};

export default VideoPlayer;
