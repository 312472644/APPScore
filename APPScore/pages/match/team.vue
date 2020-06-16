<template>
	<view class="team-box">
		<view class="fixed-table-head">
			<view class="fiexed-head-item rank">排名</view>
			<view class="fiexed-head-item team">队伍</view>
		</view>
		<view class="table-head" :style="getLeft">
			<view class="head-item">比赛场数</view>
			<view class="head-item">胜率</view>
			<view class="head-item">KDA</view>
			<view class="head-item">场均击杀</view>
			<view class="head-item">场均死亡</view>
			<view class="head-item">场均时长</view>
			<view class="head-item">一血率</view>
			<view class="head-item">场均输出</view>
			<view class="head-item">分均输出</view>
			<view class="head-item">分均补刀</view>
			<view class="head-item">场均经济</view>
			<view class="head-item">分均经济</view>
			<view class="head-item">场均小龙</view>
			<view class="head-item">小龙控制率</view>
			<view class="head-item">每分钟插眼数</view>
			<view class="head-item">每分钟拆眼数</view>
			<view class="head-item">场均推塔</view>
			<view class="head-item">场均被推塔数</view>
			<view class="head-item">场均大龙</view>
			<view class="head-item">大龙控制率</view>
		</view>
		<scroll-view class="table" scroll-x="true" @scroll="scrollHead">
			<view class="table-content" v-for="item in gamingDatabaseList" :key="item.id">
				<view class="content-item">{{ item.MACTH_TIMES }}</view>
				<view class="content-item win-rate">
					<view class="victory">
						<view>{{ item.VICTORY_RATE + '%' }}</view>
						<view class="bar">
							<view class="full"><view class="win" :style="'width:' + item.VICTORY_RATE + '%'"></view></view>
						</view>
					</view>
				</view>
				<view class="content-item win-rate">
					<view class="kda-box">
						<view class="value">{{ item.KDA }}</view>
						<view class="detail">{{ item.AVERAGE_KILLS }}/{{ item.AVERAGE_DEATHS }}/{{ item.AVERAGE_ASSISTS }}</view>
					</view>
				</view>
				<view class="content-item">{{ item.AVERAGE_KILLS }}</view>
				<view class="content-item">{{ item.AVERAGE_DEATHS }}</view>
				<view class="content-item">{{ item.AVERAGE_TIME }}</view>
				<view class="content-item">{{ item.FIRSTBLOODKILL + '%' }}</view>
				<view class="content-item">{{ item.AVERAGE_CHAMPIONS }}</view>
				<view class="content-item">{{ item.MINUTE_OUTPUT }}</view>
				<view class="content-item">{{ item.MINUTE_HITS }}</view>
				<view class="content-item">{{ item.AVERAGE_MONEY }}</view>
				<view class="content-item">{{ item.MINUTE_MONEY }}</view>
				<view class="content-item">{{ item.AVERAGE_SMALLDRAGON }}</view>
				<view class="content-item">{{ item.SMALLDRAGON_RATE + '%' }}</view>
				<view class="content-item">{{ item.MINUTE_WARDSPLACED }}</view>
				<view class="content-item">{{ item.MINUTE_WARDSKILLED }}</view>
				<view class="content-item">{{ item.AVERAGE_TOWER_SUCCESS }}</view>
				<view class="content-item">{{ item.AVERAGE_TOWER_FAIL }}</view>
				<view class="content-item">{{ item.AVERAGE_BIGDRAGON }}</view>
				<view class="content-item">{{ item.BIGDRAGON_RATE + '%' }}</view>
			</view>
		</scroll-view>
		<!--左边固定的列名-->
		<view class="fixed-table">
			<view class="fixed-table-content" v-for="(item, index) in gamingDatabaseList" :key="item.id">
				<view class="fixed-content-item rank">{{ index + 1 }}</view>
				<view class="fixed-content-item team">
					<image :src="item.team_image"></image>
					<text>{{ item.team_name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			scrollTop: 0,
			headLeft: 0,
			gamingDatabaseList: []
		};
	},
	created() {
		this.getGamingDatabase();
	},
	computed: {
		getLeft() {
			return `transform:translateX(-${this.headLeft}px)`;
		}
	},
	methods: {
		getGamingDatabase() {
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
					tournament_id: 172,
					type: 'team',
					order_type: 'KDA',
					order_value: 'DESC',
					team_name: '',
					player_name: '',
					positionID: '',
					page: 1
				},
				success: res => {
					this.gamingDatabaseList = res.data.data.data.list;
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
$height: 50px;
@mixin td {
	display: inline-block;
	vertical-align: middle;
	width: 100px;
	height: $height;
	line-height: $height;
	font-size: 13px;
	text-align: center;
	color: #666;
	border-bottom: 1px solid #f1f1f1;
}
@mixin head {
	white-space: nowrap;
	position: sticky;
	top: 80px;
	background: #fff;
}
.team-box {
	position: relative;
	height: 1200px;
	.table-head {
		margin-left: 141px;
		z-index: 998;
		width: 2000px;
		@include head;
		.head-item {
			border-top: 1px solid #f1f1f1;
			@include td;
		}
	}
	.fixed-table-head {
		z-index: 999;
		width: 141px;
		float: left;
		border-top: 1px solid #f1f1f1;
		@include head;
		.fiexed-head-item {
			@include td;
		}
	}
	.rank {
		width: 60px !important;
		text-align: center !important;
	}
	.team {
		width: 80px !important;
		border-right: 1px solid #f1f1f1;
	}
	.table {
		white-space: nowrap;
		margin-left: 141px;
		width: calc(100% - 141px);
		position: absolute;
		top: 0;
		.table-content {
			&:nth-of-type(1) {
				.content-item {
					margin-top: 52px;
				}
			}
			.content-item {
				@include td;
				&.win-rate {
					line-height: normal !important;
				}
				.victory {
					height: $height;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.bar {
						width: 80px;
						height: 8px;
						margin-top: 3px;
						.full {
							height: inherit;
							background-color: #e3e5e6;
							border-radius: 30px;
							position: relative;
							border-radius: 30px;
						}
						.win {
							width: 30%;
							height: inherit;
							background: #0c9dfc;
							height: inherit;
							border-radius: 30px;
						}
					}
				}
				.kda-box {
					height: $height;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.value {
						color: #0c9dfc;
					}
					.detail {
						color: #999fad;
						font-size: 12px;
					}
				}
			}
			&:nth-of-type(2n + 1) {
				.content-item {
					background-color: #fafbfc;
				}
			}
		}
	}
	.fixed-table {
		position: absolute;
		top: 0px;
		width: 141px;
		box-sizing: border-box;
		.fixed-table-content {
			&:nth-of-type(1) {
				.fixed-content-item {
					margin-top: 52px;
				}
			}
			&:nth-of-type(2n + 1) {
				.fixed-content-item {
					background-color: #fafbfc;
				}
			}
			.fixed-content-item {
				@include td;
				text-align: left;
				image {
					width: 25px;
					height: 25px;
					vertical-align: middle;
					padding-right: 5px;
				}
				text {
					vertical-align: middle;
				}
			}
		}
	}
}
</style>
