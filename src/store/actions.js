import { message } from "antd";
import firebase from "../config/api/firebase";

const videoData = firebase.database().ref("/videos");

const auth = firebase.auth();
const userData = firebase.database().ref("/users");

const actions = {
  getStudent:
    () =>
    async ({ setState, dispatch }) => {
      try {
        videoData.on("value", (snapshot) => {
          if (snapshot?.val() === null || undefined) {
            setState({ studentList: [] });
            dispatch(actions.setSearchData([]));
          } else {
            let responselist = Object.values(snapshot.val());
            setState({ studentList: responselist });
            // dispatch(actions.setSearchData(responselist));
            console.log(responselist, "videos");
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setState({ loading: false });
      }
    },
  getUsers:
    () =>
    async ({ setState, dispatch }) => {
      try {
        userData.on("value", (snapshot) => {
          if (snapshot?.val() === null || undefined) {
            setState({ userList: [] });
            dispatch(actions.setSearchData([]));
          } else {
            let responselist = Object.values(snapshot.val());
            setState({ userList: responselist });
            // dispatch(actions.setSearchData(responselist));
            console.log(responselist, "vishnu kundii");
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setState({ loading: false });
      }
    },
  onLogin:
    (values, history) =>
    async ({ dispatch, setState, getState }) => {
      try {
        if (values.name === undefined) {
          //  const snapshot= await adminData.on("value");
          await dispatch(actions.getUsers());
         

          
          console.log("valuess", values);
          const authData = await auth.signInWithEmailAndPassword(
            values.username,
            values.password
          );

          let uid = authData.user.uid;
          localStorage.setItem("token", uid);
          setState({ token: uid });
          localStorage.setItem("email", authData.user.email);
          console.log("email", authData.user.email);
          
          for (let i = 0; i < getState().userList?.length; i++) {
            if (getState().userList[i] === authData.user.uid) {
              console.log("user exists");
              localStorage.setItem("name", getState().userList[i].name);
              console.log("user exists", localStorage.getItem("name"));

              break;
            } else {
            }
          }
          // userData
          //   .on("value", (snapshot) => {
          //     console.log("valuessss", snapshot.val());
          //     userList = Object.keys(snapshot.val());
          //     console.log(userList, "userlist123");
          //   })
          //   .then((res) => console.log(userList, "userlisttttttt"));
       
        

          history.push("/");
        } else {
          try {
            localStorage.setItem("email", values.email);
            
            const authData = await auth.createUserWithEmailAndPassword(
              values.username,
              values.password
            );

            let uid = authData.user.uid;
            localStorage.setItem("token", uid);
            localStorage.setItem("email", authData.user.email);
            console.log("email", authData.user.email);
            // if(res.token){

            let data = { email: values.username, name: values.name, id: uid };

            userData.child(uid).update(data);
            localStorage.setItem("name", values?.name);
            history.push("/");
          } catch (error) {
            switch (error.code) {
              case "auth/invalid-email":
                message.warning("Please enter a valid email address");
                break;
              case "auth/user-not-found":
                message.warning("User not found");
                break;
              case "auth/wrong-password":
                message.warning("Incorrect password");
                break;
              default:
                message.warning("Authentication failed");
            }
            // error===="auth/user-not-found" &&message.warning("Login Failed");
            console.log("login", error);
          }
        }
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            message.warning("Please enter a valid email address");
            break;
          case "auth/user-not-found":
            message.warning("User not found");
            break;
          case "auth/wrong-password":
            message.warning("Incorrect password");
            break;
          default:
            message.warning("Authentication failed");
        }
        // error===="auth/user-not-found" &&message.warning("Login Failed");
        console.log("login", error);
      }
    },
  onSignup:
    (values, history) =>
    async ({ dispatch }) => {
      try {
        await userData.on("value");
        let adminList;

        userData.on("value", (snapshot) => {
          console.log("valuessss", snapshot.val());
          adminList = Object.keys(snapshot.val());
        });
        console.log("valuess", values);
        const authData = await auth.signInWithEmailAndPassword(
          values.username,
          values.password
        );

        let uid = authData.user.uid;
        localStorage.setItem("token", uid);
        localStorage.setItem("email", authData.user.email);
        console.log("email", authData.user.email);
        // if(res.token){
        const key = videoData.push().key;

        let data = { email: values.email, name: values.name, id: key };

        userData.child(key).update(data);
        history.push("/");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            message.warning("Please enter a valid email address");
            break;
          case "auth/user-not-found":
            message.warning("User not found");
            break;
          case "auth/wrong-password":
            message.warning("Incorrect password");
            break;
          default:
            message.warning("Authentication failed");
        }
        // error===="auth/user-not-found" &&message.warning("Login Failed");
        console.log("login", error);
      }
    },
  onLike:
    (id, likeCount) =>
    async ({ dispatch }) => {
      try {
        let like = likeCount;

        like.push(localStorage.getItem("token"));
        console.log("liked", id);

        const res = videoData.child(id).update({ like: like });

        console.log("liked", res, like, id);
      } catch (error) {}
    },
  unLike:
    (id, arrayLiked) =>
    async ({ dispatch }) => {
      console.log("liked01-", id);

      try {
        console.log("liked01");

        let like = arrayLiked;
        console.log("liked1", like, id);

        like = like.forEach(
          (element) => element !== localStorage.getItem("token")
        );
        // console.log("liked2",  like, id);

        if (like === undefined) {
          videoData.child(id).child("like").remove();
        } else {
          videoData.child(id).update({ like: like });
        }
        console.log("liked", like, id);
      } catch (error) {
        console.log(error);
      }
    },
  unDisLike:
    (id, arrayLiked) =>
    async ({ dispatch }) => {
      console.log("liked01-", id);

      try {
        console.log("liked01");

        let like = arrayLiked;
        console.log("liked1", like, id);

        like = like.forEach(
          (element) => element !== localStorage.getItem("token")
        );
        // console.log("liked2",  like, id);

        if (like === undefined) {
          videoData.child(id).child("dislike").remove();
        } else {
          videoData.child(id).update({ like: like });
        }
        console.log("liked", like, id);
      } catch (error) {
        console.log(error);
      }
    },
  onDislike:
    (id, array) =>
    async ({ dispatch, getState }) => {
      try {
        let like = array;

        like.push(localStorage.getItem("token"));
        console.log("liked", id);

        const res = videoData.child(id).update({ dislike: like });

        console.log("liked", res, like, id);
      } catch (error) {}
    },
  onSignout:
    (id) =>
    async ({ dispatch, setState, getState }) => {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("name");

        setState({ token: "token" });

        // getState().studentList
      } catch (error) {
        // const res = videoData.child(id).update(data);

        console.log("login", error);
      }
    },
  isExist:
    (array) =>
    async ({ setState, getState }) => {
      array.forEach((element) => {
        if (localStorage.getItem("token") === element) {
          return true;
        } else {
          return false;
        }
      });
    },
  search:
    (data) =>
    async ({ setState, getState }) => {
      setState({ searchKey: data });
      let array = getState().studentList.filter((ele) =>
        ele.title.toLowerCase().match(data.toLowerCase())
      );
      console.log(array, "search array");
      setState({ studentList: array });
    },
  drawerOn:
    (data) =>
    async ({ setState, getState }) => {
      setState({ drawerValue: data });
    },
};

export default actions;
