<template>
	<view class="recommand">
		<!--比赛信息-->
		<scroll-view class="match no-wrap" scroll-x="true">
			<view class="match-info-box">
				<view class="count-box">
					<text class="count">{{ matchList.length }}</text>
					<text class="tips">场</text>
				</view>
				<view class="match-info">
					<text>热门比赛</text>
					<text>{{ new Date().Format('MM-dd') }}</text>
				</view>
			</view>
			<view class="match-list">
				<view class="match-item" v-for="item in matchList" :key="item.matchID">
					<view class="match-item-box">
						<view class="match-desc">
							<text>{{ item.tournament_name }}</text>
						</view>
						<view class="match-team">
							<view class="team"><image :src="item.team_a_image"></image></view>
							<view class="team team-point">{{ getMatchPoint(item) }}</view>
							<view class="team"><image :src="item.team_b_image"></image></view>
						</view>
						<view class="match-team-name">
							<view class="team">{{ item.team_a_short_name }}</view>
							<view class="team status">{{ getStatus(item.status) }}</view>
							<view class="team">{{ item.team_b_short_name }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="view-more" v-if="matchList.length">查看更多</view>
		</scroll-view>
		<!--帖子信息-->
		<view class="article-list">
			<navigator
				:url="'/pages/articledetail/articledetail?article_id=' + item.object_id"
				open-type="navigate"
				class="article-item"
				v-for="item in articleList"
				:key="item.article_id"
			>
				<view class="article-info">
					<view class="title">
						<text v-if="item.is_top == 1" class="hot">置顶</text>
						<text>{{ item.title }}</text>
					</view>
					<view class="article-author">
						<text>{{ item.nickname }}</text>
						<text>
							<text style="padding-right: 5px;">{{ item.comment_count }}评</text>
							<text>{{ item.god_count }}神</text>
						</text>
					</view>
				</view>
				<view class="article-image"><image :src="item.picture_list[0]"></image></view>
			</navigator>
		</view>
		<view class="load-more" v-show="loading"><text>加载中...</text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			matchList: [],
			articleList: [],
			currentPage: 1,
			loading: false,
			url: '/pages/articledetail/articledetail/'
		};
	},
	created() {
		this.getMatchList();
		this.getArticleList();
		this.bus.$on('recommand', type => {
			if (type == 'pull') {
				this.getArticleList(type);
			} else {
				this.currentPage++;
			}
			this.getArticleList();
		});
	},
	methods: {
		//获取当天比赛信息
		getMatchList() {
			let param = this.utils.getArticleSign({
				tournament_id: 172
			});
			uni.request({
				url: `https://api-v2.scoregg.com/services/match/web_schedule_match_index_list.php`,
				method: 'GET',
				data: param,
				success: res => {
					if (res && res.data.data) {
						let currentDate = new Date().Format('yyyy-MM-dd');
						let result = res.data.data.list.filter(item => {
							return item.start_date == currentDate;
						});
						if (result.length) {
							this.matchList.push(...result);
						}
					}
				}
			});
		},
		//获取比赛比分详情
		getMatchPoint(row) {
			let result = '';
			//比赛未开始
			if (row.status == '0') {
				result = row.match_time;
			} else {
				result = `${row.team_a_win}:${row.team_b_win}`;
			}
			return result;
		},
		//获取文章信息
		getArticleList(type) {
			this.loading = true;
			uni.request({
				url: 'https://api-v2.scoregg.com/services/cms/article_list.php',
				method: 'GET',
				data: this.utils.getArticleSign({
					page: this.currentPage,
					channel_id: 76
				}),
				complete: () => {
					setTimeout(() => {
						//下拉刷新
						if (type == 'pull') {
							uni.stopPullDownRefresh();
						}
						this.loading = false;
					}, 1000);
				},
				success: res => {
					if (res.data.data) {
						this.articleList = res.data.data.article_list;
					}
				}
			});
		},
		//获取比赛状态
		getStatus(status) {
			let result = '';
			switch (status) {
				case '0':
					result = '未开始';
					break;
				case '1':
					result = '进行中';
					break;
				case '2':
					result = '已结束';
					break;
				default:
					break;
			}
			return result;
		}
	}
};
</script>

