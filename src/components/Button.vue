<template>
   <button  @click="onClick()">{{text}}</button>
</template>

<script>
export default {
    name: 'Button',
    props:{
        text: String       
    }, 
    methods: {
        onClick(){
            this.$emit('btn-click')
        }
    },
}
</script>

<style scoped>
button{
    margin-left: auto;
    padding: 10px 10px;
    background-color: #5F2EEA;
    color: white;
    font-family: inherit;
    border:0;
    cursor: pointer;   
    font-size: 18px;
    font-weight: bold; 
    align-items:center;
    max-width:120px;
}

button:hover{
    background-color: #7549F3;
}
</style>