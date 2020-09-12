<template>
  <div class="alert" v-if="message">
    <span class="closebtn" @click="createMessage('')">&times;</span>
    {{ message }}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Alert",
  methods: {
    ...mapActions("messages", ["createMessage"]),
  },
  computed: {
    ...mapState("messages", ["message"]),
  },
};
</script>

<style scoped>
/* The alert message box */
.alert {
  padding: 20px;
  background-color: #f8d7da;
  color: #dc3545;
  margin-bottom: 15px;
  font-weight: 600;
}

/* The close button */
.closebtn {
  margin-left: 15px;
  color: #dc3545;
  font-weight: bold;
  float: right;
  font-size: 30px;
  line-height: 40px;
  cursor: pointer;
  transition: 0.05s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
  color: #721c67;
}
</style>
