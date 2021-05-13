<template>
  <div class="btn-link-wrapper">
    <router-link to="/">Go Back</router-link>
  </div>
  <div>
    <h1>
      About This App
    </h1>
  </div>
  <p>
    This is a simple VueJS App that you can add task or to do list which
    connects to Firebase. You can add delete and double click the task to
    indicate a sort reminder of the task.
  </p>
  <p>
    I hope that this will evolve soon to a full scale app which users can enjoy. This all thanks to
    <span
      ><a href="https://www.youtube.com/watch?v=qZXt1Aom3Cs"
        ><strong>Traversy Media</strong></a
      ></span
    >
    on YouTube. I felt inspired to do this and connect to Firebase so it will be closer to a real project
    scenario.
  </p>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #4c1dd2;
}
a:hover {
  text-decoration: underline;
}
.btn-link-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.btn-link-wrapper a {
  background-color: #4c1dd2;
  padding: 15px 16px;
  color: white;
  align-self: center;
}

.btn-link-wrapper a:hover {
  text-decoration: none;
  background-color: #622cff;
}
</style>
