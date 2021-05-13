<template>
  <header>
    <h2>{{ title }}</h2>
    <Button v-show="homePage" @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Close' : 'Add Task'" />
  </header>
</template>

<script>
import Button from './Button';

export default {
  name: 'Header',
  props: {
    title: String,
    showAddTask: Boolean
  },
  components: {
    Button
  },
  computed: {
    homePage(){
      if(this.$route.path === '/'){
        return true
      }
      else{
        return false
      }
    }
  }
};
</script>

<style scoped>
header{       
  padding-block: 20px;  
  display: flex;  
  align-items: center;
  margin-bottom: 20px;
}
header h2{
  margin-bottom:0;
}
</style>
