import OrderVO from './order-vo';



export default class OrderVORoot{

	/**
	 * Retrieves all the prepicked orders
	 * @return {Promise<OrderVO[]>} The found prepicked orders
	 */
	static async getAllPrePicked(){
		const data = await fetch(`/api/v1/orders/prepicked`)
			.then(r => r.json());

		return data.orders.map(OrderVO.from);
	}


	/**
	 *	Retrieves a created order by its ID
	 * @param {String} id The order ID
	 * @return {Promise<OrderVO>} The found order, or null if it cannot be found
	 */
	static async getById(id){
		const data = await fetch(`/api/v1/orders/${id}`)
			.then(r => r.json());

		return data.order ? OrderVO.from(data.order) : null;
	}


	/**
	 * Adds a new item in the given order
	 * @param {String} order_id The order ID
	 * @param {String} item_id The item ID
	 * @return {Promise<OrderVO>} The updated order
	 */
	static async addItem(order_id, item_id){
		const data = await fetch(`/api/v1/orders/${order_id}/items/${item_id}`,
			{ method: 'POST' })
			.then(r => r.json());

		return OrderVO.from(data.order);
	}


	/**
	 * Removes a item from the given order
	 * @param {String} order_id The order ID
	 * @param {String} item_id The item ID
	 * @return {Promise<OrderVO>} The updated order
	 */
	static async removeItem(order_id, item_id){
		const data = await fetch(`/api/v1/orders/${order_id}/items/${item_id}`,
			{ method: 'DELETE' })
			.then(r => r.json());

		return OrderVO.from(data.order);
	}


	/**
	 * Saves the order on server
	 * @param {OrderVO} order The order to be saved
	 * @return {Promise<OrderVO>} The saved order object
	 */
	static async save(order){
		if(!order._id)
			return OrderVORoot.add(order);

		const data = await fetch(`/api/v1/orders/${order._id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ order: order })
			})
			.then(r => r.json());

		return OrderVO.from(data.order);
	}


	/**
	 * Creates a new order on server
	 * @param {OrderVO} order The order to be created
	 * @return {Promise<OrderVO>} The created order object
	 */
	static async add(order){
		const data = await fetch(`/api/v1/orders`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ order: order })
			})
			.then(r => r.json());

		return OrderVO.from(data.order);
	}

}