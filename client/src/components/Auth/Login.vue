<template>
  <section>
    <form class="login-form" novalidate>
      <h1 class="login-header">Login</h1>
      <Alert />
      <div class="login-form-field">
        <label for="Email" class="login-label">Email</label>
        <input
          type="email"
          id="Email"
          placeholder="Email"
          v-model="email"
          :class="isValidEmail ? '' : 'border-danger'"
        />
        <div v-if="!isValidEmail" class="text-danger">
          <span v-if="email.length === 0">This field is required</span>
          <span v-else>Email format is incorrect</span>
        </div>
      </div>
      <div class="login-form-field">
        <label for="Password" class="login-label">Password</label>
        <input
          type="password"
          id="Password"
          placeholder="Password"
          v-model="password"
          :class="isValidPassword ? '' : 'border-danger'"
        />
        <div v-if="!isValidPassword" class="text-danger">
          <span>This field is required</span>
        </div>
      </div>
      <div class="login-submit-field">
        <button class="btn btn-primary" type="button" @click.prevent="submitUser()">Login</button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import Alert from "@/components/Utils/Alert";

export default {
  name: "Login",
  components: { Alert },
  data() {
    return {
      email: "",
      isValidEmail: true,
      password: "",
      isValidPassword: true,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    async submitUser() {
      if (
        this.isValidEmail &&
        this.isValidPassword &&
        this.email &&
        this.password
      ) {
        const isLoginSuccess = await this.login({
          email: this.email,
          password: this.password,
        });
        window.scrollTo(0, 0);

        console.log("isLoginSuccess", isLoginSuccess);
        if (isLoginSuccess) {
          this.$router.push("/");
          this.$router.go();
        }
      } else {
        if (!this.email) {
          this.isValidEmail = false;
        }
        if (!this.password) {
          this.isValidPassword = false;
        }
      }
    },
  },
  watch: {
    email() {
      if (this.email) {
        this.isValidEmail = this.validateEmail(this.email);
      } else {
        this.isValidEmail = true;
      }
    },
    password() {
      this.isValidPassword = true;
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 90vw;
  margin: auto;
}
.login-header {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.login-label {
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 600;
}
.login-form-field {
  margin: 1rem auto;
}
.login-submit-field {
  margin: 2em auto;
  display: flex;
  justify-content: center;
}
.text-danger {
  color: #dc3545;
  font-size: 0.9rem;
}
.border-danger {
  border: 1px solid #dc3545 !important;
}
li {
  margin-bottom: -15px;
  margin-top: -8px;
}
@media screen and (min-width: 992px) {
  .login-form {
    width: 33.3vw;
  }
}

@media screen and (min-width: 768px) and (max-width: 991.98px) {
  .login-form {
    width: 50vw;
  }
}
</style>
