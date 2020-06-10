<template>
	<view class="index">
		<view class="tab-head">
			<view class="tab-menu">
				<view :class="{ item: true, active: tabActive == 'recommend' }" @tap="tabHandler('recommend')"><text>推荐</text></view>
				<view :class="{ item: true, active: tabActive == 'korea' }" @tap="tabHandler('korea')"><text>韩服</text></view>
			</view>
		</view>
		<view class="tab-content">
			<recommand v-if="tabActive == 'recommend'"></recommand>
			<korea v-if="tabActive == 'korea'"></korea>
		</view>
	</view>
</template>

<script>
import recommand from './recommand.vue';
import korea from './korea.vue';
export default {
	components: {
		recommand,
		korea
	},
	data() {
		return {
			tabActive: 'recommend'
		};
	},
	onReady() {},
	onReachBottom() {
		this.bus.$emit('recommand');
	},
	methods: {
		tabHandler(name) {
			this.tabActive = name;
		}
	},
	onUnload() {
		this.bus.$off('recommand');
	}
};
</script>

<style lang="scss">
.index {
	.tab-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		position: fixed;
		top: 0;
		width: 100%;
		background-color: #ffffff;
		z-index: 99;
		.tab-menu {
			display: flex;
			align-items: center;
			font-size: 18px;
			color: #333;
			transition: all 0.2s linear;
			.item {
				padding-right: 25px;
				position: relative;
				&:first-of-type {
					padding-left: 15px;
				}
				&.active {
					color: #0d8cfb;
					font-size: 20px;
					font-weight: bolder;
					&::after {
						content: '';
						width: 4px;
						height: 4px;
						border-radius: 50%;
						background-color: #fff;
						position: absolute;
						border: 2px solid #0d8cfb;
						right: 10px;
					}
				}
			}
		}
	}
	.tab-content {
		padding-top: 60px;
	}
}
</style>
