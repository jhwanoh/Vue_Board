<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ title }}</td>
    <td>{{ writer }}</td>
    <td>{{ date }}</td>
    <td>{{ visitCount }}</td>
  </tr>
</template>

<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
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
  visitCount: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
