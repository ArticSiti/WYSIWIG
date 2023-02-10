<template>
	<div class="home">
	<TheEditor />
	</div>
</template>

<script>
import TheEditor from "../src/components/TheEditor/index"
export default {

	name: 'App',
	components:{
		TheEditor
	}
}
</script>

<style lang="scss">
@import "assets/main";
.home{
	width: 100%;
	background-color: rgba(30, 30, 30, 1);
}
</style>
