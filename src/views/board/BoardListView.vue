<template>
  <div>
    <h2>게시글목록</h2>
    <form @submit.prevent>
      <div class="row g-3 mt-4 mb-4">
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            id="_search"
            v-model="params._search"
          />
        </div>
        <div class="col-auto">
          <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
        </div>
        <div class="col-2">
          <select v-model="params._limit" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="5">5개씩 보기</option>
            <option value="10">10개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4" />

    <table class="table text-center table-hover table-striped">
      <thead>
        <tr>
          <th class="col-1">번호</th>
          <th class="col-4">제목</th>
          <th class="col-3">작성자</th>
          <th class="col-3">작성일</th>
          <th class="col-1">조회수</th>
        </tr>
      </thead>
      <tbody>
        <BoardItem
          v-for="board in boards"
          :key="board.id"
          @click="goPage(board.id)"
          :id="board.id"
          :title="board.title"
          :writer="board.writer"
          :date="dayjs(board.date).format('YYYY년MM월DD일 HH시mm분')"
          :visitCount="board.visitCount"
        ></BoardItem>
      </tbody>
    </table>
    <!-- <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="--params._page"
            :class="{ disabled: !(params._page > 1) }"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
        >
          <a class="page-link" href="#" @click.prevent="params._page = page">{{
            page
          }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: !(params._page < pageCount) }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="++params._page"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->
  </div>
</template>

<script setup>
import BoardItem from "@/components/BoardItem.vue";
import { getBoards } from "@/api/board";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

// const count = getTotalCount();
// console.log(count);

const router = useRouter();
const boards = ref([]);
const params = ref({
  // _sort: "id",
  // _order: "desc",
  _page: 1,
  _limit: 3,
  _search: "",
});
//페이징
// const totalCount = ref(0);
// const pageCount = computed(() =>
//   Math.ceil(totalCount.value / params.value._limit)
// );

const fetchBoard = async () => {
  try {
    const { data } = await getBoards(params.value);
    console.log(params.value);

    boards.value = data;
    // totalCount.value = headers["x-total-count"];

    // totalCount.value = getTotalCount();
  } catch (error) {
    console.error(error);
  }
};

fetchBoard();

// console.log(count);
watchEffect(fetchBoard);
const goPage = (id) => {
  router.push({
    name: "boardDetail",
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
