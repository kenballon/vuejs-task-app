<template>
  <div v-show="showAddTask">
    <AddTask @add-task="addTask" />
  </div>
  <Tasks
    @toggle-reminder="toggleReminder"
    @open-modal-edit="openModalEdit"
    @delete-task="deleteTask"
    :tasks="tasks"
  />

  <div v-show="showModalEdit">
    <ModalEdit
      @close-modal="closeModal"
      titleHeader="Edit Task"
      @edit-modal-task="editedTask"
      :task="task"
    />
  </div>

  <div v-show="showModalDelete">
    <ModalDeleteConfirmation
      @delete-task-confirm="deleteInModalConfirm"
      @delete-task-cancel="closeModalDelete"
      :task="task"
    />
  </div>
  <div class="btn-link-wrapper">
    <router-link to="/about">About this app</router-link>
  </div>
</template>

<script>
import Tasks from '../components/Tasks';
import AddTask from '../components/AddTask';
import ModalEdit from '../components/ModalEdit';
import ModalDeleteConfirmation from '../components/ModalDeleteConfirmation';
import { projectFireStore } from '../firebase/fb-config';

export default {
  name: 'Home',
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
    ModalEdit,
    ModalDeleteConfirmation,
  },
  data() {
    return {
      tasks: [],
      showModalEdit: false,
      showModalDelete: false,
      task: {
        title: '',
        due_date: '',
        id: '',
        reminder: '',
      },
    };
  },

  methods: {
    closeModal() {
      this.showModalEdit = false;
    },

    closeModalDelete() {
      this.showModalDelete = false;
    },

    async editedTask(taskEdit) {
      this.showModalEdit = false;

      const objUpdatedTask = {
        title: taskEdit.title,
        reminder: taskEdit.reminder,
        due_date: taskEdit.due_date,
      };

      const editTask = await projectFireStore
        .collection('tasks')
        .doc(taskEdit.id)
        .update(objUpdatedTask);

      const updateEl = await projectFireStore
        .collection('tasks')
        .doc(taskEdit.id);

      updateEl
        .get()
        .then((doc) => {
          const data = doc.data();
          const timeStampConvert = data.due_date.toDate();
          const due_date = this.dateConversion(timeStampConvert);

          const docObj = {
            id: taskEdit.id,
            title: data.title,
            due_date: due_date,
            reminder: data.reminder,
          };

          this.tasks = this.tasks.map((task) => {
            const id = task.id;
            if (id === taskEdit.id) {
              return {
                ...task,
                title: docObj.title,
                due_date: docObj.due_date,
                reminder: docObj.reminder,
              };
            }
          });
        })
        .catch((error) => {
          console.log('Error getting document: ', error);
        });
    },

    async openModalEdit(id) {
      this.showModalEdit = true;

      const taskFromFS = await projectFireStore
        .collection('tasks')
        .doc(id)
        .get()
        .then((doc) => {
          return doc.data();
        });

      const timeStampEdit = taskFromFS.due_date.toDate();
      const due_date = this.dateConversionToEdit(timeStampEdit);

      const taskObj = {
        id: id,
        title: taskFromFS.title,
        reminder: taskFromFS.reminder,
        due_date: due_date,
      };

      return (this.task = taskObj);
    },

    async addTask(task) {
      const add = await projectFireStore.collection('tasks').add(task);
      const res = await projectFireStore.collection('tasks').doc(add.id);

      res
        .get()
        .then((doc) => {
          const data = doc.data();
          const timeStampConvert = data.due_date.toDate();
          const due_date = this.dateConversion(timeStampConvert);

          const docObj = {
            id: add.id,
            title: data.title,
            due_date: due_date,
            reminder: data.reminder,
          };

          if (doc.exists) {
            this.tasks = [...this.tasks, docObj];
          } else {
            console.log('No such document. Adios!');
          }
        })
        .catch((error) => {
          console.log('Error getting document: ', error);
        });
    },

    async deleteTask(id) {
      this.showModalDelete = true;
      const taskToDelete = await projectFireStore
        .collection('tasks')
        .doc(id)
        .get()
        .then((doc) => {
          const data = doc.data();
          const dataObj = {
            id: id,
            title: data.title,
            due_date: data.due_date,
            reminder: data.reminder,
          };
          return dataObj;
        });

      return (this.task = taskToDelete);
    },

    async deleteInModalConfirm(deletedTaskID) {
      this.showModalDelete = false;
      const res = await projectFireStore.collection('tasks').doc(this.task.id);

      res
        .delete()
        .then(
          (this.tasks = this.tasks.filter((task) => task.id !== deletedTaskID))
        );
    },

    async toggleReminder(dataId) {
      const taskToggle = await this.fetchTask(dataId);
      const updTask = { ...taskToggle, reminder: !taskToggle.reminder };

      this.tasks = this.tasks.map((task) => {
        const updateReminder = (task, dataID) => {
          projectFireStore
            .collection('tasks')
            .doc(dataId)
            .update({ reminder: !task.reminder });
        };

        if (task.id === dataId) {
          if (task.reminder) {
            updateReminder(task, dataId);
            return { ...task, reminder: !updTask.reminder };
          } else {
            updateReminder(task, dataId);
            return { ...task, reminder: updTask.reminder };
          }
        } else {
          return task;
        }
      });
    },

    async fetchTasks() {
      const res = await projectFireStore.collection('tasks').get();
      const data = res.docs.map((task) => {
        const dataObj = { ...task.data(), id: task.id };
        const title = dataObj.title;
        const reminder = dataObj.reminder;
        const id = dataObj.id;
        const timeStamp = dataObj.due_date.toDate();
        const due_date = this.dateConversion(timeStamp);

        return { title, due_date, reminder, id };
      });

      return data;
    },

    async fetchTask(dataId) {
      const res = await projectFireStore.collection('tasks').get();

      const data = res.docs.map((task) => {
        const datus = { ...task.data(), id: task.id };
        const id = datus.id;
        const reminder = datus.reminder;
        return { id, reminder };
      });

      return data;
    },

    dateConversion(xStampConvert) {
      let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const convertedTimeStamp = `${
        months[xStampConvert.getMonth()]
      } ${xStampConvert.getDate()} ${xStampConvert.getFullYear()}`;

      return convertedTimeStamp;
    },

    dateConversionToEdit(xStampConvert) {
      const addZeroOnMonth = ('0' + (xStampConvert.getMonth() + 1)).slice(-2);
      const addZeroOnDays = ('0' + (xStampConvert.getDate() + 1)).slice(-2);

      const convertedTimeStamp = `${xStampConvert.getFullYear()}-${addZeroOnMonth}-${addZeroOnDays}`;

      return convertedTimeStamp;
    },
  },

  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
