import OrderItemVO from './order-item-vo';



export default class OrderItemVORoot{

	/**
	 *
	 * @return {Promise<OrderItemVO[]>}
	 */
	static async getAll(){
		const data = await fetch(`/api/v1/items`)
				.then(r => r.json());

		return data.items.map(OrderItemVO.from);
	}


	/**
	 *
	 * @param {String} id
	 * @return {Promise<OrderItemVO>}
	 */
	static async getById(id){
		const data = await fetch(`/api/v1/items/${id}`)
				.then(r => r.json());

		return OrderItemVO.from(data.item);
	}

}