import PromoResult       from '../../../api/order/promo/result/promo-result';
import OrderReceiptPrice from '../../../api/order/receipt/order-receipt-price';



export default class OrderReceiptPriceVO extends OrderReceiptPrice{

	constructor(subtotal, total, promo_results){
		super(subtotal, total, promo_results);
	}


	static from(obj){
		return new OrderReceiptPriceVO(
			obj.subtotal,
			obj.total,
			(obj.promo_results || []).map(PromoResult.from)
		);
	}


}