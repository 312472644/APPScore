<template>
	<view class="hot-match tab">
		<view class="tab-head">
			<view class="tab-menu">
				<view :class="{ item: true, active: tabActiveName == 'hot' }" @tap="tabHandler('hot')"><text>热门</text></view>
				<view :class="{ item: true, active: tabActiveName == 'match' }" @tap="tabHandler('match')"><text>赛事</text></view>
				<view :class="{ item: true, active: tabActiveName == 'bigData' }" @tap="tabHandler('bigData')"><text>大数据</text></view>
			</view>
			<view class="filter" v-show="tabActiveName == 'hot'" @tap="isFilterMode = true"><image class="filter-image" src="../../static/images/filter.svg"></image></view>
		</view>
		<view class="tab-content">
			<hot v-if="tabActiveName == 'hot'" :isFilterMode.sync="isFilterMode"></hot>
			<matchlist v-if="tabActiveName == 'match'"></matchlist>
			<bigdata v-if="tabActiveName == 'bigData'"></bigdata>
		</view>
	</view>
</template>

<script>
import hot from './hot.vue';
import matchlist from './matchlist.vue';
import bigdata from './bigdata.vue';
export default {
	components: {
		hot,
		matchlist,
		bigdata
	},
	data() {
		return {
			isFilterMode: false,
			tabActiveName: 'hot'
		};
	},
	methods: {
		tabHandler(name) {
			this.tabActiveName = name;
		}
	}
};
</script>

<style lang="scss">
.hot-match {
	.filter-image {
		width: 25px;
		height: 25px;
		vertical-align: middle;
		line-height: 0;
	}
	.filter {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		line-height: 0;
		padding-top: $tabar-padding-top;
	}
}
</style>
