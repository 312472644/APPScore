<template>
	<view class="top-navigation">
		<view class="go-back-box" @tap="goBack">
			<view class="go-back"><image src="../../static/images/back.svg"></image></view>
			<view class="logo" v-if="isLogo"><image src="../../static/images/score.png"></image></view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isLogo: {
			type: Boolean,
			default: true
		}
	},
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
	padding-top: $tabar-padding-top;
	border-bottom: 1px solid #f1f1f1f1;
	width: 100%;
	background-color: #fff;
	z-index: 999;
	position: fixed;
	top: 0;
	.go-back-box {
		.go-back {
			margin-left: 10px;
			height: 50px;
			display: flex;
			align-items: center;
			width: 28px;
			float: left;
		}
		image {
			width: inherit;
			height: 28px;
			vertical-align: bottom;
		}
		.logo {
			width: 80px;
			height: 50px;
			margin: 0 auto;
			display: flex;
			align-items: center;
			image {
				height: 35px;
			}
		}
	}
}
</style>
