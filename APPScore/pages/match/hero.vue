<template>
	<view class="hero-box table-defined" :style="'height:' + totalHeight + 'px'">
		<!--固定的表头-->
		<view class="fixed-table-head">
			<view class="fiexed-head-item rank">名次</view>
			<view class="fiexed-head-item team">
				<text>英雄</text>
				<picker mode="selector" class="filter-image" range-key="label" @change="bindPickerChange" :range="positionList">
					<view class="select-content"><image class="filter-image" src="../../static/images/filter.svg"></image></view>
				</picker>
			</view>
		</view>
		<view class="table-head" :style="getLeft">
			<!--排序-->
			<view class="head-item" v-for="item in columnList" :key="item.value" @tap="sortHandler(item)">
				<text>{{ item.name }}</text>
				<image v-show="item.value == sort.key && sort.order == 'DESC'" class="order" src="../../static/images/down-trangle.svg"></image>
				<image v-show="item.value == sort.key && sort.order == 'ASC'" class="order" src="../../static/images/up-trangle.svg"></image>
			</view>
		</view>
		<scroll-view class="table" scroll-x="true" @scroll="scrollHead" :style="'height:' + totalHeight + 'px'">
			<view class="table-content" v-for="item in heroList" :key="item.id">
				<view class="content-item">{{ item.position_name }}</view>
				<view :class="{ 'content-item': true, ' order-active': sort.key == 'APPEAR' }">{{ item.APPEAR + '% ,' + item.appear_count + '场' }}</view>
				<view class="content-item">{{ item.PROHIBIT + '% ,' + item.prohibit_count + '场' }}</view>
				<view class="content-item">{{ item.VICTORY_RATE + '% ,' + item.victory_count + '场' }}</view>
				<view class="content-item win-rate">
					<view class="kda-box">
						<view class="value">{{ item.KDA }}</view>
						<view class="detail">{{ item.AVERAGE_KILLS }}/{{ item.AVERAGE_DEATHS }}/{{ item.AVERAGE_ASSISTS }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!--左边固定的列名-->
		<view class="fixed-table" :style="'height:' + totalHeight + 'px'">
			<view class="fixed-table-content" v-for="(item, index) in heroList" :key="item.id">
				<view class="fixed-content-item rank">
					<text v-if="index == 0" class="first">{{ index + 1 }}</text>
					<text v-else-if="index == 1" class="second">{{ index + 1 }}</text>
					<text v-else-if="index == 2" class="third">{{ index + 1 }}</text>
					<text v-else>{{ index + 1 }}</text>
				</view>
				<view class="fixed-content-item team">
					<image :src="item.hero_image"></image>
					<text>{{ item.hero_name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		tournamentID: {
			type: String
		},
		tabName: {
			type: String
		}
	},
	data() {
		return {
			scrollTop: 0,
			headLeft: 0,
			totalHeight: 'auto',
			positionId: 0,
			pulldown: '',
			sort: {
				key: 'APPEAR',
				order: 'DESC'
			},
			heroList: [],
			positionList: [
				{ label: '全部', value: '0' },
				{ label: '上单', value: '3' },
				{ label: '中单', value: '2' },
				{ label: '打野', value: '4' },
				{ label: 'ADC', value: '1' },
				{ label: '辅助', value: '5' }
			],
			columnList: [
				{ name: '位置', value: '' },
				{ name: '出场率', value: 'APPEAR' },
				{ name: '被禁率', value: 'PROHIBIT' },
				{ name: '胜率', value: 'VICTORY_RATE' },
				{ name: 'KDA', value: 'KDA' }
			]
		};
	},
	watch: {
		tournamentID: {
			handler(newValue, oldValue) {
				if (newValue) {
					this.getHeroList();
				}
			},
			immediate: true
		}
	},
	computed: {
		getLeft() {
			return `transform:translateX(-${this.headLeft}px)`;
		}
	},
	created() {
		this.bus.$on('hero', value => {
			this.pulldown = value;
			this.getHeroList();
		});
	},
	beforeDestroy() {
		this.bus.$off('hero');
	},
	methods: {
		bindPickerChange(e) {
			this.positionId = this.positionList[e.target.value].value;
			this.getHeroList();
		},
		getHeroList() {
			uni.request({
				url: 'https://www.scoregg.com/services/api_url.php',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				data: {
					api_path: '/services/gamingDatabase/match_data_ssdb_list.php',
					method: 'post',
					platform: 'web',
					api_version: '9.9.9',
					language_id: 1,
					tournament_id: this.tournamentID,
					type: 'hero',
					order_type: this.sort.key,
					order_value: this.sort.order,
					team_name: '',
					player_name: '',
					positionID: this.positionId,
					page: 1
				},
				success: res => {
					this.heroList = res.data.data.data.list;
					this.totalHeight = (this.heroList.length + 1) * 51;
				},
				complete: () => {
					if (this.pulldown) {
						this.pulldown.stopLoad();
					}
				}
			});
		},
		scrollHead(e) {
			let detail = e.detail;
			this.headLeft = detail.scrollLeft;
		},
		//数据排序
		sortHandler(item) {
			if (!item.value) {
				return false;
			}
			let sortObject = this.sort;
			let order = 'DESC';
			if (sortObject.key == item.value) {
				order = sortObject.order == 'DESC' ? 'ASC' : 'DESC';
			}
			this.sort = {
				key: item.value,
				order: order
			};
			this.getHeroList();
		}
	}
};
</script>

<style lang="scss" scoped>
.hero-box {
	.fixed-table-head,
	.fixed-table {
		width: 161px;
	}
	.table-head {
		margin-left: 161px;
	}
	.table {
		margin-left: 161px;
		width: calc(100% - 161px);
	}
	.rank {
		width: 45px !important;
	}
	.team {
		width: 115px !important;
	}
	.order {
		width: 18px;
		height: 18px;
		vertical-align: middle;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 10px;
	}
	.filter-image {
		width: 22px;
		height: 22px;
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
