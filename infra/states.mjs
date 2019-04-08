export default class States{
   constructor(){
      this._active = [];
   }

   add(state){
      if(!this.is(state))
         this._active.push(state);
   }

   remove(state){
      const index = this._active.indexOf(state);
      if(index > -1)
         this._active.splice(index, 1);
   }

   is(state){
      return this._active.includes(state);
   }

   get active(){
      return this._active;
   }

}
