<template>
  <tr>
    <td hidden>{{ id }}</td>
    <td hidden>{{ bid }}</td>
    <td>{{ writer }}</td>
    <td>{{ content }}</td>
    <td id="dateTd">{{ date }}</td>
    <td>
      <input
        class="btn btn-outline-danger"
        type="button"
        value="삭제"
        @click="removeReview"
      />
    </td>
  </tr>
</template>

<script setup>
import { deleteReview } from "@/api/review";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  bid: {
    type: Number,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const removeReview = async () => {
  try {
    if (confirm("삭제 하시겠습니까?") === false) {
      return;
    }
    await deleteReview(props.id);
    router.push({
      name: "boardDetail",
      params: { id: props.bid },
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped></style>
