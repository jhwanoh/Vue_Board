<template>
  <div>
    <h2>게시글수정</h2>
    <hr class="my-4" />

    <form @submit.prevent="edit">
      <input id="visitCount" v-model="form.visitCount" hidden />
      <input id="id" v-model="form.id" hidden />
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="writer"
          placeholder="작성자명"
          v-model="form.writer"
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="제목"
          v-model="form.title"
        />
      </div>

      <div class="mb-3">
        <textarea
          class="form-control"
          id="content"
          rows="20"
          placeholder="내용을 입력해 주세요"
          v-model="form.content"
        ></textarea>
      </div>

      <div class="pt-4 text-center">
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goDetailPage()"
        >
          취소
        </button>
        <button class="btn btn-primary me-2">수정완료</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBoardById, updateBoard } from "@/api/board";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
  title: null,
  content: null,
  writer: null,
  visitCount: null,
  id: null,
});

const fetchBoard = async () => {
  const { data } = await getBoardById(id);
  setForm(data[0]);
};
const setForm = ({ id, title, content, writer, visitCount }) => {
  form.value.id = id;
  form.value.title = title;
  form.value.content = content;
  form.value.writer = writer;
  form.value.visitCount = visitCount;
};
fetchBoard();

const edit = async () => {
  try {
    await updateBoard({ ...form.value });
    router.push({ name: "boardDetail", params: { id } });
  } catch (error) {
    console.error(error);
  }
};

const goDetailPage = () => {
  router.push({
    name: "boardDetail",
    id,
  });
};
</script>

<style lang="scss" scoped></style>
