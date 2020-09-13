<template>
  <div :class="isMobile ? 'col-4 col-6-medium col-12-small post' : 'col-12 post'">
    <section :class="isMobile ? 'box feature' : 'media'">
      <router-link :to="{ name: 'post', params: { postId: _id }}">
        <a :class="isMobile ? 'image featured' : 'imageDesktop'">
          <img class="headerImg" :src="`http://localhost:8000/api/image/${headerImg}`" alt />
        </a>
      </router-link>
      <div :class="isMobile ? 'inner' : 'media-inner'">
        <header class="postHeader">
          <div class="space-between">
            <h2 class="postTitle">{{ title }}</h2>
            <div>
              <img
                alt="Ellipsis icon"
                style="height:30px;width:30px;"
                src="https://img.icons8.com/ios-glyphs/2x/ellipsis.png"
                class="dots"
                @click="isMenuOpen = !isMenuOpen"
                v-if="authorId === user._id"
              />
              <transition name="pop">
                <div class="icons" v-show="isMenuOpen">
                  <div>
                    <router-link :to="{name: 'edit_post', params: { postId: _id }}">
                      <i class="fas fa-pencil-alt"></i>
                    </router-link>
                  </div>
                  <div>
                    <router-link to="/posts">
                      <i class="fas fa-trash-alt" @click="deletePost(_id)"></i>
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div class="info">
            <p>Made by {{ authorName }}</p>
            <p>{{ dataFormat }}</p>
          </div>
        </header>
        <p>{{ postBodyShort }}</p>
        <div class="footer">
          <router-link :to="{ name: 'post', params: { postId: _id }}">
            <a class="button icon solid">Read More</a>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
  name: "Post",
  props: [
    "_id",
    "authorId",
    "authorName",
    "title",
    "body",
    "created_at",
    "headerImg",
  ],
  methods: {
    ...mapActions("posts", ["deletePost"]),
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapState("auth", ["user"]),
    postBodyShort() {
      if (this.isMobile) {
        return this.body.slice(0, 150) + " ...";
      }
      return this.body.slice(0, 250) + " ...";
    },
    dataFormat() {
      return moment(this.created_at).format("LL");
    },
    isMobile() {
      return this.windowWidth <= 980;
    },
  },
  data() {
    return {
      windowWidth: 0,
      isMenuOpen: false,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
</script>

<style scoped>
.pop-enter-active {
  transition: all 0.3s ease !important;
}
.pop-leave-active {
  transition: all 0.3s ease !important;
}
.pop-enter,
.pop-leave-to {
  transform: translateY(-10px) !important;
  opacity: 0 !important;
}
.post {
  padding-top: 0;
}
.postTitle {
  font-size: 2rem;
}
.postHeader {
  margin-bottom: 1em;
}
.space-between {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.media-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dots {
  position: relative;
  left: 0px;
  /* border-bottom: 2px #ff4486 solid; */
  cursor: pointer;
}
/* .dots:hover {
  border-bottom: 2px #dc3545 solid;
} */
.media {
  display: flex;
  justify-content: space-between;
}
.imageDesktop {
  display: block;
  position: relative;
  overflow: hidden;
  width: 40vw;
  margin-right: 2em;
  height: 350px;
}
.headerImg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top;
}
.footer {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  line-height: 0em;
  align-items: baseline;
}
.button {
  padding: 1em 1em;
}
.info {
  margin-top: 1em;
}
.info,
.icons {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  line-height: 0em;
}
.icons {
  position: absolute;
  flex-direction: column;
}
.edit-delete {
  display: flex;
  justify-content: space-between;
}
.fas {
  border-radius: 50px;
  font-size: 1.2em;
  padding: 0.5em;
  color: white;
}
.fa-pencil-alt {
  background: #007bff;
  margin-bottom: 0.3em;
}
.fa-trash-alt {
  background: #dc3545;
}
.col-12 {
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 2.5rem;
}
@media screen and (min-width: 1280px) {
  .imageDesktop {
    margin-right: 4em;
  }
}

@media screen and (max-width: 980px) and (min-width: 736px) {
  .inner {
    height: 300px;
    padding: 2em 1em 1em 1em !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .postHeader {
    margin-bottom: 0;
  }
  .info {
    margin-top: 5px;
    margin-bottom: 0;
  }
  .dots {
    left: 0px;
  }
}

@media screen and (max-width: 768px) {
  .post {
    max-width: 400px;
    margin-right: auto;
    margin-left: auto;
  }
  .inner {
    padding: 1.2em 1em 1em 1em !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .postHeader {
    margin-bottom: 0.6em;
  }
  .info {
    margin-top: 5px;
    margin-bottom: 0;
  }
  .dots {
    left: 0px;
  }
}
@media screen and (max-width: 980px) {
  .info {
    margin-bottom: 1.5em;
  }
  .button {
    padding: 1em 1em !important;
  }
  .footer {
    margin-top: 1em;
  }
}
</style>
