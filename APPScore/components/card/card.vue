<template>
	<view class="card">
		<view class="title"><text>{{title}}</text></view>
		<view><slot></slot></view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss">
.card {
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
}
</style>
