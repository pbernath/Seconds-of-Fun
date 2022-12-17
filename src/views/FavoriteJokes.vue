<template>
  <div>
    <li v-for="joke in jokes">
      {{ joke.joke }}
    </li>
  </div>
</template>

<script>
export default {
  props: ["jokes"],
};
</script>
