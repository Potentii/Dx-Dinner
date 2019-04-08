import OrderReceiptItem  from './order-receipt-item';
import OrderReceiptPrice from './order-receipt-price';



export default class OrderReceipt{

	/**
	 *
	 * @param {OrderReceiptItem[]} [items]
	 * @param {OrderReceiptPrice} [price]
	 */
	constructor(items = [], price = new OrderReceiptPrice()){
		this.items = items;
		this.price = price;
	}


	/**
	 *
	 * @param {Order} order
	 * @return {Promise<OrderReceipt>}
	 */
	static async fromOrder(order){
		const receipt = new OrderReceipt();

		receipt.items = await OrderReceiptItem.fromOrderItems(order.items);

		receipt.price = await OrderReceiptPrice.forReceipt(receipt);

		return receipt;
	}

}