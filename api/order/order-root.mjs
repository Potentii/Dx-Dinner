import ITEMS             from './item/e-items';
import PRE_PICKED_ORDERS from './e-pre-picked-orders';
import Order             from './order';
import OrderItemRoot     from './item/order-item-root';
import uuid              from 'uuid';


const orders = [];


export default class OrderRoot{

	/**
	 *
	 * @return {Promise<Order[]>}
	 */
	static async getAllPrePicked(){
		return [
			new Order(PRE_PICKED_ORDERS.X_BACON, 'X-Bacon', [
				await OrderItemRoot.getById(ITEMS.BACON),
				await OrderItemRoot.getById(ITEMS.HAMBURGER),
				await OrderItemRoot.getById(ITEMS.CHEESE),
			]),
			new Order(PRE_PICKED_ORDERS.X_BURGER, 'X-Burger', [
				await OrderItemRoot.getById(ITEMS.HAMBURGER),
				await OrderItemRoot.getById(ITEMS.CHEESE),
			]),
			new Order(PRE_PICKED_ORDERS.X_EGG, 'X-Egg', [
				await OrderItemRoot.getById(ITEMS.EGG),
				await OrderItemRoot.getById(ITEMS.HAMBURGER),
				await OrderItemRoot.getById(ITEMS.CHEESE),
			]),
			new Order(PRE_PICKED_ORDERS.X_EGG_BACON, 'X-Egg Bacon', [
				await OrderItemRoot.getById(ITEMS.EGG),
				await OrderItemRoot.getById(ITEMS.BACON),
				await OrderItemRoot.getById(ITEMS.HAMBURGER),
				await OrderItemRoot.getById(ITEMS.CHEESE),
			])
		];
	}


	/**
	 *
	 * @param {String} id
	 * @return {Promise<Order>}
	 */
	static async getPrePickedById(id){
		return (await OrderRoot.getAllPrePicked()).find(o => o.id === id);
	}


	/**
	 *
	 * @return {Promise<Order[]>}
	 */
	static async getAll(){
		return orders;
	}


	/**
	 *
	 * @param {String} id
	 * @return {Promise<Order>}
	 */
	static async getById(id){
		return (await OrderRoot.getAll()).find(o => o.id === id);
	}


	static async add(order){
		if(!order._id)
			order._id = uuid.v4();

		orders.push(order);

		return order;
	}

}