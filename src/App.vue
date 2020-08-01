 <template lang="pug">
#wrapper
	router-view
	router-view(name="containerBlock")
	router-view(name="footer")
</template>

<style lang="stylus">
#wrapper
	font-family Avenir, Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
</style>
