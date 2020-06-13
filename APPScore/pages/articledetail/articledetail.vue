<template>
	<view class="article-detail">
		<topnavigation><image class="logo" src="../../static/images/score.png"></image></topnavigation>
		<view class="content" v-html="articleHTML"></view>
		<view class="split-line"></view>
		<view class="god-comments-box">
			<view class="header">
				<view>
					<text class="god-comments"></text>
					<text>神回复</text>
				</view>
				<text>共有{{ getGodCommentsList.length }}条神回复</text>
			</view>
			<view class="content clear-float">
				<view v-for="item in getGodCommentsList" class="content-item" :key="item.dynamic_comment_id">
					<!--用户信息-->
					<view class="god-first-left"><image :src="item.avatar"></image></view>
					<view class="god-first-right">
						<view class="god-first-user">
							<text>{{ item.nickname }}</text>
							<text class="first-user-leval">Lv.{{ item.rank }}</text>
							<text v-if="item.badge_image"><image class="badge-icon" :src="item.badge_image"></image></text>
						</view>
						<view class="god-first-desc">
							<view class="god-desc-cont">
								<text>{{ item.content }}</text>
							</view>
							<view class="comment_floor">
								<text style="margin-right: 8px;">{{ item.floor + 1 }}楼</text>
								<text>{{ item.add_time_string }}</text>
							</view>
						</view>
						<!--回复-->
						<view class="god-first-replay">
							<view class="first-replay-content" v-for="replyItem in item.reply.list" :key="replyItem.dynamic_comment_id">
								<view class="first-replay-user">
									<image :src="replyItem.avatar"></image>
									<text>{{ replyItem.nickname }}</text>
								</view>
								<view class="first-replay-html">
									<text>{{ replyItem.content }}</text>
								</view>
								<view class="first-bottom-clock">
									<text>{{ replyItem.add_time_string }}</text>
								</view>
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
	data() {
		return {
			articleId: '',
			articleHTML: '',
			getGodCommentsList: []
		};
	},
	watch: {
		articleId(newValue, oldValue) {
			this.getArticleDetail();
			this.getGodComments();
		}
	},
	onLoad(options) {
		if (options.article_id) {
			this.articleId = options.article_id;
		}
	},
	//下拉刷新
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		this.getArticleDetail();
		this.getGodComments();
	},
	methods: {
		// 获取文章详情
		getArticleDetail() {
			this.$load.showLoad({
				bottom: 0
			});
			uni.request({
				url: ` https://www.scoregg.com/p/${this.articleId}`,
				success: res => {
					this.articleHTML = res.data;
				}
			});
		},
		//获取神评论
		getGodComments() {
			uni.request({
				url: `https://www.scoregg.com/services/bar/bar_comment_hot_list.php?dynamic_id=${this.articleId}&limit=5`,
				success: res => {
					this.getGodCommentsList = res.data.data.list;
				},
				complete: () => {
					setTimeout(() => {
						this.$load.hideLoad();
					}, 1000);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.article-detail {
	.logo {
		width: 80px;
		height: 36px;
		vertical-align: bottom;
		margin: 0 auto;
	}
	.content {
		padding-top: 50px;
	}
	.split-line {
		background-color: #f5f6f7;
		width: 100%;
		height: 10px;
		border-top: 1px solid #f5f6f7;
	}
	.god-comments-box {
		.header {
			height: 40px;
			align-items: center;
			background: #e0cb9d;
			box-shadow: 0 0 0 1px #d1bc8e;
			color: #ffffff;
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			.god-comments {
				width: 4px;
				height: 12px;
				background-color: #ffffff;
				display: inline-block;
				vertical-align: middle;
				margin-right: 5px;
			}
		}
		.content {
			background-color: #fffcf5;
			padding: 15px;
			.content-item {
				padding-top: 12px;
				&:not(:last-of-type) {
					border-bottom: 1px solid #ebebed;
				}
			}
			.god-first-left {
				float: left;
				width: 36px;
				image {
					width: 36px;
					height: 36px;
					border: 1px solid rgba(0, 0, 0, 0.04);
					border-radius: 50%;
				}
			}
			.god-first-right {
				margin-left: 44px;
				.god-first-user {
					font-size: 14px;
					color: #666;
					.first-user-leval {
						margin-left: 3px;
						display: inline-block;
						padding: 0 5px;
						height: 16px;
						text-align: center;
						font-weight: normal;
						background-image: linear-gradient(135deg, #19a7ff, #058aff);
						border-radius: 3px;
						font-size: 12px;
						color: #fff;
						vertical-align: middle;
					}
					.badge-icon {
						height: 16px;
						margin-left: 3px;
						width: 44px;
						vertical-align: middle;
					}
				}
				.god-first-desc {
					.god-desc-cont {
						padding-top: 2px;
						margin-bottom: 8px;
						font-size: 14px;
						color: #2d2f33;
						line-height: 20px;
						overflow: hidden;
					}
					.comment_floor {
						line-height: 20px;
						height: 20px;
						margin-bottom: 10px;
						font-size: 12px;
						color: #a8abb3;
					}
				}
				.god-first-replay {
					margin-bottom: 15px;
					border-radius: 3px;
					.first-replay-content {
						padding: 12px 0 0 16px;
						background: #fff7e8;
						&:not(:first-child) {
							border-top: 1px solid #faedd2;
						}
						.first-replay-user {
							display: flex;
							align-items: center;
							image {
								border: 1px solid rgba(0, 0, 0, 0.04);
								height: 20px;
								width: 20px;
								border-radius: 50%;
							}
							text {
								line-height: 20px;
								margin-left: 8px;
								font-size: 14px;
								color: #3d3931;
							}
						}
						.first-replay-html {
							margin: 5px 16px 0 0;
							font-size: 13px;
							color: #737373;
							line-height: 20px;
						}
						.first-bottom-clock {
							line-height: 30px;
							font-size: 12px;
							color: #b3b3b3;
						}
					}
				}
			}
		}
	}
}
</style>
