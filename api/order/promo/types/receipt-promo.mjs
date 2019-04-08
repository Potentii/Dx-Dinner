import Promo from '../promo';



/**
 * @abstract
 */
export default class ReceiptPromo extends Promo{

	constructor(_id, name, description){
		super(_id, name, description);
	}


	/**
	 *	Checks if the given receipt is eligible to receive this promo
	 * @abstract
	 * @param {OrderReceipt} receipt The receipt to be checked
	 * @return {Boolean} True if it's eligible, false otherwise
	 */
	isEligible(receipt){}


	/**
	 *
	 * @abstract
	 * @param {OrderReceipt} receipt
	 * @return {PromoResult}
	 */
	getResult(receipt){}

}