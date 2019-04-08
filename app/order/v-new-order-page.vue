<template>
   <v-dx-dinner-page class="v-new-order-page" content_class="-content">

      <div class="-main" ref="main">

         <div class="-ingredients-panel" :class="{ '--finished': states.is('finished') }">

            <div class="-ingredients">

               <div class="-smoke">
                  <img src="../../resources/images/ingredients/smoke.png" alt="Fumacinha saindo do lanche"/>
               </div>

               <div class="-order-name" v-if="order && order.name">
                  <span class="-name">{{ order.name }}</span>
               </div>

               <v-pretty-order-item class="-ingredient -bread-top" :order_item_group="bread_top" static></v-pretty-order-item>


               <div class="-no-ingredients" v-if="!order || !order.items.length">
                  <span class="-content">Que tal deixar seu lanche mais saboroso? 😋</span>
                  <v-dx-dinner-chips-wrapper class="-picker" header="Ingredientes" header_center>
                     <md-chip v-for="(item, index) in items"
                              :key="item.id"
                              @click="_addItemOnOrder(item)"
                              md-clickable>
                        {{ item.name }}
                     </md-chip>
                  </v-dx-dinner-chips-wrapper>
               </div>


               <v-pretty-order-item class="-ingredient"
                                    :order_item_group="item_group"
                                    :key="item_group.id"
                                    @remove="_removeItemFromOrder(item_group.item)"
                                    v-for="item_group in grouped_selected_items">
               </v-pretty-order-item>


               <v-pretty-order-item class="-ingredient -bread-bottom" :order_item_group="bread_bottom" static></v-pretty-order-item>

            </div>

         </div>


         <div class="-separator-1 -separator"></div>


         <div class="-order-control-panel">

            <div class="-selectors">

               <v-dx-dinner-chips-wrapper class="-picker -prepicked-picker" header="Lanches prontos" v-if="prepicked_orders.length">
                  <md-chip v-for="(prepicked, index) in prepicked_orders"
                           :key="prepicked.id"
                           @click="_selectPrepicked(prepicked)"
                           md-clickable>
                     {{ prepicked.name }}
                  </md-chip>
               </v-dx-dinner-chips-wrapper>

               <v-dx-dinner-chips-wrapper class="-picker -ingredients-picker" header="Ingredientes" v-if="items.length">
                  <md-chip v-for="(item, index) in items"
                           :key="item.id"
                           @click="_addItemOnOrder(item)"
                           md-clickable>
                     {{ item.name }}
                  </md-chip>
               </v-dx-dinner-chips-wrapper>

            </div>

         </div>

         <div class="-separator-2 -separator"></div>

         <div class="-finish-order-panel">

            <v-order-receipt class="-receipt" :receipt="receipt" @finish-order="_finishOrder"></v-order-receipt>

         </div>

      </div>

   </v-dx-dinner-page>
</template>



<script>
import States                from '/infra/states';
import VDxDinnerPage         from '../../infra/ui/v-dx-dinner-page';
import OrderItemVO           from './item/order-item-vo';
import VPrettyOrderItem      from './item/v-pretty-order-item';
import OrderItemGroup        from './item/order-item-group';
import VDxDinnerChipsWrapper from '../../infra/ui/v-dx-dinner-chips-wrapper';
import ITEMS                 from '../../api/order/item/e-items';
import OrderItemVORoot       from './item/order-item-vo-root';
import OrderVO               from './order-vo';
import OrderVORoot           from './order-vo-root';
import VOrderReceipt         from './receipt/v-order-receipt';



