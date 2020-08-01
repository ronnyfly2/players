<template lang="pug">
.box_center.list_normal
	el-row.list_source
		el-col(:span="24")
			h1 Formulario
		el-col(:span="24")
			el-page-header(@back="goBack" :content="ruleForm.fullName?ruleForm.fullName:''")
	el-row
		el-col(:span="24")
			el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-position='left' v-loading="loading")
				el-row(:gutter="15")
					el-col(:span="12")
						el-form-item(prop="fullName" label="Nombre Completo")
							el-input(v-model="ruleForm.fullName" placeholder="Nombre Completo")
					el-col(:span="12")
						el-form-item(prop="positionPlayer" label="Posición")
							el-input(v-model="ruleForm.positionPlayer" placeholder="Posición")
				el-row(:gutter="15")
					el-col(:span="12")
						el-form-item(prop="goals" label="Goles")
							el-input(type="number" v-model="ruleForm.goals" placeholder="Goles")
					el-col(:span="12")
						el-form-item(label="Activo?")
							el-switch(v-model="ruleForm.state")
				el-col(:span="24")
					el-form-item
						el-button(type="primary" @click="validateForm") Guardar
</template>
<script>
// @ is an alias to /src
import { EventBus } from '../../global/index';
import { players } from '../../firebase/firebase'
export default {
	name: 'PlayerForm',
	data () {
		let idPlayer= (this.$route.params && this.$route.params.id)? this.$route.params.id : 0;
		return {
			idPlayer:idPlayer,
			loading: false,
			ruleForm: {
				fullName: '',
				positionPlayer:'',
				goals:0,
				state:false,
			},
			rules: {
				fullName: [
					{ required: true, message: 'Este campo es requerido', trigger: 'change' }
				],
				positionPlayer: [
					{ required: true, message: 'Este campo es requerido', trigger: 'change' }
				]
			},
		}
	},
	created () {
		if(this.idPlayer != 0){
			this.loading= true;
			this.getPlayer();
		}
		document.addEventListener("keydown", (e) => {
			if(e.keyCode == 13){
				e.preventDefault();
			}
		});
	},
	methods:{
		getPlayer(){
			let self = this;
			players.child(self.idPlayer).once('value')
			.then( snapshot => {
				if(snapshot.val() && snapshot.val().fullName){
					self.ruleForm = snapshot.val();
				}else{
					EventBus.$emit('notify', 'Error', 'Hubo un error', 'error');
					self.$router.push('/');
				}
				self.loading= false;
			});
		},
		saveUser(){
			let self = this;
			let now = new Date();
			let year = "" + now.getFullYear();
			let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
			let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
			let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
			let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }

			if(self.idPlayer != 0){
				self.ruleForm.updateRegister = year + "-" + month + "-" + day + " " + hour + ":" + minute;
				players.child(self.idPlayer).update(self.ruleForm).then(()=>{
					self.loading = false;
					self.$router.push('/');
					EventBus.$emit('notify', 'Success', 'Se actualizó correctamente', 'success');
				});
			}else{
				self.ruleForm.registrationDate = year + "-" + month + "-" + day + " " + hour + ":" + minute;
				players.push(self.ruleForm).then(()=>{
					self.loading = false;
					self.$refs.ruleForm.resetFields();
					self.$router.push('/');
					EventBus.$emit('notify', 'Success', 'Se creó correctamente', 'success');
				})
			}
		},
		validateForm(){
			let self = this;
			self.loading = true;
			self.$refs.ruleForm.validate((valid) => {
				if (valid) {
					self.saveUser()
				} else {
					setTimeout(
						()=>{
							const errorFirst = self.$refs.ruleForm.$el.querySelector('div.is-error')
							if (errorFirst) {
								const errorFirstInput = errorFirst.querySelector('input, select, textarea')
								errorFirst.scrollIntoView({ behavior: 'instant' })
								errorFirstInput.focus()
							}
						}, 400
					)
					self.$message.error('Hubo un error');
					self.loading = false;
					return false;
				}
			});
		},
		goBack(){
			this.$router.push('/');
		}
	}
}

</script>