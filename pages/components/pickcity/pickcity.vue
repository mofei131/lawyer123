<template>
	<picker mode="multiSelector" @change="cityChooseChange" @columnchange="bindMultiPickerColumnChange"
		:value="multiIndex" :range="multiArray">
		<view class="flex-row mx-center sx-center">
			<text style="font-size: 26rpx;">{{currentCityName}}</text>
			<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
		</view>
	</picker>
</template>

<script>
	export default {
		components: {
			
		},
		props: ['getcity'],
		mounted() {
	
			let temp = this.$store.state.provinces;
			
			console.log(temp);
			console.log('-------');
			let provinces = temp.map(item => item.province);
			let p = temp[0];
			if (p) {
				let cities = this.getCity(p.provinceid);
				this.currentProvinceid = p.provinceid;
				console.log(cities[0]);
				this.currentCityId = cities[0] && cities[0].cityid;
				this.currentCityName = cities[0] && cities[0].city;
				if (/^市辖区$/.test(this.currentCityName) || /^县$/.test(this.currentCityName) || /^市$/.test(this
						.currentCityName)) {
					this.currentCityName = p.province;
				}
				this.multiArray = [provinces, cities.map(item => item.city)]
	
			}
	
		},
		data() {
			return {
				currentProvinceid: null,
				currentCityId: null,
				currentCityName: '北京',
				multiArray: [
					[, ],
					[, ]
				],
				multiIndex: [0, 0],
	
	
			}
		},

		methods: {
			getCity(provinceId) {
				return this.$store.state.cities.filter(item => item.provinceid == provinceId);
	
			},
			cityChooseChange(e) {
				console.log(e);
				let v = e.detail.value;
				let pid = v[0] + 1;
	
				let p = this.$store.state.provinces.find(item => item.id == pid);
				if (p) {
					this.currentProvinceid = p.provinceid;
					let c = this.getCity(p.provinceid);
					console.log(c);
					if (c && c.length > 0) {
						console.log(c);
						this.currentCityId = c[v[1]].cityid;
						this.currentCityName = c[v[1]].city;
						if (/^市辖区$/.test(this.currentCityName) || /^县$/.test(this.currentCityName) || /^市$/.test(this
								.currentCityName)) {
							this.currentCityName = p.province;
						}
					}
					this.$emit("getcity", {
						cityid:this.currentCityId,
						
					})
				}
	
			},
			
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				// this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
	
						let id = e.detail.value + 1;
						let p = this.$store.state.provinces.find(item => item && item.id == id);
						if (p) {
							// this.currentProvinceid = p.provinceid;
							let c = this.getCity(p.provinceid);
							if (c && c.length > 0) {
								// this.currentCityId =c[0].cityid;
								// this.currentCityName = c[0].city;
								this.multiArray[1] = c.map(item => item.city);
							}
	
						}
	
						break
					case 1: //拖动第2列

						break
				}
				this.$forceUpdate()
			},
	
	
	
		}
	}
</script>

<style>
</style>
