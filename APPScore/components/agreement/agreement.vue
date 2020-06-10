<template>
	<view class="agreement" v-if="visible">
		<view class="content">
			<view class="head"><text>温馨提示</text></view>
			<scroll-view class="body scroll-y" scroll-y="true">
				<view>
					本应用深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。
					请在使用我们的产品（或服务）前，仔细阅读并了解本
					<text class="href">《隐私权政策》</text>
					。
				</view>
				<view>
					一、我们如何收集和使用您的个人信息 个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。
					我们仅会出于本政策所述的以下目的，收集和使用您的个人信息
				</view>
				<view>二、本隐私政策的更改</view>
				<view>如果决定更改隐私政策，我们会在本政策中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集项目信息。</view>
			</scroll-view>
			<view class="footer">
				<view class="disagree" @tap="disagree">我不同意,退出</view>
				<view class="agree" @tap="agree">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'agreement',
	data() {
		return {
			visible: true
		};
	},
	created() {
		this.visible = !uni.getStorageSync('isAgree');
	},
	methods: {
		agree() {
			this.visible = false;
			uni.setStorageSync('isAgree', true);
			this.$emit('agree', true);
		},
		disagree() {
			plus.runtime.quit();
		}
	}
};
</script>

<style lang="scss">
.agreement {
	position: fixed;
	background-color: rgba(0, 0, 0, 0.4);
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 999;
	padding: 50px;
	.content {
		height: calc(100vh - 100px);
		background-color: #fff;
		border-radius: 3px;
	}
	.head {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #0d8dfc;
		color: #ffffff;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		text {
			font-size: 16px;
			font-weight: bolder;
		}
	}
	.body {
		padding: 20px;
		font-size: 14px;
		color: #666;
		box-sizing: border-box;
		.href {
			color: #55affd;
		}
		view {
			line-height: 25px;
		}
		&.scroll-y {
			width: auto;
			height: calc(100% - 50px - 110px);
		}
	}
	.footer {
		height: 60px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 0 15px;
		font-size: 15px;
		height: 90px;
		.disagree {
			border-radius: 30px;
			padding: 8px 0;
			text-align: center;
			border: 1px solid #f0f1f2;
			color: #6f737c;
		}
		.agree {
			border-radius: 30px;
			text-align: center;
			padding: 8px 0;
			background-color: #0d8dfc;
			color: #ffffff;
			border: 1px solid transparent;
			margin-top: 15px;
		}
	}
}
</style>
