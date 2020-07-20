<template>
	<view>
		<pulldown ref="pulldown" @pull="pullHandler"><button @tap="t" type="default">123</button></pulldown>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(e) {},
	methods: {
		pullHandler() {
			setTimeout(() => {
				this.$refs.pulldown.stopLoad();
			}, 1000);
		},
		t() {
			alert(123);
		}
	}
};
</script>

<style></style>
