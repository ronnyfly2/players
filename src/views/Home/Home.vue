<template lang="pug">
.box_center.list_normal
	el-row.list_source
		el-col(:span="24")
			h1 Lista de jugadores
	el-row
		el-col.col_search(:span="24")
			el-form(:model="search" ref="search" label-position='left')
				el-row(:gutter="15")
					el-col(:span="10")
						el-input(placeholder="Buscar por nombre o por posición" prefix-icon="el-icon-search" v-model="search.search" @input="searchFunction")
					el-col(:span="10")
						p Tiene {{ quantity && quantity === 1 ? quantity + ' jugador': quantity + ' jugadores'}}
		el-col(:span="24")
			Team(:playersData="search.search===''?tableData:TableSearch" :loading="loading")
</template>

<script>
// @ is an alias to /src
import Team from '@/components/Team/Team.vue';
import { players } from '@/firebase/firebase';
export default {
	name: 'Home',
	components:{
		Team
	},
	created () {
		this.getListPlayers();
	},
	data () {
		return {
			loading: false,
			tableData: [],
			TableSearch: [],
			search:{
				search:''
			},
		}
	},
	computed: {
		quantity: function () {
			return this.search.search===''?this.tableData.length:this.TableSearch.length;
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
						updateRegister:playerData[i].updateRegister? playerData[i].updateRegister:'no update',
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
	}
}
</script>
<style lang="stylus">
.col_search
	margin-bottom 15px
	text-align left
	p
		padding-top 9px
.list_source
	margin-top 0
	margin-bottom 40px
	padding-top 30px
.el-date-editor.el-input
.el-date-editor.el-input__inner
	width 100%
.el-form-item.search_items
	margin-bottom 0
</style>