<style lang="scss">
$match-height: 125px;
.recommand {
	.match {
		padding-left: 15px;
		box-sizing: border-box;
		.match-info-box {
			margin: 5px 0;
			display: inline-block;
			vertical-align: top;
			height: $match-height;
			border-radius: 5px;
			width: 100px;
			box-sizing: border-box;
			background-color: #f7f8fa;
			.count-box {
				margin: 0px 10px 0 10px;
				display: flex;
				justify-content: center;
				position: relative;
				border-bottom: 1px solid #dfe0e2;
				line-height: 55px;
				.count {
					color: #656973;
					font-size: 1.5rem;
					font-weight: bolder;
				}
				.tips {
					position: absolute;
					font-size: 15px;
					margin-left: 22px;
					margin-top: -8px;
					color: #696c73;
				}
			}
			.match-info {
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				text {
					text-align: center;
					width: 100%;
					font-size: 15px;
					color: #696c73;
					line-height: 35px;
					&:nth-of-type(n + 2) {
						background-color: #f0f0f0;
						border-bottom-left-radius: 5px;
						border-bottom-right-radius: 5px;
					}
				}
			}
		}
		.match-list {
			display: inline-block;
			vertical-align: bottom;
			.match-item {
				padding: 15px;
				vertical-align: top;
				box-sizing: border-box;
				display: inline-block;
				height: $match-height;
				margin: 5px 0 5px 20px;
				width: 200px;
				border-radius: 5px;
				box-shadow: 1px 1px 5px #ccc;
				&:last-of-type {
					margin-right: 20px;
				}
				.match-item-box {
					display: flex;
					justify-content: center;
					flex-direction: column;
				}
				.match-desc {
					border-radius: 30px;
					text-align: center;
					color: #999;
					padding: 5px 0;
					font-size: 13px;
					background-color: #f7f8fa;
				}
				.team {
					width: 33.33333%;
					text-align: center;
					line-height: 30px;
					image {
						width: 30px;
						height: 30px;
						vertical-align: middle;
					}
					&.team-point {
						font-size: 18px;
						color: #333;
						font-weight: bolder;
					}
				}
				.match-team {
					display: flex;
					align-items: center;
				}
				.match-team-name {
					display: flex;
					align-items: center;
					font-size: 16px;
					font-weight: bolder;
					line-height: 30px;
					.status {
						font-weight: normal;
						color: #a8abb3;
						font-size: 14px;
					}
				}
			}
		}
		.view-more {
			height: $match-height;
			line-height: $match-height;
			border-radius: 5px;
			width: 100px;
			box-sizing: border-box;
			background-color: #f7f8fa;
			display: inline-block;
			vertical-align: top;
			margin: 5px 20px 0 0;
			text-align: center;
			font-size: 13px;
			color: #999;
		}
	}
	.article-list {
		$height: 100px;
		.article-item {
			padding: 15px;
			height: $height;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #f4f4f6;
			.article-info {
				height: $height;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-right: 20px;
				.title {
					font-size: 18px;
					font-weight: bolder;
					word-break: break-all;
					color: #333;
					line-height: 25px;
					overflow: hidden;
					text-overflow: ellipsis;
					line-clamp: 2;
					.hot {
						line-height: 20px;
						font-size: 13px;
						color: #fff;
						background-image: linear-gradient(-135deg, #0f97ff, #0d7eff);
						border-radius: 3px;
						padding: 0 6px;
						margin: 4px 4px 0 0;
					}
				}
				.article-author {
					font-size: 13px;
					color: #aaacb4;
					display: flex;
					justify-content: space-between;
				}
			}
			.article-image {
				image {
					width: 140px;
					height: $height;
					border-radius: 5px;
				}
			}
		}
	}
	.load-more {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		color: #666;
		font-size: 14px;
	}
}
</style>
