<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <div class="title-wrapper">
      <h3>{{ task.title }}</h3>
      <div class="edit-delete-wrapper">
        <span @click="$emit('open-modal-edit', task.id)">Edit</span>
        <span @click="$emit('delete-task', task.id)">Delete</span>
      </div>
    </div>

    <div class="date-wrapper">
      <p>{{ task.due_date }}</p>
    </div>

   
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object,
  },
};
</script>

<style scoped>
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
.task {
  background: #d4c5ff;
  color: #210277;
  margin-block: 5px;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
}
.task:hover {
  background: #cdbbff;
}

.task.reminder {
  border-left: 5px solid #4c1dd2;
}

.task .title-wrapper {
  display: flex;
  align-items: center;  
  margin-bottom:8px;
}

.task .title-wrapper h3{
  margin:0;
}

.task .title-wrapper .edit-delete-wrapper{
    margin-left: auto;
    display: flex;
    grid-column-gap: 16px;
}
</style>
