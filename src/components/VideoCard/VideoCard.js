import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./VideoCard.css";

const VideoCard = ({
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
}) => {
  console.log(views , "view count");
  return (
    <div className="videocard">
      <img className="videocard__image" src={image} alt="" />
      <div className="videocard__info">
        <Avatar
          className="videocard__avatar"
          alt={channel}
          src={channelImage}
        />
        <div className="videocard__text">
          <h4>{title}</h4>
          <p>{channel}</p>
          <p>
            {parseInt(views) > 1000000
              ? Math.ceil(parseInt(views) / 1000000) + "M"
              : views}{" "}
            views • {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
