<template>
	<view class="content">{{ getUserName }}</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {
		this.updateUserName('123');
	},
	computed: {
		...mapGetters(['getUserName'])
	},
	methods: {
		...mapActions(['updateUserName'])
	}
};
</script>

<style></style>
