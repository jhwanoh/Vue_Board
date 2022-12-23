import { posts } from ".";
import axios from "axios";

export function getBoards(params) {
  //axios 사용 전
  // return board;
  // return axios.get("http://localhost:8080/boardListPage", { params });
  return axios.get("http://localhost:8080/board", { params });
}

export function getBoardById(id) {
  //axios 사용 전
  // const numberId = parseInt(id);
  // return board.find((item) => item.id === numberId);
  return posts.get(`/${id}`);
}

export function createBoard(data) {
  return posts.post("http://localhost:8080/boards/add", data);
}
export function updateBoard(id, data) {
  return posts.patch(`/${id}`, data);
}
export function deleteBoard(id) {
  return posts.delete(`/${id}`);
}
