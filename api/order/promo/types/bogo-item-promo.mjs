import ItemPromo   from './item-promo';
import PromoResult from '../result/promo-result';



/**
 * @abstract
 */
export default class BOGOItemPromo extends ItemPromo{

	constructor(_id, name, description, item_id, on_each, pay_only){
		super(_id, name, description);
		this.item_id = item_id;
		this.on_each = on_each;
		this.pay_only = pay_only;
	}


	getResult(item){
		const number_of_combos = Math.floor(item.qty / this.on_each);
		const excedent = item.qty - (number_of_combos * this.on_each);
		return new PromoResult(this, {
			pay_only: (number_of_combos * this.pay_only) + excedent
		});
	}


	isEligible(item){
		return item.id === this.item_id && item.qty >= this.on_each;
	}
}