export default {
   name: 'v-new-order-page',


   components: { VOrderReceipt, VDxDinnerChipsWrapper, VPrettyOrderItem, VDxDinnerPage },


   data(){
      return {

         /**
          * @type {OrderVO}
          */
         order: null,

			/**
			 * @type {OrderItemVO[]}
			 */
			items: [],

			/**
			 * @type {OrderReceiptVO}
			 */
			receipt: null,

			/**
			 * @type {OrderVO[]}
			 */
			prepicked_orders: [],

			states: new States(),

         bread_top: new OrderItemGroup(new OrderItemVO('BREAD_TOP', 'Pão'), 1),
			bread_bottom: new OrderItemGroup(new OrderItemVO('BREAD_BOTTOM', 'Pão'), 1),

         items_ordering: {}
      };
   },


   computed: {
		/**
       *
		 * @return {OrderItemGroup[]}
		 */
		grouped_selected_items(){
			if(!this.order || !this.items.length)
				return [];
			
			// *Grouping the items by their types:
   		return this._groupItems(this.order.items)
            // *Sorting the groups:
            .sort(this._visuallySortItemGroupsFunc);
      }
   },


   async beforeMount(){
   	await this._loadMenuItems();
   	await this._loadPrepicked();

		this.items_ordering = {};
		this.items_ordering[ITEMS.LETUCE]    = 1;
		this.items_ordering[ITEMS.BACON]     = 2;
		this.items_ordering[ITEMS.EGG]       = 3;
		this.items_ordering[ITEMS.CHEESE]    = 4;
		this.items_ordering[ITEMS.HAMBURGER] = 5;

   },

   async mounted(){
   	await this.resetOrder();
   },


   methods: {

      async _loadMenuItems(){
			this.items = await OrderItemVORoot.getAll();
      },

		async _loadPrepicked(){
			this.prepicked_orders = await OrderVORoot.getAllPrePicked();
		},


      async resetOrder(){
			this.order = new OrderVO();
			this.states.remove('finished');
			await this.updateOrder();
      },


      async _addItemOnOrder(item){
      	await this.order.addItem(item);
			await this.updateOrder();
      },


		async _removeItemFromOrder(item){
			await this.order.removeItem(item);
         await this.updateOrder();
		},


      async _selectPrepicked(prepicked){
      	this.order.items = [...prepicked.items];
			await this.updateOrder();
      },


      async updateOrder(){
			const prepicked_version = this.getPrepickedIfItemsMatch(this.order.items);
			if(prepicked_version){
            this.order.name = prepicked_version.name;
         } else{
            this.order.name = null;
         }

			await this.order.save();

			await this.updateReceipt();
      },


      getPrepickedIfItemsMatch(items){
      	const sorted_items_ids = items.map(i => i.id).sort();
         return this.prepicked_orders.find(o => {
				const prepicked_items_ids_sorted = o.items.map(i => i.id).sort();
         	return sorted_items_ids.join('') === prepicked_items_ids_sorted.join('');
         })
      },


      async updateReceipt(){
         this.receipt = await this.order.generateReceipt();
      },


      async _finishOrder(){
      	this.$refs.main.scrollIntoView();
      	this.states.add('finished');
      	setTimeout(async () => {
      		await this.resetOrder();
         }, 4000);
      },


		_scrollToTop(smoothness){
			const c = document.documentElement.scrollTop || document.body.scrollTop;
			if(c>0){
				window.requestAnimationFrame(this._scrollToTop(smoothness));
				window.scrollTo(0, c - c / smoothness);
			}
		},


      /**
       * @param {OrderItemVO[]} items
       * @return {OrderItemGroup[]}
       */
      _groupItems(items){
			return items.reduce((groups, item) => {
				const group = groups.find(g => g.item.id === item.id);
				if(group)
					group.qty++;
				else
					groups.push(new OrderItemGroup(item, 1));
				return groups;
			}, []);
      },


		/**
       *
		 * @param {OrderItemGroup} group_a
		 * @param {OrderItemGroup} group_b
		 * @private
       * @return {Number}
		 */
		_visuallySortItemGroupsFunc(group_a, group_b){
         return (this.items_ordering[group_a.item.id] || 0) - (this.items_ordering[group_b.item.id] || 0);
      }
   }

}
</script>



<style>
.v-new-order-page .-content{
   --v-dx-dinner-chips-wrapper-chip-bg-color: var(--accent-bg--base);
   --v-dx-dinner-chips-wrapper-chip-fg-color: var(--accent-fg--base);
   --v-dx-dinner-chips-wrapper-chip-bg-color--hover: var(--accent-bg--1);
   --v-dx-dinner-chips-wrapper-chip-fg-color--hover: var(--accent-fg--base);

   display: flex;
   flex-direction: row;
   justify-content: center;

   width: 100%;
   height: max-content;

   overflow-y: auto;
   overflow-x: hidden;
}
.v-new-order-page .-content > .-main{
   display: grid;
   grid-template-columns: minmax(30rem, 1fr) 1px minmax(min-content, 25rem);
   grid-template-rows: auto 1px auto 1fr;
   grid-template-areas:
      'ingredients sep1 controls'
      'ingredients sep1 sep2'
      'ingredients sep1 finish'
      'ingredients sep1 ...';

   grid-column-gap: 2rem;
   grid-row-gap: 2rem;

   width: 100%;
   max-width: 95%;
   height: max-content;

   padding: 4rem 1rem 4rem 1rem;
   /*margin-bottom: 4rem;*/
}
.v-new-order-page .-content > .-main > .-ingredients-panel{
   grid-area: ingredients;
}
.v-new-order-page .-content > .-main > .-separator-1{
   grid-area: sep1;
}
.v-new-order-page .-content > .-main > .-separator-2{
   grid-area: sep2;
}
.v-new-order-page .-content > .-main > .-order-control-panel{
   grid-area: controls;
}



