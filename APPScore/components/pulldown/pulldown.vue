<template>
	<view class="pull-down" @touchstart="startHander" @touchmove="moveHandler" @touchend="endHandler">
		<view class="load" :style="getMoveDistance">
			<view v-if="status != 'load'" class="status">{{ getStatusText }}</view>
			<view v-if="status == 'load'" class="loading"><image src="../../static/images/loading-out-gray.svg"></image></view>
		</view>
		<view class="content"><slot></slot></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			startTop: 0,
			moveDistance: 0,
			//下拉，释放,加载中成三种状态
			status: 'pull',
			timer: ''
		};
	},
	computed: {
		getMoveDistance() {
			return `margin-top:${100 - this.moveDistance >= 0 ? -(100 - this.moveDistance) : 0}px`;
		},
		getStatusText() {
			let statusText = '';
			switch (this.status) {
				case 'pull':
					statusText = '下拉刷新';
					break;
				case 'release':
					statusText = '释放立即刷新';
					break;
				case 'load':
					statusText = '加载完成';
					break;
				default:
					break;
			}
			return statusText;
		}
	},
	created() {},
	methods: {
		startHander(e) {
			let touches = e.touches;
			if (touches.length) {
				this.startTop = touches[0].clientY;
				this.$emit('startPull', this.startTop);
			}
		},
		moveHandler(e) {
			let touches = e.touches;
			if (touches.length) {
				let moveDistance = touches[0].clientY - this.startTop;
				if (moveDistance <= 100) {
					if (moveDistance <= 50) {
						this.status = 'pull';
					}
					this.$emit('pulling', moveDistance);
				} else {
					this.status = 'release';
				}
				this.moveDistance = moveDistance;
			}
		},
		endHandler(e) {
			if (this.moveDistance < 100) {
				this.moveDistance = 0;
				this.status = 'pull';
			} else {
				this.status = 'load';
				if (this.timer) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(() => {
					this.$emit('pull');
				}, 500);
			}
		},
		stopLoad() {
			this.moveDistance = 0;
		}
	}
};
</script>

<style lang="scss">
.pull-down {
	.load {
		height: 100px;
		margin-top: -100px;
		transition: all 0.4s linear;
		display: flex;
		align-items: center;
		justify-content: center;
		.status {
			color: #666;
			font-size: 14px;
		}
		.loading {
			image {
				width: 32px;
				height: 32px;
				animation: load 1.5s linear infinite;
			}
		}
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
