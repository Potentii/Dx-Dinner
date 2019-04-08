export default class OrderItemGroup{

	constructor(item, qty){
		this.item = item;
		this.qty = qty;
	}


	get id(){
		return this.item.id;
	}

}