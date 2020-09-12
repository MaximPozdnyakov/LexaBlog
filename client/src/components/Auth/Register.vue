<template>
  <section>
    <form class="register-form" novalidate>
      <h1 class="register-header">Register</h1>
      <Alert />
      <div class="register-form-field">
        <label for="username" class="register-label">Username *</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="username"
          :class="isValidUsername ? '' : 'border-danger'"
        />
        <div v-if="!isValidUsername" class="text-danger">
          <span>This field is required</span>
        </div>
      </div>
      <div class="register-form-field">
        <label for="Email" class="register-label">Email *</label>
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
      <div class="register-form-field">
        <label for="Password" class="register-label">Password *</label>
        <input
          type="password"
          id="Password"
          placeholder="Password"
          v-model="password"
          :class="isValidPassword ? '' : 'border-danger'"
        />
        <div v-if="!isValidPassword" class="text-danger">
          <span v-if="password.length === 0">This field is required</span>
          <div v-else>
            <span>Password should be:</span>
            <ul>
              <li>At least 8 characters long</li>
              <li>Contain at least 1 lowercase and 1 uppercase character</li>
              <li>Contain at least 1 digit</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="register-form-field">
        <label for="confirmPassword" class="register-label">Confirm Password *</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          v-model="confirmPassword"
          :class="isValidConfirmPassword ? '' : 'border-danger'"
        />
        <div v-if="!isValidConfirmPassword" class="text-danger">
          <span v-if="confirmPassword.length === 0">This field is required</span>
          <span v-else>Passwords don't match</span>
        </div>
      </div>
      <div class="input_field">
        <label for="avatar" class="register-label">Attach user avatar</label>
        <input type="file" id="avatar" ref="avatar" @change="handleAvatarUpload()" />
      </div>
      <div class="register-submit-field">
        <button class="btn btn-primary" type="button" @click.prevent="submitUser()">Register</button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import Alert from "@/components/Utils/Alert";

export default {
  name: "Register",
  components: { Alert },
  data() {
    return {
      username: "",
      isValidUsername: true,
      email: "",
      isValidEmail: true,
      password: "",
      isValidPassword: true,
      confirmPassword: "",
      isValidConfirmPassword: true,
      avatar: "",
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    handleAvatarUpload() {
      this.avatar = this.$refs.avatar.files[0];
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validatePassword(password) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password);
    },
    async submitUser() {
      if (
        this.isValidUsername &&
        this.isValidEmail &&
        this.isValidPassword &&
        this.isValidConfirmPassword &&
        this.username &&
        this.email &&
        this.password &&
        this.confirmPassword
      ) {
        let newUser = new FormData();
        newUser.append("username", this.username);
        newUser.append("email", this.email);
        newUser.append("password1", this.password);
        newUser.append("password2", this.confirmPassword);
        if (this.avatar) {
          newUser.append("img", this.avatar);
        }

        const isRegisterSuccess = await this.register(newUser);
        window.scrollTo(0, 0);

        if (isRegisterSuccess) {
          this.$router.push("/");
          this.$router.go();
        }
      } else {
        if (!this.username) {
          this.isValidUsername = false;
        }
        if (!this.email) {
          this.isValidEmail = false;
        }
        if (!this.password) {
          this.isValidPassword = false;
        }
        if (!this.confirmPassword) {
          this.isValidConfirmPassword = false;
        }
      }
    },
  },
  watch: {
    username() {
      this.isValidUsername = true;
    },
    email() {
      if (this.email) {
        this.isValidEmail = this.validateEmail(this.email);
      } else {
        this.isValidEmail = true;
      }
    },
    password() {
      if (this.password) {
        this.isValidPassword = this.validatePassword(this.password);
      } else {
        this.isValidPassword = true;
      }
    },
    confirmPassword() {
      if (this.confirmPassword) {
        this.isValidConfirmPassword = this.password === this.confirmPassword;
      } else {
        this.isValidConfirmPassword = true;
      }
    },
  },
};
</script>

<style scoped>
.register-form {
  width: 90vw;
  margin: auto;
}
.register-header {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.register-label {
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 600;
}
.register-form-field {
  margin: 1rem auto;
}
.register-submit-field {
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
  .register-form {
    width: 33.3vw;
  }
}

@media screen and (min-width: 768px) and (max-width: 991.98px) {
  .register-form {
    width: 50vw;
  }
}
</style>
