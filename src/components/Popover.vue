<template>
	<div>
		<slot></slot>
		<Teleport to="body">
			<div>456</div>
		</Teleport>
	</div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">

</style>
