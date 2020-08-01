<template lang="pug">
	el-table(:data="playersData" border style="width: 100%" v-loading="loading")
		el-table-column(prop="fullName" label="Nombre Completo")
		el-table-column(prop="positionPlayer" label="Posición")
		el-table-column(label="Goles")
			template(slot-scope="scope")
				Goals(:idx="scope.$index" :data="scope.row")
		el-table-column(prop="registrationDate" label="Fecha de registro")
		el-table-column(label="Acciones")
			template(slot-scope="scope")
				el-button(size="mini" @click="handleEdit(scope.$index,scope.row.itemId)") Editar
				el-button(size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)") Eliminar
</template>
<script>
import { EventBus } from '@/global/index';
import Goals from '@/components/Goals/Goals.vue';
import { players } from '@/firebase/firebase';
export default {
	name: 'Team',
	components:{
		Goals
	},
	props:{
		loading:{
			type: Boolean,
			default: false
		},
		playersData:{
			type: Array,
			default: null
		}
	},
	methods:{
		handleEdit(idx, elem){
			this.$router.push({name: 'PlayerForm', params: {'id': elem}});
		},
		handleDelete(idx, elem){
			this.$confirm('estas seguro de eliminar?')
				.then(() => {
					players.child(elem.itemId).remove();
					EventBus.$emit('notify', 'Success', 'Se eliminó correctamente', 'success');
				})
				.catch(_ => {
					console.log('error',_);
					EventBus.$emit('notify', 'Error', 'Hubo un error', 'error');
				});
		}
	}
}
</script>
<style lang="stylus">
.el-button
	float none !important
	&-group
		text-align center
		.el-input
			width 30%
			float none
			&__inner
				border-radius 0
				text-align center
</style>
