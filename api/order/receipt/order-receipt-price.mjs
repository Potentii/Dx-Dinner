import PromoRoot   from '../promo/promo-root';
import PromoResult from '../promo/result/promo-result';



export default class OrderReceiptPrice{

	/**
	 *
	 * @param {Number} [subtotal]
	 * @param {Number} [total]
	 * @param {PromoResult[]} [promo_results]
	 */
	constructor(subtotal = 0, total = 0, promo_results = []){
		this.subtotal = subtotal;
		this.total = total;
		this.promo_results = promo_results;
	}


	/**
	 *
	 * @param {OrderReceipt} receipt
	 * @return {Promise<OrderReceiptPrice>}
	 */
	static async forReceipt(receipt){
		const price = new OrderReceiptPrice();

		const promos = await PromoRoot.getAllPromosForReceipt();
		for(let promo of promos){
			if(promo.isEligible(receipt)){
				const promo_result = promo.getResult(receipt);
				price.promo_results.push(promo_result);
			}
		}

		price.subtotal = receipt.items.reduce((sub, i) => sub + i.price.total, 0);

		price.total = (price.promo_results.length)
			? price.subtotal * (1 - price.promo_results[0].data.discount)
			: price.subtotal;

		return price;
	}


	/**
	 *
	 * @param {OrderReceiptItem} receipt_item
	 * @return {Promise<OrderReceiptPrice>}
	 */
	static async forItem(receipt_item){
		const price = new OrderReceiptPrice();

		const promos = await PromoRoot.getAllPromosForItems();
		for(let promo of promos){
			if(promo.isEligible(receipt_item)){
				const promo_result = promo.getResult(receipt_item);
				price.promo_results.push(promo_result);
			}
		}

		price.subtotal = receipt_item.qty * receipt_item.item.price;

		price.total = (price.promo_results.length)
			? receipt_item.item.price * price.promo_results[0].data.pay_only
			: price.subtotal;

		return price;
	}

}