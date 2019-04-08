import LightPromo       from './types/impl/light-promo';
import MuitaCarnePromo  from './types/impl/muita-carne-promo';
import MuitoQueijoPromo from './types/impl/muito-queijo-promo';



/**
 * @type {ItemPromo[]}
 */
const item_promos = [
	new MuitaCarnePromo('MUITA_CARNE_PROMO'),
	new MuitoQueijoPromo('MUITO_QUEIJO_PROMO')
];

/**
 * @type {ReceiptPromo[]}
 */
const receipt_promos = [
	new LightPromo('LIGHT_PROMO')
];



export default class PromoRoot{

	static async getAllPromosForItems(){
		return item_promos;
	}


	static async getAllPromosForReceipt(){
		return receipt_promos;
	}

}