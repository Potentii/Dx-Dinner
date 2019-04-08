export default class OrderItem{

	/**
	 *
	 * @param {String} _id
	 * @param {String} name
	 * @param {Number} price
	 */
	constructor(_id, name, price){
		this._id = _id;
		this.name = name;
		this.price = price;
	}


	static from(obj){
		return new OrderItem(
			obj._id,
			obj.name,
			obj.price
		);
	}


	/**
	 * This item's identifier
	 * @return {String}
	 */
	get id(){
		return '' + this._id;
	}



}