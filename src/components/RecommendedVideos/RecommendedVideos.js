import React, { useEffect } from "react";
import VideoCard from "./../VideoCard/VideoCard";
import "./RecommendedVideos.css";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useWebinarStore } from "../../store";
import { Empty } from "antd";

const RecommendedVideos = () => {
  const [{ studentList, loading, drawerValue }, { getStudent }] =
    useWebinarStore();
  useEffect(() => {
    getStudent();
  }, [getStudent]);

  return (
    <div
      className="recommendedvideos"
      style={{ marginLeft: drawerValue ? "378px" : "0px" }}
    >
      {loading ? (
        <CircularProgress className="loading" color="secondary" />
      ) : (
        <div className="recommendedvideos__videos">
          {studentList?.length === 0 && <Empty />}
          {studentList.map((item) => {
            return (
              <Link key={item.videoId} to={`/video/${item?.id}`}>
                <VideoCard
                  title={item?.title}
                  image={item?.imageUrl}
                  views={item?.views}
                  timestamp={item?.uploadedDate}
                  channel={item.channel}
                  channelImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKwv77WbujAmRnatXJIyG4JiRmO9aIdmnlg&usqp=CAU"
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommendedVideos;
