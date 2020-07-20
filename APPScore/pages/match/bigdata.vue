<template>
	<view class="big-data">
		<pulldown ref="pulldown" @pull="pulldown">
			<view class="query-box">
				<picker mode="selector" class="uni-select" range-key="name" @change="bindPickerChange" :value="index" :range="tournamentList">
					<view class="select-content">
						<text>{{ tournamentList.length && tournamentList[index].name }}</text>
						<view class="down"></view>
					</view>
				</picker>
				<view class="menu">
					<view :class="{ 'menu-item': true, active: tabActiveName == 'team' }" @tap="tapHandler('team')"><text>战队榜</text></view>
					<view :class="{ 'menu-item': true, active: tabActiveName == 'player' }" @tap="tapHandler('player')"><text>选手榜</text></view>
					<view :class="{ 'menu-item': true, active: tabActiveName == 'hero' }" @tap="tapHandler('hero')"><text>英雄榜</text></view>
				</view>
			</view>
			<view class="menu-content">
				<team v-if="tabActiveName == 'team'" :tournamentID="tournamentID" :tabName="tabActiveName"></team>
				<player v-if="tabActiveName == 'player'" :tournamentID="tournamentID" :tabName="tabActiveName"></player>
				<hero v-if="tabActiveName == 'hero'" :tournamentID="tournamentID" :tabName="tabActiveName"></hero>
			</view>
		</pulldown>
	</view>
</template>

<script>
import team from './team.vue';
import player from './player.vue';
import hero from './hero.vue';
export default {
	components: {
		team,
		player,
		hero
	},
	data() {
		return {
			tournamentList: [],
			index: 0,
			tabActiveName: 'team',
			tournamentID: ''
		};
	},
	created() {
		this.getTournamentList();
	},
	methods: {
		bindPickerChange(e) {
			this.index = e.target.value;
			this.tournamentID = this.tournamentList[this.index].tournamentID;
		},
		getTournamentList() {
			uni.request({
				url: 'https://www.scoregg.com/services/api_url.php',
				method: 'POST',
				data: {
					api_path: '/services/match/tournament_list.php',
					method: 'post',
					platform: 'web',
					api_version: '9.9.9',
					language_id: 1,
					gameID: 1
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				success: res => {
					this.tournamentList = res.data.data.list;
					this.tournamentID = res.data.data.current_tournament.tournamentID;
				}
			});
		},
		tapHandler(name) {
			this.tabActiveName = name;
		},
		pulldown() {
			console.log(this.tabActiveName);
			this.bus.$emit(this.tabActiveName, this.$refs.pulldown);
		}
	}
};
</script>

<style lang="scss">
.big-data {
	.query-box {
		padding: 10px;
		.uni-select {
			width: 130px;
			border-radius: 30px;
			background-color: #f1f1f1;
			padding: 8px 15px;
			font-size: 14px;
			color: #666;
			position: relative;
			display: inline-block;
			.select-content {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.down {
					background: url(../../static/images/more_unfold.svg) no-repeat;
					width: 20px;
					height: 20px;
					background-size: 100% 100%;
					background-position-y: 3px;
				}
			}
		}
		.menu {
			display: inline-block;
			.menu-item {
				font-size: 15px;
				color: #999;
				display: inline-block;
				padding-left: 10px;
				position: relative;
				&.active {
					color: #333;
					&::after {
						content: '';
						position: absolute;
						left: 0;
						height: 3px;
						width: 20px;
						background-color: #0d8cfb;
						bottom: -7px;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
		}
	}
}
</style>
