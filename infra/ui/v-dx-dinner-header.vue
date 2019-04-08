<template>
   <header class="v-dx-dinner-header">
      <div class="-logo">
         <img class="-img" src="../../resources/images/logo/dx-dinner-logo@2x.png" alt="Dx Dinner logo" draggable="false"/>
      </div>
      <div class="v-dx-dinner-header-content">
         <slot></slot>
      </div>
   </header>
</template>



<script>
export default {
   name: 'v-dx-dinner-header'
}
</script>



<style>
.v-dx-dinner-header{
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;

   width: 100%;
   height: 90px;

   padding: 0.8em 1em;

   background-color: var(--primary-bg--base);
   background-image:
      radial-gradient(farthest-side at top, rgba(0,0,0,0), rgba(0,0,0,0.08)),
      linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(0,0,0,0.1)),
      url('../../resources/images/noise.png');
   background-blend-mode: hard-light;
   background-repeat: repeat;

   box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.35);

   z-index: 10;
}

.v-dx-dinner-header > .-logo{
   --padding-v: 1em;
   --padding-h: 3em;

   user-select: none;
   flex-shrink: 0;

   padding: var(--padding-v) var(--padding-h);

   background-image: radial-gradient(closest-side, rgba(255,255,255,0.2), rgba(255,255,255,0));

   transform: translateY(calc(36% - var(--padding-v)));
}
.v-dx-dinner-header > .-logo > .-img{
   height: 112px;
   transition: transform 0.5s ease;
}
.v-dx-dinner-header > .-logo > .-img:hover{
   transform: scale(1.04);
   transition: transform 0.18s ease;
}

.v-dx-dinner-header > .v-dx-dinner-header-content{
   color: var(--primary-fg--base);
}

@media (max-width: 52rem){
   .v-dx-dinner-header{
      height: 50px;
   }
   .v-dx-dinner-header > .-logo{
      --padding-v: 0em;
      --padding-h: 0em;

      transform: translateY(calc(30% - var(--padding-v)));
   }
   .v-dx-dinner-header > .-logo > .-img{
      height: 70px;
   }
}
</style>
