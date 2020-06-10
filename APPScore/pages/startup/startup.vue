<template>
	<view class="start-up"><agreement @agree="agree"></agreement></view>
</template>

<script>
export default {
	data() {
		return {
			duration: 3,
			isStartUp: false,
			timeOut: {}
		};
	},
	onLoad() {
		this.startUp();
	},
	methods: {
		agree() {
			this.startUp();
		},
		startUp() {
			const isAgree = uni.getStorageSync('isAgree');
			if (!isAgree) {
				return false;
			}
			this.timeOut = setTimeout(() => {
				this.toIndex();
			}, 1000);
		},
		//首次启动加载guide页
		toIndex() {
			const _this = this;
			const isGuide = uni.getStorageSync('isGuide');
			if (isGuide) {
				uni.switchTab({
					url: '/pages/index/index',
					success: function() {
						clearInterval(_this.timeOut);
					}
				});
			} else {
				uni.redirectTo({
					url: '/pages/guide/guide',
					success: function() {
						clearInterval(_this.timeOut);
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.start-up {
	background: url(../../static/images/startup.jpg) no-repeat;
	background-size: 100% 100%;
	height: 100vh;
	.time-box {
		position: absolute;
		z-index: 9;
		top: 40px;
		right: 20px;
		border-radius: 3px;
		width: 60px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: rgba(255, 255, 255, 0.6);
		view {
			color: #fcfcfd;
			font-size: 13px;
		}
	}
}
</style>
