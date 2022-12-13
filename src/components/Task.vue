<template>
    <div :class="[task.reminder ? 'reminder' : '', 'task']">
    <h3>
        {{task.text}}
    <i @click="onDelete(task.id)" class="fas fa-times"></i>
    </h3>
    <p>{{task.day}}</p>
</div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object
  },
  methods: {
    onDelete(id) {
      this.$emit('delete-task', id);
    }
  }
}

</script>

<style scope>
.fas {
    color: red;
}

.task {
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
}

.task.reminder {
    border: 5px solid green;
}

</style>