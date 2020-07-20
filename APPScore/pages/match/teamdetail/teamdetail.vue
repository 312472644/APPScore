<template>
	<view class="team-detail">
		<topnavigation :isLogo="false">
			<view class="s-logo">
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
		<view class="match-box">
			<view class="title"><text>比赛数据</text></view>
			<view class="body">
				<view class="chart">
					<view class="item">
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			teamID: '',
			teamResult: ''
		};
	},
	onLoad(param) {
		if (param) {
			this.teamID = param.teamID;
			this.getTeamDetail();
		}
	},
	created() {
		this.getTeamDetail();
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
	.match-box {
		.title {
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			border-bottom: 1px solid #f8f8f8;
			font-size: 15px;
			color: #666;
			text {
				position: relative;
				padding-left: 15px;
				&::after {
					content: '';
					background-color: #138bf7;
					width: 5px;
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
				}
			}
		}
		.body {
			.chart {
				.item {
					
				}
			}
		}
	}
}
</style>
