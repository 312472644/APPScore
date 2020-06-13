<template>
	<view class="index tab">
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
	onPullDownRefresh() {
		this.bus.$emit('recommand', 'pull');
	},
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
	
}
</style>
