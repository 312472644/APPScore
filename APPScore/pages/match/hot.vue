<template>
	<view class="hot-box">
		<!--比赛类型筛选-->
		<view class="match-type-dialog" v-if="isFilterMode">
			<view class="head">
				<text>比赛筛选</text>
				<view class="fr"><image @tap="showFilterMode" class="filter-image" src="../../static/images/filter.svg"></image></view>
			</view>
			<scroll-view class="body" scroll-y="true">
				<view class="match-item" @tap="selectMatchType(item)" v-for="item in matchTypeList.list" :key="item.tournamentID">
					<view>
						<image :src="item.image_thumb"></image>
						<text>{{ item.name }}</text>
					</view>
					<uni-icons v-if="item.selected" color="#1296db" type="checkmarkempty" size="20"></uni-icons>
				</view>
			</scroll-view>
			<view class="footer">
				<button type="default" :disabled="!selectMatchList.length" @tap="reset">重置</button>
				<button type="primary" @tap="getMatchList">确定</button>
			</view>
		</view>
		<view class="match">
			<pulldown ref="pulldown" @pull="pulldown">
				<view class="match-info" v-for="(item, index) in matchList" :key="index">
					<view class="match-date">
						<text>{{ item.matchDateText }}</text>
						<text class="current-day" v-if="new Date().Format('yyyy-MM-dd') == item.matchDateValue">今天</text>
						<text class="week" v-else>{{ item.week }}</text>
					</view>
					<view class="match-name" v-if="item.tournamentinfo">
						<image class="filter-image" :src="item.tournamentinfo.image_thumb"></image>
						<text>{{ item.tournamentinfo.name }}</text>
					</view>
					<!--没有数据-->
					<view class="no-match" v-else><text>当日无比赛</text></view>
					<!--队伍详情-->
					<view class="match-team-box">
						<view class="match-team" v-for="team in item.list" :key="item.dynamic_id">
							<view class="time">{{ team.start_time }}</view>
							<view class="team-info">
								<text class="team-name">{{ team.team_a_short_name }}</text>
								<image class="filter-image" :src="team.team_a_image"></image>
								<view class="match-result" v-if="team.status == 2">
									<text :class="team.team_a_win == '2' ? 'win' : 'lose'">{{ team.team_a_win }}</text>
									<text class="character">:</text>
									<text :class="team.team_b_win == '2' ? 'win' : 'lose'">{{ team.team_b_win }}</text>
								</view>
								<text class="vs" v-else>VS</text>
								<image class="filter-image" :src="team.team_b_image"></image>
								<text class="team-name align-left">{{ team.team_b_short_name }}</text>
							</view>
						</view>
					</view>
				</view>
			</pulldown>
		</view>
	</view>
</template>

<script>
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
export default {
	components: {
		uniIcons
	},
	props: {
		isFilterMode: {
			type: Boolean
		}
	},
	data() {
		return {
			matchList: [],
			matchTypeList: [],
			selectMatchList: []
		};
	},
	created() {
		this.getMatchType();
	},
	methods: {
		pulldown(){
			this.getMatchList();
		},
		showFilterMode() {
			this.$emit('update:isFilterMode', false);
		},
		//获取比赛类型
		getMatchType() {
			uni.request({
				url: 'https://www.scoregg.com/services/api_url.php',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				data: {
					api_path: '/services/match/tournament_list.php',
					method: 'post',
					platform: 'web',
					api_version: '9.9.9',
					language_id: 1,
					gameID: 1
				},
				success: res => {
					let tournamentID = res.data.data.current_tournament.tournamentID;
					//默认选中当前比赛类型
					let currentItem = res.data.data.list.find(t => {
						return t.tournamentID == tournamentID;
					});
					if (currentItem) {
						this.selectMatchType(currentItem);
					}

					this.matchTypeList = res.data.data;
					//获取比赛数据列表
					this.getMatchList();
				}
			});
		},
		//选择比赛类型
		selectMatchType(item) {
			if (item.hasOwnProperty('selected')) {
				item.selected = !item.selected;
			} else {
				this.$set(item, 'selected', true);
			}
			this.getSelectMatchList(item.tournamentID);
		},
		//获取选中的比赛类型
		getSelectMatchList(tournamentID) {
			let index = this.selectMatchList.findIndex(item => {
				return item == tournamentID;
			});
			if (index > -1) {
				this.selectMatchList.splice(index, 1);
			} else {
				this.selectMatchList.push(tournamentID);
			}
		},
		//重置
		reset() {
			this.selectMatchList = [];
			this.matchTypeList.list.forEach(item => {
				if (item.hasOwnProperty('selected')) {
					item.selected = false;
				}
			});
		},
		//获取比赛列表
		getMatchList() {
			uni.request({
				url: 'https://www.scoregg.com/services/api_url.php',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				data: {
					api_path: 'services/match/web_math_list.php',
					gameID: 1,
					tournament_id: this.selectMatchList.join(','),
					api_version: '9.9.9',
					platform: 'web'
				},
				success: res => {
					let matchResult = res.data.data.list;
					let matchList = [];
					for (let dateProp in matchResult) {
						let obj = {};
						//需要转化日期(2020.6.14转化2020-06-14)
						let date = new Date(dateProp.toString().replace(/\./g, '-'));
						obj.matchDateValue = date.Format('yyyy-MM-dd');
						obj.matchDateText = date.Format('MM.dd');
						obj.week = date.GetWeek();
						obj.today = matchResult[dateProp].today;

						if (matchResult[dateProp].info) {
							for (let infoProp in matchResult[dateProp].info) {
								let infoResult = matchResult[dateProp].info[infoProp];
								obj.tournamentinfo = infoResult.tournamentinfo;
								obj.list = infoResult.list;
							}
						}
						matchList.push(obj);
					}
					this.matchList = matchList;
					this.showFilterMode();
					this.$refs.pulldown.stopLoad();
				}
			});
		}
	}
};
</script>

