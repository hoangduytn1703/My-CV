<template>
  <div class="login-form">
    <label for="username">Username:</label>
    <input type="text" id="username" v-model="username" />
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import "./styles.scss";
import { defineComponent, ref } from "vue";
import axios from "axios";
import router from "../../core/router";

export default defineComponent({
  name: "Login",
  setup() {
    const username = ref("!");
    const login = () => {
      const user = {
        username: username.value,
      };
      axios
        .get(
          `https://api-coderpush-gpt.weesmartvn.com/users?username=${user.username}`
        )
        .then((response: any) => {
          if (response.data.message == "Get user by username successful") {
console.log("ss", response.data.data.id);
            router.push(`/home?id=${response.data.data.id}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    return {
      username,
      login,
    };
  },
});
</script>
<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 300px;
}
label {
  font-weight: bold;
  margin-bottom: 10px;
}
input[type="text"] {
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
}
button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
