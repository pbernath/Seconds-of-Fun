<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
   <h3>
      <h4>You've found your way to </h4> <h3 class="green">Seconds of Fun!</h3>
    </h3>
    <h4>
      Please choose an activity
    </h4>
  </div>
</template>

<style>
.greetings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
h4 {
  color: white;
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: start;
}

@media (min-width: 769px) {

  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