<style lang="scss">
.hot-box {
	.filter-image {
		width: 25px;
		height: 25px;
	}
	.match-type-dialog {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #ffffff;
		z-index: 999;
		.head {
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 15px;
			color: #666;
			position: relative;
			padding-top: $tabar-padding-top;
			.fr {
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
				line-height: 0;
				padding-top: $tabar-padding-top;
			}
		}
		.body {
			height: calc(100% - 120px);
			.match-item {
				height: 35px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #f1f1f1;
				padding: 5px 10px;
				align-items: center;
				font-size: 15px;
				color: #666;
				justify-content: space-between;
				image {
					height: 24px;
					width: 24px;
					margin-right: 5px;
					vertical-align: middle;
				}
			}
		}
		.footer {
			height: 60px;
			border-top: 1px solid #f1f1f1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #ffffff;
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
	.match {
		padding: 10px 15px;
		.match-info {
			&:not(:first-of-type) {
				padding-top: 10px;
			}
			.no-match {
				font-size: 14px;
				color: #666;
				text-align: center;
				padding: 10px 0;
			}
			.match-date {
				font-size: 20px;
				font-weight: bolder;
				.week {
					font-size: 14px;
					color: #666;
					padding-left: 8px;
					font-weight: normal;
				}
				.current-day {
					width: 40px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					background-image: linear-gradient(135deg, #0071f2 0%, #0593ff 100%);
					border-radius: 4px;
					font-size: 14px;
					color: #fff;
					display: inline-block;
					margin-left: 8px;
				}
			}
			.match-name {
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #666;
				padding-bottom: 8px;
				height: 25px;
				text {
					display: inline-block;
					height: inherit;
					line-height: 25px;
					padding-left: 5px;
				}
			}
			.match-team-box {
				.match-team {
					border-top: 1px solid #f1f1f1;
					display: flex;
					align-items: center;
					padding: 15px;
					font-size: 14px;
					line-height: 26px;
					&:last-of-type {
						border-bottom: 1px solid #f1f1f1;
					}
					.time {
						color: #333;
						flex-grow: 1;
					}
					.team-info {
						flex-grow: 3;
						display: flex;
						align-items: center;
						.vs {
							width: 30px;
							height: 30px;
							border-radius: 50%;
							background-color: #f0f1f3;
							display: inline-block;
							text-align: center;
							line-height: 30px;
							font-size: 13px;
							margin: 0 20px;
						}
						.team-name {
							margin: 0 8px;
							font-weight: bold;
							width: 50px;
							text-align: right;
							overflow: hidden;
							white-space: nowrap;
						}
						.match-result {
							display: inline-block;
							margin: 0 15px;
							font-weight: bold;
							.win {
								color: #f2dbb3;
							}
							.lose {
								color: #a8abb3;
							}
							.character {
								padding: 0 5px;
							}
						}
						.align-left {
							text-align: left;
						}
					}
				}
			}
		}
	}
}
</style>
