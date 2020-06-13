<template>
	<view class="top-navigation">
		<view class="go-back" @tap="goBack"><image src="../../static/images/back.png"></image></view>
		<view class="content"><slot></slot></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.top-navigation {
	height: 50px;
	border-bottom: 1px solid #f1f1f1f1;
	width: 100%;
	background-color: #fff;
	z-index: 999;
	position: fixed;
	.go-back {
		float: left;
		margin-left: 10px;
		height: inherit;
		display: flex;
		align-items: center;
		width: 28px;
		image {
			width: inherit;
			height: 28px;
			vertical-align: bottom;
		}
	}
	.content {
		height: inherit;
		display: flex;
		align-items: center;
	}
}
</style>
