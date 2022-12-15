<template>
    <div class="xkcd">
      <h1 class="xkcd_msg">This is another page to display something else</h1>
      <Button />
        <Tasks @delete-task="" :tasks="tasks"/>
      <img src="https://imgs.xkcd.com/comics/solar_system_model.png" alt="XKCD">
    
    </div>
  </template>

  <script>
import Button from '../components/Button.vue';
import Tasks from '../components/Tasks.vue';

    export default {
      name: 'xkcd',
      components: {
        Button,
        Tasks,
      },
      props: {},
      methods: {},
      data() {
        return {
            tasks: []
        }
      },
      methods: {
        deleteTask(id) {
            this.tasks = this.tasks.filter((task) => task.id !== id)
            }
        },
      created() {
        this.tasks = [
            {id: 1, text: 'Go to the store', day: 'May 5th at 2:30pm', reminder: true},
            {id: 2, text: 'Go to the gym', day: 'May 6th at 2:30pm', reminder: true},
            {id: 3, text: 'Go to the school', day: 'May 7th at 2:30pm', reminder: true},
        ]
       },
    }
    </script>

    
  <style>
  .xkcd{
    width: 430px;
    height: 290;
  }
  
  .xkcd_msg{
    color: white;
  }

  
  @media (min-width: 769px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  