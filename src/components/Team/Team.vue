<template lang="pug">
	el-table(:data="playersData" border style="width: 100%" v-loading="loading")
		el-table-column(prop="fullName" label="Nombre Completo")
		el-table-column(prop="positionPlayer" label="Posición")
		el-table-column(label="Goles")
			template(slot-scope="scope")
				el-button-group
					el-button(size="mini" type="primary" icon="el-icon-plus" @click="increase(scope.$index, scope.row)" plain)
					el-input(size="mini" :value="scope.row.goals" placeholder="Nombre Completo" readonly)
					el-button(size="mini" type="danger" icon="el-icon-minus" @click="decrease(scope.$index, scope.row)" plain)
		el-table-column(prop="registrationDate" label="Fecha de registro")
		el-table-column(label="Acciones")
			template(slot-scope="scope")
				el-button(size="mini" @click="handleEdit(scope.$index,scope.row.itemId)") Editar
				el-button(size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)") Eliminar
</template>
<script>
import { EventBus } from '../../global/index';
import { players } from '../../firebase/firebase';
export default {
	name: 'Team',
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
		},
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
