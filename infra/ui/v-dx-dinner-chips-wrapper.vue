<template>
   <div class="v-dx-dinner-chips-wrapper">
      <div class="-header" v-if="header" :class="{ '--center': !!header_center }">
         {{ header }}
      </div>
      <div class="v-dx-dinner-chips-wrapper-content">
         <slot></slot>
      </div>
   </div>
</template>



<script>
export default {
   name: 'v-dx-dinner-chips-wrapper',


	props: {
		'header': {
			type: String,
			required: false
		},

		'header_center': {
			type: Boolean,
			required: false
		}
	},
}
</script>



<style>
.v-dx-dinner-chips-wrapper{
   --var-chip-bg-color: var(--v-dx-dinner-chips-wrapper-chip-bg-color, var(--m-grey-400));
   --var-chip-fg-color: var(--v-dx-dinner-chips-wrapper-chip-fg-color, var(--m-grey-800));

   --var-chip-bg-color--hover: var(--v-dx-dinner-chips-wrapper-chip-bg-color--hover, var(--m-grey-800));
   --var-chip-fg-color--hover: var(--v-dx-dinner-chips-wrapper-chip-fg-color--hover, var(--m-grey-100));

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   padding: 0.8em 1.2em;

   border-radius: 6px;
   border-color: var(--m-grey-400);
   border-width: 2px;
   border-style: solid;
}

.v-dx-dinner-chips-wrapper > .-header{
   user-select: none;
   cursor: default;

   margin-bottom: 0.8em;

   font-family: 'Roboto Slab', serif;
   letter-spacing: 0.05em;
   font-size: 16px;
   font-weight: bold;
   color: var(--m-grey-600);
} .v-dx-dinner-chips-wrapper > .-header:not(.--center){
   align-self: flex-start;
}
.v-dx-dinner-chips-wrapper > .-header::after{
   content: '';
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 2px;
   background-color: var(--m-grey-600);
}

.v-dx-dinner-chips-wrapper > .v-dx-dinner-chips-wrapper-content{
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
}

.v-dx-dinner-chips-wrapper > .v-dx-dinner-chips-wrapper-content > .md-chip{
   --md-theme-default-accent: var(--var-chip-bg-color);
   --md-theme-default-highlight: var(--var-chip-bg-color);
   --md-theme-default-icon: var(--var-chip-bg-color--hover);

   --md-theme-default-text-primary-on-accent: var(--var-chip-fg-color);
   --md-theme-default-text-primary: var(--var-chip-fg-color);
   --md-theme-default-text-primary-on-icon: var(--var-chip-fg-color--hover);

   user-select: none;
   cursor: pointer;

   margin: 0.3em 0.4em;
}
.v-dx-dinner-chips-wrapper > .v-dx-dinner-chips-wrapper-content > .md-chip + .md-chip{
   /*margin-left: 1em;*/
}
</style>
