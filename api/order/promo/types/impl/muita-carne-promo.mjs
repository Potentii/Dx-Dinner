import BOGOItemPromo from '../bogo-item-promo';
import ITEMS         from '../../../item/e-items';



export default class MuitaCarnePromo extends BOGOItemPromo{

	constructor(_id){
		super(_id, 'Muita Carne', `A cada 3 hamburgers, pague somente 2`, ITEMS.HAMBURGER, 3, 2);
	}

}