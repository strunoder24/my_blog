<template>
  <div id='post-intersector-zone' ref='intersector'></div>
</template>

<script>
  export default {
      data: () => ({
          observerOptions: {
              rootMargin: '0px',
              threshold: 0.1,
          },
      }),

      mounted() {
          let observer = new IntersectionObserver(this.observerCallback, this.observerOptions);
          let target = this.$refs.intersector;

          observer.observe(target)
      },

      methods: {
          observerCallback(entries, observer) {
              console.log(entries[0]);
              if (entries[0].isIntersecting) {
                  this.$emit('imVisible')
              }
          },
      }
  }
</script>

<style lang='scss'>
  #post-intersector-zone {
    width: 0;
    height: 0;
  }
</style>