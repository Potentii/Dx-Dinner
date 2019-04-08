import OrderItem from './order-item';
import ITEMS     from './e-items';



/**
 * @type {OrderItem[]}
 */
const items = [
	new OrderItem(ITEMS.HAMBURGER, 'Hamburger', 3),
	new OrderItem(ITEMS.CHEESE, 'Queijo', 1.5),
	new OrderItem(ITEMS.LETUCE, 'Alface', 0.4),
	new OrderItem(ITEMS.BACON, 'Bacon', 2),
	new OrderItem(ITEMS.EGG, 'Ovo', 0.8),
];



export default class OrderItemRoot{

	/**
	 *
	 * @return {Promise<OrderItem[]>}
	 */
	static async getAll(){
		return items;
	}


	/**
	 *
	 * @param {String} id
	 * @return {Promise<OrderItem>}
	 */
	static async getById(id){
		return (await OrderItemRoot.getAll()).find(i => i.id === id);
	}

}