import BOGOItemPromo from '../bogo-item-promo';
import ITEMS         from '../../../item/e-items';



export default class MuitoQueijoPromo extends BOGOItemPromo{

	constructor(_id){
		super(_id, 'Muito Queijo', `A cada 3 fatias de queijo, pague somente 2`, ITEMS.CHEESE, 3, 2);
	}

}