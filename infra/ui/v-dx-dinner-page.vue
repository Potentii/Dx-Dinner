<template>
   <div class="v-dx-dinner-page">

      <!-- * Header area * -->
      <v-dx-dinner-header class="v-dx-dinner-page-header">
         <slot name="header"></slot>
      </v-dx-dinner-header>


      <!-- * Content area * -->
      <main class="v-dx-dinner-page-content" :class="content_classes">
         <slot></slot>
      </main>


      <!-- * Footer area * -->
      <footer class="v-dx-dinner-page-footer">
         <slot name="footer"></slot>
      </footer>

   </div>
</template>



<script>
import VDxDinnerHeader from './v-dx-dinner-header';
export default {
   name: 'v-dx-dinner-page',

	components: { VDxDinnerHeader },

	props: {
   	'content_class': {
   		type: String,
         required: false
      }
   },


   computed: {
   	content_classes(){
   		const classes = {};
   		if(this.content_class)
   			classes[this.content_class] = true;
         return classes;
      }
   }
}
</script>



<style>
.v-dx-dinner-page{
   display: flex;
   flex-direction: column;

   width: 100%;
   height: 100%;

   background-color: var(--blank-bg--base);
   background-image: url('../../resources/images/noise.png');
   background-blend-mode: hard-light;
   background-repeat: repeat;

   color: var(--blank-fg--base);
}

.v-dx-dinner-page > .v-dx-dinner-page-header{
   flex-shrink: 0;
}

.v-dx-dinner-page > .v-dx-dinner-page-content{
   flex-shrink: 1;
   overflow: auto;
}

.v-dx-dinner-page > .v-dx-dinner-page-footer{
   flex-shrink: 0;
}
</style>
