<template >
  <div class="page-login">
    <div class="login-form">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" placeholder="username" />
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import "./styles.scss";
import { defineComponent, ref } from "vue";
import axios from "axios";
import router from "../../core/router";
const apiUrl = import.meta.env.VITE_VUE_APP_API_BASE;

export default defineComponent({
  name: "Login",
  setup() {
    const username = ref("");
    const login = () => {
      if (username.value === "") {
        alert("enter username please !")
        return
      }
      const user = {
        username: username.value,
      };
      axios
        .get(
          `${apiUrl}/users?username=${user.username}`
        )
        .then((response: any) => {
          if (response.data.message == "Get user by username successful") {
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
.page-login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 400px;
  padding: 25px;
  border: 1px solid #534c4c;
  box-shadow: 1px 11px 12px 4px #0000007a;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
}

input[type="text"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #000;
  color: #000;
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
