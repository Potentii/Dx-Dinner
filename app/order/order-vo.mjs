import Order              from '../../api/order/order';
import OrderVORoot        from './order-vo-root';
import OrderReceiptVORoot from './receipt/order-receipt-vo-root';
import OrderItemVO        from './item/order-item-vo';



export default class OrderVO extends Order{

	constructor(_id, name, items){
		super(_id, name, items);
	}


	static from(obj){
		return new OrderVO(
			obj._id,
			obj.name,
			(obj.items || []).map(OrderItemVO.from)
		);
	}



	async save(){
		const order = await OrderVORoot.save(this);
		this._id = order._id;
		this.name = order.name;
		this.items = order.items;
	}



	/**
	 * Adds a new item to this order
	 * @param {OrderItemVO} item The item to be added
	 */
	async addItem(item){
		const order = await OrderVORoot.addItem(this.id, item.id);
		this.items = order.items;
	}


	/**
	 * Removes a item from this order
	 * @param {OrderItemVO} item The item to be removed
	 */
	async removeItem(item){
		const order = await OrderVORoot.removeItem(this.id, item.id);
		this.items = order.items;
	}


	/**
	 * Generates the receipt for this order
	 * @return {Promise<OrderReceiptVO>} The receipt
	 */
	async generateReceipt(){
		return await OrderReceiptVORoot.generateReceipt(this.id);
	}

}