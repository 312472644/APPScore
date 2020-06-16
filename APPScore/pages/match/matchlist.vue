<template>
	<view class="match-list-box">
		<view class="match-group-item-box" v-for="item in groupList" :key="item.tournamentID">
			<view class="match-group-item">
				<image :src="item.image_thumb"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			groupList: []
		};
	},
	created() {
		this.getGroupList();
	},
	methods: {
		getGroupList() {
			uni.request({
				url: 'https://www.scoregg.com/services/api_url.php',
				method: 'POST',
				data: {
					api_path: '/services/match/web_tournament_group_list.php',
					method: 'GET',
					platform: 'web',
					api_version: '9.9.9',
					language_id: 1,
					gameID: 1,
					type: 'all',
					page: 1,
					limit: 100
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				success: res => {
					this.groupList = res.data.data.list;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.match-list-box {
	padding: 5px;
	.match-group-item-box {
		width: 33.333333%;
		height: 120px;
		display: inline-block;
		box-sizing: border-box;
		max-height: 120px;
		padding: 0 5px 5px 0;
		font-size: 0;
		vertical-align: bottom;
		&:nth-of-type(3n) {
			padding-right: 0;
		}
		.match-group-item {
			height: 100%;
			background-color: #f1f1f1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image {
				width: 50px;
				height: 50px;
				margin-bottom: 10px;
			}
			text {
				font-size: 13px;
				color: #666;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				max-width: calc(100% - 20px);
			}
		}
	}
}
</style>
