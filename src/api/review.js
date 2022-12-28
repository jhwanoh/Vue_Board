import { reviews } from "./reviewAxios";

export function addReview(data) {
  return reviews.post("/add", null, {
    params: { bid: data.bid, content: data.content, writer: data.writer },
  });
}

export function deleteReview(id) {
  return reviews.delete(`/delete/${id}`);
}
