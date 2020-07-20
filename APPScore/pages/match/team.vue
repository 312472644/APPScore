<template>
	<view class="team-box table-defined" :style="'height:' + totalHeight + 'px'">
		<!--固定的表头-->
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
		<scroll-view class="table" scroll-x="true" @scroll="scrollHead" :style="'height:' + totalHeight + 'px'">
			<view class="table-content" @tap="goTeamDetail(item)" v-for="item in gamingDatabaseList" :key="item.id">
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
		<view class="fixed-table" :style="'height:' + totalHeight + 'px'">
			<view class="fixed-table-content" v-for="(item, index) in gamingDatabaseList" :key="item.id">
				<view class="fixed-content-item rank">
					<text v-if="index == 0" class="first">{{ index + 1 }}</text>
					<text v-else-if="index == 1" class="second">{{ index + 1 }}</text>
					<text v-else-if="index == 2" class="third">{{ index + 1 }}</text>
					<text v-else>{{ index + 1 }}</text>
				</view>
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
			pulldown: '',
			gamingDatabaseList: []
		};
	},
	watch: {
		tournamentID: {
			handler(newValue, oldValue) {
				if (newValue) {
					this.getGamingDatabase();
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
		this.bus.$on('team', value => {
			this.pulldown = value;
			this.getGamingDatabase();
		});
	},
	beforeDestroy() {
		this.bus.$off('team');
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
					tournament_id: this.tournamentID,
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
					this.totalHeight = (this.gamingDatabaseList.length + 1) * 51;
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
		goTeamDetail(row) {
			console.log(row);
			uni.navigateTo({
				url: '/pages/match/teamdetail/teamdetail?teamID=' + row.team_id + ''
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
