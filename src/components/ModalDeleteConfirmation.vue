<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>Delete Confirmation</h2>    
      <p>Are you sure you wanted to delete this task: <span class="task-to-delete"><strong>{{task.title}}</strong></span>?</p>        
      <div class="d-flex-gap-10">
          <button id="cancel" class="btn cancel" @click="$emit('delete-task-cancel')">Cancel</button>
          <button id="confirm-del" class="btn delete" @click="$emit('delete-task-confirm', task.id)">Delete</button>
    </div>           
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
.modal-backdrop {
  top: 0;
  left: 0;
  position: fixed;
  background-color: #00000094;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.modal-backdrop .modal {
  background-color: #ede7ff;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 8px;
}

.add-form {
  margin-bottom: 40px;
  position: relative;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin-block: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
.btn.btn-block:hover {
  cursor: pointer;
}

input[type='text'],
input[type='date'] {
  font-family: inherit;
  font-size: 20px;
  border: 1px solid #4c1dd2;
  border-radius: 4px;
  padding: 15px;
}

input[type='text']:focus,
input[type='date']:focus {
  outline-color: #4c1dd2;
}

.d-flex-gap-10{
    display:flex;
    align-items: center;
    grid-column-gap: 10px;
}

.btn.cancel{
    background-color: #d4c5ff;
    color:#210277;
}
.btn.cancel:hover{
    background-color: #dcd1fc;
}

.btn.delete{
    background-color: #5F2EEA;
}
.btn.delete:hover{
    background-color: #7549F3;
}

.task-to-delete{
  font-weight: 700;
}

</style>
