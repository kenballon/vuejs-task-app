<template>
  <div class="card-wrapper">
    <div v-for="task in tasks" class="task-card-item">
      <Task
        @toggle-reminder="$emit('toggle-reminder', task.id)"
        @open-modal-edit="$emit('open-modal-edit', task.id)"
        @delete-task="$emit('delete-task', task.id)"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import Task from './Task';

export default {
  name: 'Tasks',
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
 
  emits: ['delete-task', 'toggle-reminder', 'open-modal-edit'],
};
</script>
