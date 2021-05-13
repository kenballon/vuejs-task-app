<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>{{ titleHeader }}</h2>              
      <form @submit="onSubmit" class="add-form">
        <div class="form-control">
          <label for="title">Task</label>
          <input
            type="text"
            v-model="task.title"
            name="title"
            placeholder="Add task"
          />
        </div>
        <div class="form-control">
          <label for="due_date">Day & Time</label>
          <input type="date" v-model="task.due_date" name="due_date" />
        </div>
        <div class="form-control form-control-check">
          <label for="">Set Reminder</label>
          <input
            type="checkbox"
            v-model="task.reminder"
            name="reminder"
            placeholder="Add day & time"
          />
        </div>

        <input type="submit" value="Save Task" class="btn btn-block" />
        <i class="far fa-window-close" @click="$emit('close-modal')"></i>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'ModalEdit',
  props: {
    task: Object,
    titleHeader: String,
  }, 
  methods: {    
    onSubmit(e) {
      e.preventDefault();      

      const dateString = this.task.due_date; // change to timestamp so it can be save on firebase firestore
      const changedDate = dateString.replace(
        /(..)\/(..)\/(....) (..):(..)/,
        '$3-$2-$1 $4:$5'
      );
      const myTimestamp = firebase.firestore.Timestamp.fromDate(
        new Date(changedDate)
      );
      
      const editTask = {
        id: this.task.id,
        title: this.task.title,
        due_date: myTimestamp,
        reminder: this.task.reminder,
      };
      

      this.$emit('edit-modal-task', editTask);

      this.title = '';
      this.due_date = '';
      this.reminder = false;
      
    },
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

.far.fa-window-close {
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: -90px;
  right: -35px;
  background: white;
  padding: 15px;
  border-radius: 50%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
