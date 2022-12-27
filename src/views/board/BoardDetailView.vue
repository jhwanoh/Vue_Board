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
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getBoardById } from "@/api/board";
import { ref } from "vue";
import { deleteBoard } from "../../api/board";
import dayjs from "dayjs";

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

const fetchBoard = async () => {
  try {
    const { data } = await getBoardById(props.id);
    setBoard(data[0]);
  } catch (error) {
    console.error(error);
  }
};
const setBoard = ({ title, content, writer, date, visitCount }) => {
  board.value.title = title;
  board.value.content = content;
  board.value.writer = writer;
  board.value.visitCount = visitCount;

  var dateFormat = dayjs(date);

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
</script>

<style lang="scss" scoped></style>
