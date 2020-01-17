<!--  -->
<template>
  <div>
<HeaDer></HeaDer>
<FooTer></FooTer>

  </div>
</template>

<script>
	import Header1 from "./main/header.vue";
	import Footer1 from "./main/footer.vue";
export default {
  data () {
    return {
    };
  },

		components: {
			Verify,
			"HeaDer": Header1,
			"FooTer": Footer1,
		},
  computed: {},

  methods: {
    
  }
}

</script>
<style lang='less' scoped>
</style>