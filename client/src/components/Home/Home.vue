<template>
  <div>
    <Banner />
    <RecentPosts />
  </div>
</template>

<script>
import Banner from "./Banner";
import RecentPosts from "@/components/Posts/RecentPosts";

export default {
  name: "Home",
  components: { Banner, RecentPosts },
};
</script>
