import axios from "axios";
import store from "@/store/index";

const baseUrl = "http://j5a404.p.ssafy.io:9090";
// 회원가입
const requestSignUp = (data, callback, errorCallback) => {
  axios
    .post(baseUrl + `/user/signup`, data)
    .then((res) => {
      alert(res.data.message);
      callback();
    })
    .catch((e) => {
      //window.swal(e.response.data.message + "!");
    });
};

// 로그인
const requestLogin = (data, callback, errorCallback) => {
  axios
    .post(baseUrl + `/user/login`, data)
    .then((res) => {
      localStorage.setItem("nickname", res.data.nickname);
      localStorage.setItem("jwt", res.headers.authorization);
      localStorage.setItem("id", data.loginId);
      store.state.isAdmin = res.data.isAdmin;
      store.state.headers.Authorization = res.headers.authorization;
      callback(res.data.nickname);
    })
    .catch((e) => {
      //window.swal(e.response.data.message + "!");
    });
};

// 회원정보
const requestUserInfo = (data, callback, errorCallback) => {
  return axios.get(baseUrl + `/user/${data}`);
};

// 비밀번호 수정
const updatePassword = (data, callback, errorCallback) => {
  return axios({
    method: "PUT",
    url: baseUrl + `/user/${data.id}`,
    data: data.credentials,
    headers: store.state.headers,
  });
};

// 회원정보 변경
const updateUserInfo = (data, callback, errorCallback) => {
  return axios({
    method: "PUT",
    url: baseUrl + "/user",
    data: data,
    headers: store.state.headers,
  });
};

// 작성한 리뷰 받아오기
const requestUserReview = async function(data, callback, errorCallback) {
  const response = await axios({
    method: "GET",
    url: baseUrl + `/user/${data.nickname}`,
    params: { page: data.index, type: "review" },
  });
  return response.data.data;
};

// 즐겨찾기 게임 받아오기
const requestFavorite = async function(data, callback, errorCallback) {
  const response = await axios({
    method: "GET",
    url: baseUrl + `/user/${data.nickname}`,
    params: { page: data.index, pageSize: 12, type: "favorite" },
  });
  return response.data.data;
};

const UserApi = {
  requestSignUp: (data, callback, errorCallback) =>
    requestSignUp(data, callback, errorCallback),
  requestLogin: (data, callback, errorCallback) =>
    requestLogin(data, callback, errorCallback),
  requestUserInfo: (data, callback, errorCallback) =>
    requestUserInfo(data, callback, errorCallback),
  updatePassword: (data, callback, errorCallback) =>
    updatePassword(data, callback, errorCallback),
  updateUserInfo: (data, callback, errorCallback) =>
    updateUserInfo(data, callback, errorCallback),
  requestUserReview: (data, callback, errorCallback) =>
    requestUserReview(data, callback, errorCallback),
  requestFavorite: (data, callback, errorCallback) =>
    requestFavorite(data, callback, errorCallback),
};

export default UserApi;
