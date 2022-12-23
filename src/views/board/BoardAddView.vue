<template>
  <div>
    <h2>게시글등록</h2>
    <hr class="my-4" />

    <form @submit.prevent="save">
      <div class="mb-3">
        <input
          type="writer"
          class="form-control"
          id="writer"
          placeholder="작성자명"
          v-model="form.writer"
        />
      </div>
      <div class="mb-3">
        <input
          type="title"
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
          @click="goListPage"
        >
          취소
        </button>
        <button class="btn btn-primary">등록</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createBoard } from "@/api/board";

const router = useRouter();
const goListPage = () => router.push({ name: "boardList" });

const form = ref({
  title: null,
  content: null,
  writer: null,
});

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var hour = today.getHours();
var minute = today.getMinutes();

if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
if (hour < 10) {
  hour = "0" + hour;
}
if (minute < 10) {
  minute = "0" + minute;
}

today = yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute;

const save = () => {
  try {
    createBoard({
      ...form.value,
      date: today,
      visitCount: 0,
    });
    router.push({ name: "boardList" });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped></style>
