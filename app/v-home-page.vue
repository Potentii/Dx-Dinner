<template>
	<v-dx-dinner-page class="v-home-page">

	</v-dx-dinner-page>
</template>



<script>
import VDxDinnerPage from '../infra/ui/v-dx-dinner-page';



export default {
   name: 'v-home-page',


	components: { VDxDinnerPage },


	mounted(){
		this.$router.replace({ name: 'new-order-page' });
	}
}
</script>



<style>
.v-home-page{
}
</style>
