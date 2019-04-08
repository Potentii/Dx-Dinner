<template>
   <div class="v-order-receipt">

      <span class="-title"><i class="-icon material-icons">receipt</i> Seu pedido:</span>

      <template v-if="receipt && receipt.items.length">
         <table class="-items" cellspacing="0" cellpadding="0">

            <!-- * Header * -->
            <thead class="-item -header">
               <tr class="-item-tr">
                  <th class="-name">Item</th>
                  <th class="-subtotal">Subtotal</th>
                  <th class="-total">Total</th>
               </tr>
            </thead>


            <!-- * Items * -->
            <tbody class="-item" :key="item.id" v-for="item in receipt.items">
               <tr class="-item-tr" :class="{ '--with-promo': hasPromos(item) }">
                  <td class="-name">{{ item.qty > 1 ? item.qty + 'x ' : '' }}{{ item.item.name }}</td>
                  <td class="-subtotal" :class="{ '--discount': item.price.subtotal > item.price.total }">{{ _formatCurrency(item.price.subtotal) }}</td>
                  <td class="-total">{{ _formatCurrency(item.price.total) }}</td>
               </tr>
               <tr class="-promos-tr" v-if="hasPromos(item)">
                  <td colspan="3">
                     <v-promo-results-report class="-promos" :promo_results="item.price.promo_results" :qty="item.qty"></v-promo-results-report>
                  </td>
               </tr>
            </tbody>

         </table>
      </template>

      <template v-else>
         <span class="-empty">Sem itens no pedido</span>
      </template>


      <div class="-separator"></div>


      <table class="-totals" cellspacing="0" cellpadding="0">

         <tr class="-subtotal" :class="{ '--discount': receipt && receipt.price.subtotal > receipt.price.total }">
            <th class="-label">Subtotal</th>
            <td class="-value">{{ _formatCurrency(receipt ? receipt.price.subtotal : 0) }}</td>
         </tr>


         <tr class="-total">
            <th class="-label">Total</th>
            <td class="-value">{{ _formatCurrency(receipt ? receipt.price.total : 0) }}</td>
         </tr>


         <tr class="-promos" v-if="receipt && receipt.price.promo_results.length">
            <td colspan="2">
               <v-promo-results-report :promo_results="receipt.price.promo_results" right></v-promo-results-report>
            </td>
         </tr>

      </table>


      <div class="-separator"></div>


      <md-button class="-finish-order md-raised" type="button" @click="$emit('finish-order')" :disabled="!receipt || !receipt.items.length">
         Finalizar pedido
      </md-button>

   </div>
</template>



<script>
import OrderReceiptVO      from './order-receipt-vo';
import VPromoResultsReport from '../promo/v-promo-results-report';



export default {
   name: 'v-order-receipt',
	components: { VPromoResultsReport },
	props: {
		/**
       * @type {OrderReceiptVO}
		 */
		'receipt': {
   		type: OrderReceiptVO,
         required: false
      }
   },


   methods: {
   	hasPromos(item){
   		return item.price.promo_results && item.price.promo_results.length;
      },

      _formatCurrency(value){
			const cents = ((value % 1) + '').replace('0.', '').padEnd(2, '0').slice(0, 2);
			const integer = Math.floor(value);
   		return `R$ ${integer},${cents}`;
      }
   }
}
</script>



<style>
.v-order-receipt{
   display: flex;
   flex-direction: column;

   padding: 1.2em 1em;

   background-color: #FFF9C4;
   border-radius: 4px;
   box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
}
.v-order-receipt > .-title{
   user-select: none;
   cursor: default;

   display: flex;
   align-items: center;

   margin-bottom: 0.6em;
   font-family: 'Roboto Slab', serif;
   font-size: 16px;
   font-weight: bold;
   color: rgba(0,0,0,0.6);
}
.v-order-receipt > .-title > .-icon{
   opacity: 0.8;
   margin-right: 0.2em;
   font-size: 22px;
}

.v-order-receipt > .-items{
   border: none;
}
.v-order-receipt > .-items > .-item{
   cursor: default;

   font-size: 14px;

   transition: background-color 0.2s ease;
}
.v-order-receipt > .-items > .-item > tr > td{
   padding: 0.2em 0.2em;
}
.v-order-receipt > .-items > .-item > .-item-tr > .-name{
   text-align: left;
}
.v-order-receipt > .-items > .-item > .-item-tr > .-subtotal,
.v-order-receipt > .-items > .-item > .-item-tr > .-total{
   text-align: right;
}
.v-order-receipt > .-items > .-item.-header > tr > th{
   padding-bottom: 0.3em;
}

.v-order-receipt > .-items > .-item.-header{
   font-family: 'Roboto Slab', serif;
   font-weight: bold;
}
.v-order-receipt > .-items > .-item:not(.-header):hover{
   background-color: rgba(0,0,0,0.06);
}

.v-order-receipt > .-items > .-item > .-item-tr > .-subtotal.--discount{
   opacity: 0.6;
   text-decoration: line-through;
}
.v-order-receipt > .-items > .-item:not(.-header) > .-item-tr > .-total{
   font-weight: 500;
}
.v-order-receipt > .-items > .-item.--with-promo > .-total{
   color: #00E676;
   text-shadow: 1px 1px 0 rgba(255,255,255,0.3);
}

.v-order-receipt > .-empty{
   user-select: none;
   cursor: default;
   opacity: 0.5;
   font-style: italic;
}

.v-order-receipt > .-separator{
   background-color: rgba(0,0,0,0.1);
   height: 1px;
   width: 100%;
   margin: 1em 0;
}

.v-order-receipt > .-totals{
   cursor: default;
   width: 12em;
   align-self: flex-end;
   font-size: 14px;
}

.v-order-receipt > .-totals > tr > .-label,
.v-order-receipt > .-totals > tr > .-value{
   text-align: right;
}

.v-order-receipt > .-totals > .-subtotal > .-label,
.v-order-receipt > .-totals > .-total > .-label{
   text-transform: uppercase;
   font-weight: 500;
}
.v-order-receipt > .-totals > .-subtotal.--discount > .-value{
   opacity: 0.6;
   text-decoration: line-through;
}
.v-order-receipt > .-totals > .-total > .-value{
   font-weight: 500;
}


.v-order-receipt > .-totals > .-promos > td{
   padding-top: 0.5em;
}

.v-order-receipt > .-finish-order{
   --md-theme-default-background: var(--m-green-a400);
   --md-theme-default-text-primary-on-background: var(--m-grey-50);
}


</style>
