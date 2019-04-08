<template>
   <ul class="v-promo-results-report" :class="{ '--right': right }">
      <li class="-promo" :key="promo_result.promo.id" v-for="promo_result in promo_results" :title="promo_result.promo.description">
         <span class="-name">Promoção "{{ promo_result.promo.name }}":</span>
         <span class="-desc" v-if="promo_result.data.pay_only !== undefined">{{ qty !== undefined ? 'Leve ' + qty + ', p' : 'P' }}ague apenas {{ promo_result.data.pay_only }}.</span>
         <span class="-desc" v-if="promo_result.data.discount !== undefined">Desconto de {{ promo_result.data.discount * 100 }}%.</span>
      </li>
   </ul>
</template>



<script>
export default {
   name: 'v-promo-results-report',


   props: {
		/**
       * @type {PromoResult[]}
		 */
		'promo_results': {
   		type: Array,
         required: false
      },

		'qty': {
			type: Number,
			required: false
		},

		'right': {
			type: Boolean,
			required: false
		}
   }
}
</script>



<style>
.v-promo-results-report{
   display: flex;
   flex-direction: column;
   color: #00E676;
   text-shadow: 1px 1px 0 rgba(255,255,255,0.3);
}
.v-promo-results-report > .-promo{
   display: flex;
   flex-direction: column;
   padding-left: 10px;
}
.v-promo-results-report > .-promo::before{
   opacity: 0.2;
   content: '';
   position: absolute;
   top: 0;
   left: 2px;
   width: 4px;
   height: 100%;
   background-color: #00E676;
   border-radius: 6px;
}

.v-promo-results-report.--right > .-promo{
   align-items: flex-end;
   padding-left: 0;
   padding-right: 10px;
}
.v-promo-results-report.--right > .-promo::before{
   left: unset;
   right: 2px;
}

.v-promo-results-report > .-promo > .-name{
   font-weight: 500;
}
</style>
