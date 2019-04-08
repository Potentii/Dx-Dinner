import OrderReceipt        from '../../../api/order/receipt/order-receipt';
import OrderReceiptPriceVO from './order-receipt-price-vo';
import OrderReceiptItemVO  from './order-receipt-item-vo';



export default class OrderReceiptVO extends OrderReceipt{

	constructor(items, price){
		super(items, price);
	}


	static from(obj){
		return new OrderReceiptVO(
			(obj.items || []).map(OrderReceiptItemVO.from),
			obj.price ? OrderReceiptPriceVO.from(obj.price) : null,
		);
	}

}