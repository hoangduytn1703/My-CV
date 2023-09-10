<template>hello</template>

<script lang="ts">
import "./styles.scss";

import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    onMounted(async () => {
      console.log("sss");
    });

    return {
      //call function
    };
  },
});
</script>
<style scoped></style>
