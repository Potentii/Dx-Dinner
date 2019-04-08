import OrderReceipt from './receipt/order-receipt';
import OrderItem    from './item/order-item';



export default class Order{

	/**
	 * @constructor
	 * @param {String} _id
	 * @param {String} [name]
	 * @param {OrderItem[]} [items]
	 */
	constructor(_id, name = null, items = []){
		this._id = _id;
		this.name = name;
		this.items = items;
	}


	static from(obj){
		return new Order(
			obj._id,
			obj.name,
			(obj.items || []).map(OrderItem.from)
		);
	}


	/**
	 * This order's identifier
	 * @return {String}
	 */
	get id(){
		return '' + this._id;
	}


	/**
	 * Adds a new item to this order
	 * @param {OrderItem} item The item to be added
	 */
	async addItem(item){
		this.items.push(item);
	}


	/**
	 * Removes a item from this order
	 * @param {OrderItem} item The item to be removed
	 */
	async removeItem(item){
		const index_to_remove = this.items.findIndex(i => i.id === item.id);

		if(index_to_remove < 0)
			throw new Error(`Cannot remove item: The item "${item.id}" is not on the order "${this.id}"`);

		this.items.splice(index_to_remove, 1);
	}


	/**
	 *
	 * @return {Promise<OrderReceipt>}
	 */
	async generateReceipt(){
		return await OrderReceipt.fromOrder(this);
	}

}