<template>
  <div>
    <div>
      <h2 class="text-center">{{ board.title }}</h2>
      <div style="width: 100%; text-align: right">
        <span class="text-muted">조회수 : {{ board.visitCount }}</span>
        <br />
        <span class="text-muted">작성자 : {{ board.writer }} </span>
      </div>
    </div>

    <hr class="my-4" />

    <div class="text-center">
      <p>{{ board.content }}</p>
    </div>
    <div style="width: 100%; text-align: right">
      <span class="text-muted">{{ board.date }}</span>
    </div>
    <hr class="my-4" />
    <div class="row g-2 justify-content-center">
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage()">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-success" @click="goModifyPage()">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
    <div>
      <table class="table text-center">
        <thead>
          <tr>
            <th class="col-1" hidden>번호</th>
            <th class="col-1" hidden>글번호</th>
            <th class="col-1">작성자</th>
            <th class="col-6">내용</th>
            <th class="col-2">작성일</th>
            <th class="col-1"></th>
          </tr>
        </thead>
        <tbody>
          <ReviewItem
            v-for="review in reviews"
            :key="review.id"
            :id="review.id"
            :bid="review.bid"
            :writer="review.writer"
            :content="review.content"
            :date="dayjs(review.date).format('YYYY년MM월DD일 HH시mm분')"
          ></ReviewItem>
        </tbody>
      </table>
    </div>

    <form @submit.prevent="save">
      <div class="mt-4 text-center d-flex flex-column bd-highlight">
        <input
          id="writer"
          v-model="form.writer"
          class="mb-1"
          type="text"
          placeholder="작성자명을 입력해주세요"
        />
        <textarea
          id="content"
          v-model="form.content"
          class="mb-1"
          style="white-space: pre"
          placeholder="내용을 입력해 주세요"
        ></textarea>
        <button class="btn btn-outline-success">등록</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import ReviewItem from "@/components/ReviewItem.vue";
import { useRouter } from "vue-router";
import { getBoardById } from "@/api/board";
import { ref } from "vue";
import { deleteBoard } from "../../api/board";
import { addReview } from "../../api/review";
import dayjs from "dayjs";

const reviews = ref([]);

const props = defineProps({
  id: String,
});

const router = useRouter();
const board = ref({
  title: null,
  content: null,
  writer: null,
  date: null,
  viewCount: null,
  id: null,
});

/**
 * ref
 * 단점) form.value.title, form.value.content 처럼 계속 value값을 불러와야함
 * 장점) 객체 할당 가능, 일관성
 *
 * reactive
 * 단점) 객체 할당 불가능
 * 장점) form.title, form.content
 */

var bid = null;
const fetchBoard = async () => {
  try {
    const { data } = await getBoardById(props.id);
    setBoard(data.board[0]);
    reviews.value = data.review;
  } catch (error) {
    console.error(error);
  }
};
const setBoard = ({ title, content, writer, date, visitCount, id }) => {
  board.value.title = title;
  board.value.content = content;
  board.value.writer = writer;
  board.value.visitCount = visitCount;
  board.value.id = id;
  var dateFormat = dayjs(date);
  bid = id;
  board.value.date = dateFormat.format("YYYY년MM월DD일 HH시mm분");
};
fetchBoard();

const remove = async () => {
  try {
    if (confirm("삭제 하시겠습니까?") === false) {
      return;
    }
    await deleteBoard(props.id);
    router.push({ name: "boardList" });
  } catch (error) {
    console.error(error);
  }
};

const goListPage = () => {
  router.push({
    name: "boardList",
  });
};
const goModifyPage = () => {
  router.push({
    name: "boardModify",
    params: { id: props.id },
  });
};

const form = ref({
  bid: null,
  content: null,
  writer: null,
});

const save = () => {
  try {
    addReview({
      ...form.value,
      bid: bid,
    });
    console.log(...form.value);
    router.push({
      name: "boardDetail",
      params: { id: props.id },
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped></style>
