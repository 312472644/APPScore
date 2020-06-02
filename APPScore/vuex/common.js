const common = {
	state: {
		userName: '剑来'
	},
	getters: {
		getUserName(state) {
			return state.userName;
		}
	},
	actions: {
		updateUserName(context, playload) {
			//context.state.userName = playload;
		}
	}
};
export default common;
