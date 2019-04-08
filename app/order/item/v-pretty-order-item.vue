<template>
   <div class="v-pretty-order-item" :class="{ '--static': !!static }">
      <div class="-qty" v-show="order_item_group.qty > 1 && !static">
         <transition name="-qty-change" mode="out-in">
            <span class="-value" :key="order_item_group.qty">x{{ order_item_group.qty }}</span>
         </transition>
      </div>
      <div class="-img">
         <img v-if="     order_item_group.item.id === 'BACON'"     src="/resources/images/ingredients/bacon-nofeather.svg"  :alt="order_item_group.item.name" draggable="false"/>
         <img v-else-if="order_item_group.item.id === 'HAMBURGER'" src="/resources/images/ingredients/burger-nofeather.svg" :alt="order_item_group.item.name" draggable="false"/>
         <img v-else-if="order_item_group.item.id === 'LETUCE'"    src="/resources/images/ingredients/letuce-nofeather.svg" :alt="order_item_group.item.name" draggable="false"/>
         <img v-else-if="order_item_group.item.id === 'CHEESE'"    src="/resources/images/ingredients/cheese-nofeather.svg" :alt="order_item_group.item.name" draggable="false"/>
         <img v-else-if="order_item_group.item.id === 'EGG'"       src="/resources/images/ingredients/egg-nofeather.svg"    :alt="order_item_group.item.name" draggable="false"/>

         <img v-else-if="order_item_group.item.id === 'BREAD_TOP'"    src="/resources/images/ingredients/bread-top-nofeather.svg"    :alt="order_item_group.item.name" draggable="false"/>
         <img v-else-if="order_item_group.item.id === 'BREAD_BOTTOM'" src="/resources/images/ingredients/bread-bottom-nofeather.svg" :alt="order_item_group.item.name" draggable="false"/>
      </div>
      <div class="-name" v-if="!static">
         <div class="-value">
            <span class="-name-value">{{ order_item_group.item.name }}</span>
            <button class="-remove" type="button" @click="$emit('remove')">
               <i class="material-icons">close</i>
            </button>
         </div>
      </div>
   </div>
</template>



<script>
import OrderItemGroup from './order-item-group';



export default {
   name: 'v-pretty-order-item',


   props: {
   	'order_item_group': {
   		type: OrderItemGroup,
         required: true
      },

		'static': {
			type: Boolean,
			required: false,
         default: false
		}
   }
}
</script>



<style>
.v-pretty-order-item{
   height: 4.3em;

   border-radius: 10px;

   overflow: hidden;

   transition: background-color 0.3s ease;
}
.v-pretty-order-item:not(.--static):hover{
   background-color: rgba(0,0,0,0.04);
}

.v-pretty-order-item > .-name,
.v-pretty-order-item > .-qty{
   cursor: default;
   user-select: none;

   position: absolute;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;

   top: 0;
   height: 100%;

   z-index: 1;
}
.v-pretty-order-item > .-name > .-value,
.v-pretty-order-item > .-qty > .-value{
   display: block;

   padding-right: 1.5rem;
   padding-left: 1.5rem;

   font-size: 16px;
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
   letter-spacing: 0.08em;

   text-shadow:
      1px 1px 0 rgba(255,255,255,0.3),
      1px 2px 3px rgba(0,0,0,0.1);
}

.v-pretty-order-item > .-qty > .-value.-qty-change-leave-active{
   transition: transform, 0.04s ease;
}
.v-pretty-order-item > .-qty > .-value.-qty-change-enter-active{
   transition: transform 0.4s ease;
}
.v-pretty-order-item > .-qty > .-value.-qty-change-leave-to{
   transform: scale(1.3);
}
.v-pretty-order-item > .-qty > .-value.-qty-change-enter{
   transform: scale(1.3);
}

.v-pretty-order-item > .-name{
   opacity: 0;
   justify-content: flex-end;

   min-width: 50%;
   right: 0;

   background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.65) 75%, rgba(255,255,255,0.5));

   transform: translateX(4rem);

   z-index: 1;
   transition: opacity, transform, 0.25s ease;
} .v-pretty-order-item:hover > .-name{
   opacity: 1;
   transform: translateX(0);
}
.v-pretty-order-item > .-name > .-value{
   transform: translateX(6rem);
   transition: transform 0.5s ease;
} .v-pretty-order-item:hover > .-name > .-value{
   transform: translateX(0);
}

.v-pretty-order-item > .-name > .-value{
   display: flex;
   align-items: center;
   justify-content: flex-end;
}

.v-pretty-order-item:hover > .-name > .-value > .-remove{
   display: flex;
   align-items: center;
   justify-content: center;
   width: 2em;
   height: 2em;

   border-radius: 50%;
   box-shadow: 0 3px 10px -2px rgba(0,0,0,0.1);
   transition: background-color 0.2s ease;
   margin-left: 1em;
}
.v-pretty-order-item:hover > .-name > .-value > .-remove:hover{
   background-color: rgba(255, 63, 17, 0.3);
   box-shadow: 0 5px 10px -2px rgba(0,0,0,0.1);
}
.v-pretty-order-item:hover > .-name > .-value > .-remove:active{
   background-color: rgba(255, 63, 17, 0.2);
   box-shadow: 0 2px 10px -2px rgba(0,0,0,0.1);
}
.v-pretty-order-item:hover > .-name > .-value > .-remove > .material-icons{
   font-size: 1.1em;
   color: var(--m-red-a400);
}

@keyframes v-pretty-order-item-name-fade-in{
   0%{
      opacity: 0;
      transform: translateX(50%);
   }
}
@keyframes v-pretty-order-item-name-fade-out{
   100%{
      opacity: 0;
      transform: translateX(50%);
   }
}

.v-pretty-order-item > .-qty{
   left: 0;
   z-index: 2;
}

.v-pretty-order-item > .-img{
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
}
.v-pretty-order-item > .-img > img{
   /*max-height: 100%;*/
   width: 70%;
}
</style>
