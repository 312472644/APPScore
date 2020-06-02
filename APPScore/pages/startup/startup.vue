<template>
	<view class="start-up">
		<view class="time-box" @tap="toIndex">
			<view>跳过 {{ duration }}s</view>
		</view>
		<agreement @agree="agree"></agreement>
	</view>
</template>

<script>
export default {
	data() {
		return {
			duration: 3,
			isStartUp: false,
			interval: {}
		};
	},
	onLoad() {
		this.startUp();
	},
	methods: {
		agree(value) {
			this.isStartUp = value;
			this.startUp();
		},
		startUp() {
			let isAgree = uni.getStorageSync('agree');
			if (!this.isStartUp && !isAgree) {
				return false;
			}
			this.interval = setInterval(() => {
				this.duration--;
				if (this.duration <= 0) {
					this.toIndex();
				}
			}, 1000);
		},
		toIndex() {
			const _this = this;
			uni.switchTab({
				url: '/pages/index/index',
				success: function() {
					clearInterval(_this.interval);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.start-up {
	background: url(../../static/images/startup.png) no-repeat;
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
