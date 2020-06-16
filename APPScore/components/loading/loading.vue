<template>
	<view class="load-box" id="load" v-if="load" :style="getStyle">
		<image class="image-load" src="../../static/images/loading-out.svg"></image>
		<text>{{ loadText }}</text>
	</view>
</template>

<script>
export default {
	props: {
		top: {
			type: Number,
			default: 50
		},
		bottom: {
			type: Number,
			default: 50
		},
		bgColor: {
			type: String,
			default: '#fff'
		},
		loadText: {
			type: String,
			default: '加载中...'
		}
	},
	data() {
		return {
			load: false
		};
	},
	computed: {
		getStyle() {
			return `top:${this.top}px;bottom:${this.bottom}px;background:${this.bgColor}`;
		}
	},
	methods: {
		showLoading() {
			this.load = true;
		},
		hideLoading() {
			this.load = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.load-box {
	position: fixed;
	top: 0;
	width: 100%;
	bottom: 50px;
	background-color: #ffffff;
	z-index: 999999;
	display: flex;
	justify-content: center;
	align-items: center;
	text {
		font-size: 14px;
		padding-left: 5px;
		color: #1296db;
	}
	.image-load {
		background-color: #ffffff;
		width: 32px;
		height: 32px;
		animation: load 1.5s linear infinite;
	}
	@keyframes load {
		0% {
			transform: rotate(0deg);
			transform-origin: center center;
		}
		100% {
			transform: rotate(1turn);
			transform-origin: center center;
		}
	}
}
</style>
