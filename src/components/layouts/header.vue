<template lang="pug">
el-header
	.box_center
		.col.text-left
			router-link(to="/")
				h1 Players
		.col.text-right
			ul
				li
					router-link(to="/jugador/0").btn Registra tu jugador
</template>
<style lang="stylus">
header
	margin 0 auto
	text-align center
	background-color #FFFFFF
	height auto !important
	box-shadow 1px 4px 4px #409eff2b
	.col
		vertical-align middle
		display inline-block
		width 50%
		padding 25px 0
	.text
		&-right
			text-align right
		&-left
			text-align left
	h1
		max-width 170px
		color #409EFF
		font-size 20px
		font-weight 800
		padding-top 10px
		display block
	a
		display block
		&:hover
			text-decoration none
	ul
		font-size 0
		margin 0
		li
			margin 0 16px
			font-size 16px
			display inline-block
			vertical-align middle
			a
				color #409EFF
			.btn
				background #ffffff
				border-radius 4px
				height 48px
				color #409EFF
				border 2px solid #409EFF
				font-weight 800
				line-height 1
				padding 14px 23px
				&:focus
					box-shadow 0 0 1px 2px rgba(64, 58, 141, .4)
				&:hover
					color #409EFF
			&:last-child
				margin-right 0
</style>
