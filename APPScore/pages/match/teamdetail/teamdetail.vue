<template>
	<view class="team-detail">
		<topnavigation :isLogo="false">
			<view class="s-logo" v-if="teamResult.team">
				<image :src="teamResult.team.image_thumb"></image>
				<text>{{ teamResult.team.short_name }}</text>
			</view>
		</topnavigation>
		<view class="team-info" v-if="teamResult.team">
			<view class="team-logo"><image :src="teamResult.team.image_thumb"></image></view>
			<view class="team-name">{{ teamResult.team.short_name }}</view>
			<view class="team-player-box">
				<view class="team-tips">战队内容</view>
				<view class="team-player">
					<view class="player-item" v-for="(item, index) in teamResult.team.player" :key="index" v-if="index < 5">
						<image :src="item.image_thumb"></image>
						<view class="player-name">{{ item.nickname }}</view>
						<view class="player-position">{{ item.position_name }}</view>
					</view>
				</view>
			</view>
		</view>
		<splitline></splitline>
		<!--比赛数据-->
		<card title="比赛数据">
			<view class="body">
				<view class="chart">
					<view class="item win-box">
						<circleChart :seriesData="seriesData"></circleChart>
						<view class="win-desc" v-if="teamResult.data">
							<text>{{ teamResult.data.win }}胜</text>
							<text>{{ teamResult.data.lose }}败</text>
						</view>
					</view>
					<view class="item kda-box">
						<view class="kda-bg-box">
							<view class="kda-bg">
								<view class="kda-desc" v-if="teamResult.data">
									<view class="key-box">
										<view class="key">{{ teamResult.data.KDA }}</view>
										<view class="kda-value">
											<text>{{ teamResult.data.kills }}</text>
											<text style="padding:0 3px">/</text>
											<text style="color: #0C9DFC;">{{ teamResult.data.deaths }}</text>
											<text style="padding:0 3px">/</text>
											<text>{{ teamResult.data.assists }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="kda-text">KDA</view>
					</view>
				</view>
				<!--输出详情-->
				<view class="output-box" v-if="teamResult.data">
					<view class="output-item">
						<view class="output-item-box">
							<view class="output">
								<text class="key">分均输出</text>
								<text class="value">{{ teamResult.data.totalDamageDealtToChampions }}</text>
							</view>
						</view>
						<view class="output-item-box">
							<view class="output">
								<text class="key">分均经济</text>
								<text class="value">{{ teamResult.data.money }}</text>
							</view>
						</view>
					</view>
					<view class="output-item">
						<view class="output-item-box">
							<view class="output">
								<text class="key">分均补刀</text>
								<text class="value">{{ teamResult.data.hits }}</text>
							</view>
						</view>
						<view class="output-item-box">
							<view class="output">
								<text class="key">一血率</text>
								<text class="value">{{ teamResult.data.first_blood_rate }}%</text>
							</view>
						</view>
					</view>
					<view class="output-item">
						<view class="output-item-box">
							<view class="output">
								<text class="key">场均推塔</text>
								<text class="value">{{ teamResult.data.towers }}</text>
							</view>
						</view>
						<view class="output-item-box">
							<view class="output">
								<text class="key">大龙控制率</text>
								<text class="value">{{ teamResult.data.baron_rate }}%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</card>
		<splitline></splitline>
		<!--未来比赛-->
		<card title="未来6场比赛">
			<view class="match-item-box" v-if="teamResult.future_match_list && teamResult.future_match_list.length">
				<view class="match-item">
					<view class="match-title">
						<image src="https://img1.famulei.com/z/2373870/p/206/0218594187287.png?x-oss-process=image/resize,m_fill,w_24,h_24"></image>
						<text class="text">2020 LPL夏季赛-常规赛 08-09 19:00</text>
					</view>
					<view class="match-team-box">
						<view class="match-score-box">
							<view class="team-info-box">
								<view class="team">
									<image src="https://img1.famulei.com/z/2373870/p/201/0815380694212_100X100.png?x-oss-process=image/resize,m_fill,w_24,h_24"></image>
									<text>IG</text>
								</view>
								<view class="score">
									<view class="score-result">
										<view class="game-bg">
											<text></text>
											<text></text>
											<text></text>
										</view>
									</view>
								</view>
							</view>
							<view class="team-info-box"></view>
						</view>
						<view class="match-detail"><text>查看详情</text></view>
					</view>
				</view>
			</view>
			<view class="no-record" v-else><text>暂无数据</text></view>
		</card>
	</view>
</template>

<script>
import circleChart from './circle.vue';
export default {
	components: {
		circleChart
	},
	data() {
		return {
			teamID: '',
			teamResult: {},
			seriesData: {}
		};
	},
	onLoad(param) {
		if (param) {
			this.teamID = param.teamID;
			this.getTeamDetail();
		}
	},
	methods: {
		getTeamDetail() {
			uni.request({
				url: 'https://www.scoregg.com/services/api_url.php',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				data: {
					api_path: '/services/gamingDatabase/team.php',
					method: 'post',
					platform: 'web',
					api_version: '9.9.9',
					language_id: 1,
					act: 'home',
					teamID: this.teamID,
					year: ''
				},
				success: res => {
					this.teamResult = res.data.data;
					this.seriesData = {
						series: [
							{
								name: '胜率',
								data: res.data.data.data.victory_rate / 100,
								color: '#0c9dfc'
							}
						]
					};
					console.log(this.teamResult);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.team-detail {
	padding-top: 70px;
	.s-logo {
		display: flex;
		align-items: center;
		height: 50px;
		padding-left: 10px;
		image {
			width: 30px;
			height: 30px;
		}
		text {
			font-size: 18px;
			color: #666;
			padding: 0 8px;
		}
	}
	.team-info {
		text-align: center;
		border-bottom: 1px solid #f8f8f8;
		.team-logo {
			padding-top: 20px;
			image {
				width: 100px;
				height: 100px;
			}
		}
		.team-name {
			font-size: 26px;
			font-weight: bolder;
			color: #373a41;
		}
		.team-player-box {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			margin: 10px 0;
			.team-tips {
				border-radius: 30px;
				background-color: #f5f9fc;
				text-align: center;
				padding: 7px 0;
				width: 120px;
				font-size: 13px;
				color: #666;
			}
			.team-player {
				width: 100%;
				display: flex;
				justify-content: center;
				margin: 15px 0;
				.player-item {
					width: 20%;
					image {
						border-radius: 50%;
						width: 60px;
						height: 60px;
						background-color: #dce0e3;
					}
					.player-name {
						font-weight: bolder;
						font-size: #333;
						font-size: 15px;
						padding: 5px 0;
					}
					.player-position {
						font-size: 13px;
						color: #999;
					}
				}
			}
		}
	}
	.body {
		.chart {
			display: flex;
			padding: 40px 0;
			box-sizing: border-box;
			.item {
				width: 50%;
				height: 150px;
				&:first-of-type {
					border-right: 1px solid #ebedf2;
				}
			}
			.win-box {
				.win-desc {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 15px;
					padding-top: 10px;
					text {
						padding-right: 5px;
					}
				}
			}
			.kda-box {
				.kda-bg-box {
					position: relative;
					display: flex;
					justify-content: center;
				}
				.kda-bg {
					background: url(../../../static/images/hexagon.svg) no-repeat;
					background-size: cover;
					width: 130px;
					height: 130px;
					.kda-desc {
						height: inherit;
						.key-box {
							color: #0c9dfc;
							height: inherit;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							.key {
								font-size: 25px;
							}
							.kda-value {
								font-size: 15px;
								color: #373a41;
								font-style: italic;
								position: relative;
								background-color: #ffffff;
								z-index: 99;
								width: 113px;
								text-align: center;
							}
						}
					}
				}
				.kda-text {
					font-size: 15px;
					padding-top: 10px;
					text-align: center;
				}
			}
		}
		.output-box {
			padding: 0 20px;
			.output-item {
				display: flex;
				margin-bottom: 15px;
				.output-item-box {
					width: 50%;
					&:nth-of-type(1) {
						margin-right: 5px;
					}
					&:nth-of-type(2) {
						margin-left: 5px;
					}
					.output {
						border-radius: 30px;
						background: #f5f9fc;
						height: 40px;
						font-size: 13px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 15px;
						box-sizing: border-box;
						.key {
							color: #666;
						}
						.value {
							color: #333;
							font-weight: bolder;
							text-align: center;
						}
					}
				}
			}
		}
	}
	.match-item-box {
		padding: 15px;
		.match-item {
			padding: 12px 0 14px 12px;
			border-radius: 5px;
			border: 1px solid #f0f1f2;
			.match-title {
				display: flex;
				align-items: center;
				image {
					width: 24px;
					height: 24px;
					vertical-align: middle;
				}
				.text {
					padding-left: 5px;
					font-size: 13px;
				}
			}
			.match-team-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 0;
				.match-score-box {
					width: calc(100% - 90px);
					.team-info-box {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-right: 10px;
						.team {
							image {
								width: 24px;
								height: 24px;
								vertical-align: middle;
							}
							text {
								padding-left: 5px;
								font-size: 13px;
							}
						}
						.score {
							.score-result {
								border-radius: 6px;
								background-color: #f5f6f7;
								.game-bg {
									padding: 0 12px;
									height: 15px;
									background: #f7f8fa;
									border-radius: 8px;
									display: flex;
									align-items: center;
									justify-content: flex-start;
									text {
										flex-shrink: 0;
										display: inline-block;
										border-radius: 50%;
										width: 5px;
										height: 5px;
										background: #d2d4d9;
										margin: 0 3px;
									}
								}
							}
						}
					}
				}
				.match-detail {
					font-size: 13px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-left: 1px solid #d8d8d8;
					padding: 0 10px;
					text {
						border-radius: 30px;
						border: 1px solid #0d8dfc;
						color: #0d8dfc;
						text-align: center;
						line-height: 25px;
						width: 80px;
						display: inline-block;
					}
				}
			}
		}
	}
	.no-record {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #666;
	}
}
</style>
