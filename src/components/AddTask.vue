<template>
    <form @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label for="title">Task</label>
            <input type="text" v-model="title" name="title" placeholder="Add task">
        </div>
        <div class="form-control">
            <label for="due_date">Day & Time</label>            
            <input type="date" v-model="due_date" name="due_date">
        </div>
        <div class="form-control form-control-check">
            <label for="">Set Reminder</label>
            <input type="checkbox" v-model="reminder" name="reminder" placeholder="Add day & time">
        </div>

        <input type="submit" value="Save Task" class="btn btn-block">
    </form>
</template>

<script>
import firebase from 'firebase/app';

export default {
    name: 'AddTask',
    data(){
        return{
            title: '',
            due_date: '',
            reminder: false
        }
    }, 
    methods: {
        onSubmit(e){
            e.preventDefault();

            const dateString = this.due_date; // change to timestamp so it can be save on firebase firestore             
            const changedDate = dateString.replace(/(..)\/(..)\/(....) (..):(..)/, '$3-$2-$1 $4:$5');                        
            const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date(changedDate));            

            if(!this.title){
                alert('Please add a task')
            }

            const newTask = {                
                title: this.title,
                due_date: myTimestamp,
                reminder: this.reminder
            }
            
            this.$emit('add-task', newTask)

            this.title = '';
            this.due_date = '';
            this.reminder = false;
        }
    },
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
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
  margin: 5px;
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
.btn.btn-block:hover{
  cursor: pointer;
}

input[type="text"], input[type="date"]{
  font-family: inherit;
  font-size: 20px;
  border:1px solid #4c1dd2;
  border-radius: 4px;
  padding:15px;
}

input[type="text"]:focus, input[type="date"]:focus{
  outline-color:#4c1dd2;
}
</style>