import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SideBarRow from "../SideBarRow/SideBarRow";
import "./VideoInfo.css";
import { Avatar } from "@material-ui/core";
import { Modal } from "antd";
import { useHistory } from "react-router";
import { useWebinarStore } from "../../store";

const VideoInfo = ({
  title,
  description,
  publishedDate,
  id,
  channelImage,
  likeCount,
  dislikeCount,
  subs,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [islikeddata, setisliked] = useState(false);
  const [isdislikeddata, setdisliked] = useState(false);

  var history = useHistory();
  const [{ }, { onLike, unLike, onDislike,unDisLike }] = useWebinarStore();

  const isLiked = () => {
    likeCount !== undefined &&
      likeCount.forEach((element) => {
        if (element === localStorage.getItem("token")) {
          setisliked(true);
          return;
        }
      });
  };

  const isDisLiked = () => {
    dislikeCount !== undefined &&
      dislikeCount.forEach((element) => {
        if (element === localStorage.getItem("token")) {
          setdisliked(true);
          return;
        }
      });
  };

  useEffect(() => {
    isLiked();
    isDisLiked();
  }, [likeCount, unLike,dislikeCount]);

  const handleOk = () => {
    history.push("/signin");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const likeButton = () => {
    if (localStorage.getItem("token") == null) {
      setIsModalVisible(true);
    } else {
      if (islikeddata) {
        setisliked(false);
        console.log(islikeddata, "likedbdata");

        unLike(id, likeCount);
      } else {
        isdislikeddata&&unDisLike(id, dislikeCount);
        setdisliked(false);

        onLike(id,likeCount);

      }
    }
  };
  const disLikeButton = () => {
    if (localStorage.getItem("token") == null) {
      setIsModalVisible(true);
    } else {
      if (isdislikeddata) {
        console.log(isdislikeddata, "likedbdata");

        unDisLike(id, dislikeCount);
        setdisliked(false);
      } else {
        islikeddata&&unLike(id, likeCount);
        setisliked(false);

        onDislike(id,dislikeCount);

        
      }
    }
  };

  return (
    <div className="videoinfo">
      <div className="videoinfo__headline">
        <h1>{title}</h1>
      </div>
      <div className="videoinfo__stats">
        <p> {publishedDate}</p>
        <div className="videoinfo__likes">
          <span onClick={() => likeButton()}>
            <SideBarRow
              liked={islikeddata}
              Icon={ThumbUpIcon}
              title={likeCount?.length}
            />
          </span>
          <span onClick={() => disLikeButton()}>
            <SideBarRow
              liked={isdislikeddata}
              Icon={ThumbDownIcon}
              title={dislikeCount?.length}
            />
          </span>

          {/* <SideBarRow Icon={ReplyIcon} title='SHARE' />
                    <SideBarRow Icon={PlaylistAddIcon} title='SAVE' />
                    <SideBarRow Icon={MoreHorizIcon} title='' /> */}
        </div>
      </div>
      <hr />
      <div className="videoinfo__channel">
        <div>
          <Avatar
            className="videoinfo__avatar"
            // alt={channelTitle}
            src={channelImage}
          />
          <div className="videoinfo__channelinfo">
            {/* <h3 className="videoinfo__channeltitle">{channelTitle}</h3> */}
            <p className="videoinfo__channelsubs">{subs} subscribers</p>
          </div>
        </div>
        {/* <div className='videoinfo__subscribe'>
                    <Button color='secondary' >SUBSCRIBE</Button>
                </div> */}
      </div>
      <div className="videoinfo__channeldesc">
        <p>{description}</p>
      </div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <p>Please sign in to contine</p>
        </div>
      </Modal>
       
    </div>
  );
};

export default VideoInfo;
