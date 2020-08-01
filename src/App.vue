 <template lang="pug">
#wrapper
	router-view
	router-view(name="containerBlock")
	router-view(name="footer")
</template>
<script>
import { EventBus } from './global/index';
export default {
	created () {
		let self = this;
		EventBus.$on('notify', (title, message, type) => {
			self.alert(title, message, type)
		});
	},
	methods:{
		alert(title, message, type) {
			this.$notify({
				title,
				message,
				type,
				duration: 5000
			});
		},
	}
}

</script>
<style lang="stylus">
#wrapper
	font-family Avenir, Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
</style>
