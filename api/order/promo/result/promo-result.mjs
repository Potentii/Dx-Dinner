export default class PromoResult{

	/**
	 *
	 * @param {Promo} promo
	 * @param {Object} data
	 */
	constructor(promo, data){
		this.promo = promo;
		this.data = data;
	}


	static from(obj){
		return new PromoResult(
			obj.promo,
			obj.data
		);
	}

}