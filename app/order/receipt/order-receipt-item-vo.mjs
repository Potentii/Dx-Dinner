import OrderItemVO         from '../item/order-item-vo';
import OrderReceiptItem    from '../../../api/order/receipt/order-receipt-item';
import OrderReceiptPriceVO from './order-receipt-price-vo';



export default class OrderReceiptItemVO extends OrderReceiptItem{

	constructor(item, qty, price){
		super(item, qty, price);
	}


	static from(obj){
		return new OrderReceiptItemVO(
			OrderItemVO.from(obj.item),
			obj.qty,
			obj.price ? OrderReceiptPriceVO.from(obj.price) : null
		);
	}

}