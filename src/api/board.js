import { boards } from "./boardAxios";

export function getBoards(params) {
  return boards.get("", { params });
}

export function getBoardById(id) {
  return boards.get(`/detail/${id}`);
}

// export function getTotalCount() {
//   console.log(boards.get("/totalCount"));
//   return boards.get("/totalCount");
// }

export function createBoard(data) {
  return boards.post("/add", null, {
    params: { title: data.title, content: data.content, writer: data.writer },
  });
}
export function updateBoard(data) {
  return boards.post("/modify", null, {
    params: {
      title: data.title,
      content: data.content,
      writer: data.writer,
      id: data.id,
      visitCount: data.visitCount,
    },
  });
}
export function deleteBoard(id) {
  return boards.delete(`/delete/${id}`);
}
