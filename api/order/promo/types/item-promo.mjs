import Promo from '../promo';



/**
 * @abstract
 */
export default class ItemPromo extends Promo{

	constructor(_id, name, description){
		super(_id, name, description);
	}


	/**
	 *	Checks if the given item is eligible to receive this promo
	 * @abstract
	 * @param {OrderReceiptItem} item The item to be checked
	 * @return {Boolean} True if it's eligible, false otherwise
	 */
	isEligible(item){}


	/**
	 *
	 * @abstract
	 * @param {OrderReceiptItem} item
	 * @return {PromoResult}
	 */
	getResult(item){}

}