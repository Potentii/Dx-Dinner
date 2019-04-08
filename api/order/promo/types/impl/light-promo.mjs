import PromoResult  from '../../result/promo-result';
import ReceiptPromo from '../receipt-promo';
import ITEMS        from '../../../item/e-items';



export default class LightPromo extends ReceiptPromo{

	constructor(_id){
		super(_id, 'Light', `10% de desconto em lanches com alface e sem bacon`);
	}


	getResult(receipt){
		return new PromoResult(this, {
			discount: 0.1
		});
	}


	isEligible(receipt){
		return receipt.items.some(i => i.id === ITEMS.LETUCE) && !receipt.items.some(i => i.id === ITEMS.BACON);
	}
}