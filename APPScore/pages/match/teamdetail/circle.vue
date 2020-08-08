<template>
	<view class="circle">
		<view class="qiun-charts"><canvas canvas-id="canvasArcbar" id="canvasArcbar" class="charts"></canvas></view>
	</view>
</template>

<script>
import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.js';
let _self;
let canvaArcbar;

export default {
	props: {
		seriesData: {
			type: Object
		}
	},
	data() {
		return {
			cWidth: 130, //圆弧进度图
			cHeight: 130, //圆弧进度图
			arcbarWidth: 10, //圆弧进度图，进度条宽度,此设置可使各端宽度一致
			pixelRatio: 1
		};
	},
	watch: {
		seriesData: {
			handler() {
				this.showArcbar('canvasArcbar', _self.seriesData);
			}
		}
	},
	created() {
		_self = this;
	},
	methods: {
		showArcbar(canvasId, chartData) {
			if (!(chartData.series && chartData.series.length)) {
				return false;
			}
			canvaArcbar = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'arcbar',
				fontSize: 11,
				legend: { show: false },
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				title: {
					name: Math.round(chartData.series[0].data * 100) + '%', //这里我自动计算了，您可以直接给任意字符串
					color: '#0c9dfc',
					fontSize: 25 * _self.pixelRatio
				},
				subtitle: {
					name: chartData.series[0].name, //这里您可以直接给任意字符串
					color: '#373a41',
					fontSize: 15 * _self.pixelRatio
				},
				extra: {
					arcbar: {
						type: 'circle', //整圆类型进度条图
						width: 8, //圆弧的宽度
						startAngle: 1.5 //整圆类型只需配置起始角度即可
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.circle {
	.qiun-charts {
		position: relative;
		display: flex;
		justify-content: center;
	}
	.charts {
		width: 130px;
		height: 130px;
		background-color: #ffffff;
	}
}
</style>
