<template>
  <section>
    <form class="createPost-form" novalidate>
      <h1 class="createPost-header">Create Post</h1>
      <Alert />
      <div class="createPost-form-field">
        <label for="title" class="createPost-label">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          v-model="title"
          :class="isValidTitle ? '' : 'border-danger'"
        />
        <div v-if="!isValidTitle" class="text-danger">
          <span>This field is required</span>
        </div>
      </div>
      <div class="createPost-form-field">
        <label for="body" class="createPost-label">Body</label>
        <textarea
          id="body"
          placeholder="Body"
          v-model="body"
          :class="isValidBody ? '' : 'border-danger'"
        ></textarea>
        <div v-if="!isValidBody" class="text-danger">
          <span>This field is required</span>
        </div>
      </div>
      <div class="input_field">
        <label for="img" class="createPost-label">Attach an image</label>
        <input type="file" id="img" ref="img" @change="handleImgUpload()" />
        <div v-if="!isValidImg" class="text-danger">
          <span>This field is required</span>
        </div>
      </div>
      <div class="createPost-submit-field">
        <button class="btn btn-primary" type="button" @click.prevent="submitPost()">Create Post</button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import Alert from "@/components/Utils/Alert";

export default {
  name: "CreatePost",
  components: { Alert },
  data() {
    return {
      title: "",
      isValidTitle: true,
      body: "",
      isValidBody: true,
      img: "",
      isValidImg: true,
    };
  },
  methods: {
    ...mapActions("posts", ["createPost"]),
    handleImgUpload() {
      this.img = this.$refs.img.files[0];
    },
    async submitPost() {
      if (this.title && this.body && this.img) {
        let newPost = new FormData();
        newPost.append("title", this.title);
        newPost.append("body", this.body);
        newPost.append("img", this.img);

        const isSuccess = await this.createPost(newPost);
        window.scrollTo(0, 0);
        if (isSuccess) {
          this.$router.push("/posts");
        }
      } else {
        if (!this.title) {
          this.isValidTitle = false;
        }
        if (!this.body) {
          this.isValidBody = false;
        }
        if (!this.img) {
          this.isValidImg = false;
        }
      }
    },
  },
  watch: {
    title() {
      this.isValidTitle = true;
    },
    body() {
      this.isValidBody = true;
    },
    img() {
      this.isValidImg = true;
    },
  },
};
</script>

<style scoped>
.createPost-form {
  width: 90vw;
  margin: auto;
}
.createPost-header {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.createPost-label {
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 600;
}
.createPost-form-field {
  margin: 1rem auto;
}
.createPost-submit-field {
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
  .createPost-form {
    width: 33.3vw;
  }
}

@media screen and (min-width: 768px) and (max-width: 991.98px) {
  .createPost-form {
    width: 50vw;
  }
}
</style>
