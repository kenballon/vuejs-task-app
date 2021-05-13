<template>
  <div class="container">
    <Header
      @toggle-add-task="toggleAddTask"
      title="Task List Reminder"
      :showAddTask="showAddTask"
    />
    <router-view :showAddTask="showAddTask"></router-view>    
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showAddTask: false, 
    };
  },
  methods: {   
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  color: #4c1dd2;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 16px;
}

p {
  line-height: 29px;
  opacity: 0.8;
}
.container {
  width: 85%;
  max-width: 628px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid #4c1dd2;
  padding: 30px;
  border-radius: 8px;
  background: #EDE7FF;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}

button,
input[type='submit'] {
  padding: 15px 16px;
  border: 2px solid white;
  background-color: #210277;
  color: white;
  font-family: inherit;
  font-size: 20px;
  width: 100%;
  border-radius: 4px;
}

input[type='submit']:hover {
  cursor: pointer;
  background-color: #4C1DD2;
}


.btn-link-wrapper {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}

.btn-link-wrapper a {
  text-decoration: none;
  background-color: #4c1dd2;
  padding: 15px 16px;
  color: white;
  align-self: center;
  border-radius: 4px;
}

.btn-link-wrapper a:hover {
  text-decoration: none;
  background-color: #622cff;
}


</style>
