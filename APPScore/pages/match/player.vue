<template>
	<view class="player-box table-defined" :style="'height:' + totalHeight + 'px'">
		<!--固定的表头-->
		<view class="fixed-table-head">
			<view class="fiexed-head-item rank">名次</view>
			<view class="fiexed-head-item team">
				<text>选手</text>
				<picker mode="selector" class="filter-image" range-key="label" @change="bindPickerChange" :range="positionList">
					<view class="select-content"><image class="filter-image" src="../../static/images/filter.svg"></image></view>
				</picker>
			</view>
		</view>
		<view class="table-head" :style="getLeft">
			<view class="head-item">KDA</view>
			<view class="head-item">MVP</view>
			<view class="head-item">出场次数</view>
			<view class="head-item">参团率</view>
			<view class="head-item">场均击杀</view>
			<view class="head-item">场均助攻</view>
			<view class="head-item">场均死亡</view>
			<view class="head-item">每分钟经济</view>
			<view class="head-item">每分钟补刀</view>
			<view class="head-item">每分钟输出</view>
			<view class="head-item">输出占比</view>
			<view class="head-item">每分钟承受伤害</view>
			<view class="head-item">承受伤害占比</view>
			<view class="head-item">每分钟插眼数</view>
			<view class="head-item">每分钟拆眼数</view>
		</view>
		<scroll-view class="table" scroll-x="true" @scroll="scrollHead" :style="'height:' + totalHeight + 'px'">
			<view class="table-content" v-for="item in playList" :key="item.id">
				<view class="content-item win-rate">
					<view class="kda-box">
						<view class="value">{{ item.KDA }}</view>
						<view class="detail">{{ item.AVERAGE_KILLS }}/{{ item.AVERAGE_DEATHS }}/{{ item.AVERAGE_ASSISTS }}</view>
					</view>
				</view>
				<view class="content-item">{{ item.MVP }}</view>
				<view class="content-item">{{ item.PLAYS_TIMES }}</view>
				<view class="content-item">{{ item.OFFERED_RATE + '%' }}</view>
				<view class="content-item">{{ item.AVERAGE_KILLS }}</view>
				<view class="content-item">{{ item.AVERAGE_ASSISTS }}</view>
				<view class="content-item">{{ item.AVERAGE_DEATHS }}</view>
				<view class="content-item">{{ item.MINUTE_ECONOMIC }}</view>
				<view class="content-item">{{ item.MINUTE_HITS }}</view>
				<view class="content-item">{{ item.MINUTE_DAMAGEDEALT }}</view>
				<view class="content-item">{{ item.DAMAGEDEALT_RATE }}</view>
				<view class="content-item">{{ item.MINUTE_DAMAGETAKEN }}</view>
				<view class="content-item">{{ item.DAMAGETAKEN_RATE }}</view>
				<view class="content-item">{{ item.MINUTE_WARDSPLACED }}</view>
				<view class="content-item">{{ item.MINUTE_WARDKILLED }}</view>
			</view>
		</scroll-view>
		<!--左边固定的列名-->
		<view class="fixed-table" :style="'height:' + totalHeight + 'px'">
			<view class="fixed-table-content" v-for="(item, index) in playList" :key="item.id">
				<view class="fixed-content-item rank">
					<text v-if="index == 0" class="first">{{ index + 1 }}</text>
					<text v-else-if="index == 1" class="second">{{ index + 1 }}</text>
					<text v-else-if="index == 2" class="third">{{ index + 1 }}</text>
					<text v-else>{{ index + 1 }}</text>
				</view>
				<view class="fixed-content-item team">
					<view class="team-item">
						<image class="user-image" :src="item.player_image"></image>
						<view class="player-info">
							<view class="info">{{ item.player_name }}</view>
							<view class="position-info">
								<text>{{ item.position }}</text>
								<text style="padding:0 3px">/</text>
								<text>{{ item.team_name }}</text>
							</view>
						</view>
					</view>
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
			index: 0,
			totalHeight: 'auto',
			pulldown: '',
			playList: [],
			positionId: 0,
			positionList: [
				{ label: '全部', value: '0' },
				{ label: '上单', value: '3' },
				{ label: '中单', value: '2' },
				{ label: '打野', value: '4' },
				{ label: 'ADC', value: '1' },
				{ label: '辅助', value: '5' }
			]
		};
	},
	watch: {
		tournamentID: {
			handler(newValue, oldValue) {
				if (newValue) {
					this.getPlayerList();
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
		this.bus.$on('player', value => {
			this.pulldown = value;
			this.getPlayerList();
		});
	},
	beforeDestroy() {
		this.bus.$off('player');
	},
	methods: {
		bindPickerChange(e) {
			this.positionId = this.positionList[e.target.value].value;
			this.getPlayerList();
		},
		getPlayerList() {
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
					type: 'player',
					order_type: 'KDA',
					order_value: 'DESC',
					team_name: '',
					player_name: '',
					positionID: this.positionId,
					page: 1
				},
				success: res => {
					this.playList = res.data.data.data.list;
					this.totalHeight = (this.playList.length + 1) * 51;
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
		}
	}
};
</script>

<style lang="scss" scoped>
.player-box {
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
	.filter-image {
		width: 22px;
		height: 22px;
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
	}
	.team {
		width: 115px !important;
		.user-image {
			border-radius: 50%;
			width: 35px !important;
			height: 35px !important;
		}
		.team-item {
			display: flex;
			align-items: center;
			height: inherit;
			.player-info {
				height: 35px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 5px;
				.info {
					line-height: normal;
					font-weight: bold;
					font-size: 15px;
				}
				.position-info {
					line-height: normal;
					text {
						font-size: 12px;
						color: #666;
					}
				}
			}
		}
	}
}
</style>