.v-new-order-page .-content > .-main > .-ingredients-panel{
   display: flex;
   flex-direction: column;
   align-items: center;
}
.v-new-order-page .-content > .-main > .-separator{
   background-color: rgba(0,0,0,0.1);
}
.v-new-order-page .-content > .-main > .-separator-1{
   height: 100%;
   width: 1px;
}
.v-new-order-page .-content > .-main > .-separator-2{
   height: 1px;
   width: 100%;
}
.v-new-order-page .-content > .-main > .-order-control-panel{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}

@media (max-width: 52rem) {
   .v-new-order-page .-content > .-main{
      grid-template-columns: 1fr;
      grid-template-rows: max-content 1px max-content;
      grid-template-areas:
         'controls'
         'sep1'
         'ingredients'
         'sep2'
         'finish';
   }

   .v-new-order-page .-content > .-main > .-separator-1,
   .v-new-order-page .-content > .-main > .-separator-2{
      height: 1px;
      width: 100%;
   }

   .v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-no-ingredients > .-picker{
      display: none;
   }
}


.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients{
   user-select: none;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   width: 100%;
   max-width: 30rem;

   z-index: 4;
}
.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-ingredient{
   width: 100%;

   will-change: margin-top;
}
.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-ingredient.-bread-top{
   z-index: 1;
}
.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-ingredient + .-ingredient{
   margin-top: 1em;
}
.v-new-order-page .-content > .-main > .-ingredients-panel.--finished > .-ingredients > .-ingredient{
   animation-name: v-new-order-page-ingredients-finishing-collapse;
   animation-duration: 0.6s;
   animation-delay: 0.2s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}

@keyframes v-new-order-page-ingredients-finishing-collapse {
   100%{
      margin-top: -1.3em;
   }
}

.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-smoke{
   display: none;
   opacity: 0;
   position: absolute;
   width: 75%;

   z-index: 4;
}
.v-new-order-page .-content > .-main > .-ingredients-panel.--finished > .-ingredients > .-smoke{
   display: block;
   animation-name: v-new-order-page-ingredients-finishing-smoke-up;
   animation-duration: 2s;
   animation-delay: 1.2s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}

@keyframes v-new-order-page-ingredients-finishing-smoke-up {
   75%{
      opacity: 1;
   }
   100%{
      opacity: 0;
      transform: translateY(-60%);
   }
}

.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-no-ingredients{
   cursor: default;
   user-select: none;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   width: 70%;
   padding: 1.4em;
   margin: 2em 0;

   text-align: center;

   background-color: var(--m-grey-200);
   border-radius: 10px;
   box-shadow: 0 4px 15px -2px rgba(0,0,0,0.1);
}
.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-no-ingredients > .-title{
   margin-bottom: 1em;

   color: var(--m-grey-700);
   font-size: 14px;
   font-weight: 500;
}
.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-no-ingredients > .-content{
   color: var(--m-grey-700);
   font-size: 16px;
}
.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-no-ingredients > .-picker{
   margin-top: 1em;
}


.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-order-name{
   cursor: default;
   position: absolute;

   display: flex;
   height: 100%;
   width: 25px;
   align-items: center;
   white-space: nowrap;
   justify-content: center;

   top: 0;
   left: 0;

   z-index: 2;
}
.v-new-order-page .-content > .-main > .-ingredients-panel > .-ingredients > .-order-name > .-name{
   display: inline-block;
   opacity: 0.16;

   font-family: 'Roboto Slab', serif;
   font-weight: bold;
   font-size: 64px;

   letter-spacing: -0.03em;
   text-shadow: 2px 2px 0 rgba(255,255,255,1);
   transform: rotateZ(-90deg);
}


.v-new-order-page .-content > .-main > .-order-control-panel > .-selectors > .-picker + .-picker{
   margin-top: 1.5em;
}


</style>
