<template>
	<view class="guide">
		<swiper class="swiper">
			<swiper-item class="swiper-item guide-01"></swiper-item>
			<swiper-item class="swiper-item guide-02"></swiper-item>
			<swiper-item class="swiper-item guide-03"></swiper-item>
			<swiper-item class="swiper-item guide-04"></swiper-item>
			<swiper-item class="swiper-item guide-05"></swiper-item>
			<swiper-item class="swiper-item guide-06" @tap="toIndex"></swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		toIndex() {
			uni.switchTab({
				url: '/pages/index/index',
				success() {
					uni.setStorageSync('isGuide', true);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.guide {
	.swiper {
		height: 100vh;
	}
	.swiper-item {
		width: 100%;
		height: 100vh;
		&[class*='guide'] {
			background-size: 100% 100%;
		}
	}

	.guide-01 {
		background: url(../../static/images/guide_01.jpg) no-repeat;
	}
	.guide-02 {
		background: url(../../static/images/guide_02.jpg) no-repeat;
	}
	.guide-03 {
		background: url(../../static/images/guide_03.jpg) no-repeat;
	}
	.guide-04 {
		background: url(../../static/images/guide_04.jpg) no-repeat;
	}
	.guide-05 {
		background: url(../../static/images/guide_05.jpg) no-repeat;
	}
	.guide-06 {
		background: url(../../static/images/guide.jpg) no-repeat;
	}
}
</style>
