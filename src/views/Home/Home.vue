<template lang="pug">
.box_center.list_normal
	el-row.list_source
		el-col(:span="24")
			h1 Lista de jugadores
	el-row
		el-col.col_search(:span="24")
			el-form(:model="search" ref="search" label-position='left')
				el-row
					el-col(:span="10")
						el-input(placeholder="Buscar por nombre o por posición" prefix-icon="el-icon-search" v-model="search.search" @input="searchFunction")
		el-col(:span="24")
			el-table(:data="search.search===''?tableData:TableSearch" border style="width: 100%" v-loading="loading")
				el-table-column(prop="fullName" label="Nombre Completo")
				el-table-column(prop="positionPlayer" label="Posición")
				el-table-column(label="Goles")
					template(slot-scope="scope")
						el-button-group
							el-button(size="mini" type="primary" icon="el-icon-plus" @click="increase(scope.$index, scope.row)" plain)
							el-input(size="mini" :value="scope.row.goals" placeholder="Nombre Completo")
							el-button(size="mini" type="danger" icon="el-icon-minus" @click="decrease(scope.$index, scope.row)" plain)
				el-table-column(prop="registrationDate" label="Fecha de registro")
				el-table-column(label="Acciones")
					template(slot-scope="scope")
						el-button(size="mini" @click="handleEdit(scope.$index,scope.row.itemId)") Editar
						el-button(size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)") Eliminar
</template>

<script>
// @ is an alias to /src
import { players } from '../../firebase/firebase'
export default {
	name: 'Home',
	created () {
		this.getListPlayers();
	},
	data () {
		return {
			loading: false,
			tableData: null,
			TableSearch:null,
			search:{
				search:''
			},
		}
	},
	methods: {
		getListPlayers(){
			let self = this;
			self.loading = true;
			players.on('value', snapshot => self.getPlayersData(snapshot.val()));
		},
		getPlayersData(playerData){
			let self = this;
			let arrayNew = [];
			for (var i in playerData) {
				// eslint-disable-next-line no-prototype-builtins
				if (playerData.hasOwnProperty(i)) {
					arrayNew.push({
						fullName:playerData[i].fullName,
						positionPlayer:playerData[i].positionPlayer,
						goals:playerData[i].goals,
						state:playerData[i].state,
						registrationDate:playerData[i].registrationDate,
						updateRegister:playerData[i].updateRegister? playerData[i].updateRegister:'no data',
						itemId:i
					})
				}
			}
			self.loading = false;
			self.tableData = arrayNew;
		},
		matchesResults(e){
			return this.tableData.filter(playerDataSearch=>{
				const regexText = new RegExp(e, 'gi')
				return playerDataSearch.fullName.match(regexText) || playerDataSearch.positionPlayer.match(regexText)
			})
		},
		searchFunction(e){
			const validateResult = this.matchesResults(e);
			this.TableSearch = validateResult;
		},
		handleDelete(idx, elem){
			this.$confirm('estas seguro de eliminar?')
				.then(() => {
					players.child(elem.itemId).remove();
				})
				.catch(_ => {
					console.log('error',_)
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
<style lang="stylus">
.col_search
	margin-bottom 15px
.list_source
	margin-top 0
	margin-bottom 40px
	padding-top 30px
.el-date-editor.el-input
.el-date-editor.el-input__inner
	width 100%
.el-form-item.search_items
	margin-bottom 0
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
	&--default
		float none !important
</style>
