import OrderReceiptPrice from './order-receipt-price';
import OrderItem         from '../item/order-item';



export default class OrderReceiptItem{

	/**
	 *
	 * @param {OrderItem} item
	 * @param {Number} qty
	 * @param {OrderReceiptPrice} [price]
	 */
	constructor(item, qty, price = new OrderReceiptPrice()){
		this.item = item;
		this.qty = qty;
		this.price = price;
	}


	get id(){
		return '' + this.item.id;
	}


	/**
	 *
	 * @param {OrderItem[]} items
	 * @return {OrderReceiptItem[]}
	 */
	static async fromOrderItems(items){
		const receipt_items = items.reduce((groups, item) => {
				const group = groups.find(g => g.id === item.id);
				if(group)
					group.qty++;
				else
					groups.push(new OrderReceiptItem(item, 1));

				return groups;
			}, []);

		for(let receipt_item of receipt_items)
			receipt_item.price = await OrderReceiptPrice.forItem(receipt_item);

		return receipt_items;
	}

}