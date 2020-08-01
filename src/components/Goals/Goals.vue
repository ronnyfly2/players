<template lang="pug">
el-button-group
	el-button(size="mini" type="primary" icon="el-icon-plus" @click="increase(idx, data)" plain)
	el-input(size="mini" :value="data.goals" placeholder="Nombre Completo" readonly)
	el-button(size="mini" type="danger" icon="el-icon-minus" @click="decrease(idx, data)" plain)
</template>
<script>
import { players } from '@/firebase/firebase';
export default {
	name:'Goals',
	props:{
		idx:null,
		data:null
	},
	methods:{
		increase(idx, data) {
			data.goals = parseInt(data.goals) + 1;
			players.child(data.itemId).update(data);
		},
		decrease(idx, data) {
			if(parseInt(data.goals)>0){
				data.goals = parseInt(data.goals) - 1;
				players.child(data.itemId).update(data);
			}
		}
	}
}
</script>
