import vue from 'vue';
import loading from '../../components/loading/loading.vue';

//加载框
vue.prototype.$load = {
	_loadObject: '',
	//加载loading
	showLoad(propsData) {
		debugger
		let extendLoad = vue.extend(loading);
		let load = new extendLoad({
			propsData: propsData
		}).$mount();
		this._loadObject = load;

		//获取页面根节点元素
		let rootElement = uni.createSelectorQuery().select('uni-app')._selectorQuery._page.$el;
		if (!rootElement) {
			return false;
		}
		//新增节点
		uni.createSelectorQuery()
			.select('#load')
			.boundingClientRect(data => {
				if (data) {
					rootElement.removeChild(load.$el)
				} else {
					rootElement.appendChild(load.$el);
				}
			})
			.exec();
	},
	//隐藏loading
	hideLoad() {
		let rootElement = uni.createSelectorQuery().select('uni-app')._selectorQuery._page.$el;
		if (this._loadObject && this._loadObject.$el) {
			rootElement.removeChild(this._loadObject.$el);
		}
	}
};
