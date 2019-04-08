import OrderReceiptVO from './order-receipt-vo';



export default class OrderReceiptVORoot{

	/**
	 * Generates an updated receipt for the given order
	 * @param {String} order_id The order ID
	 * @return {Promise<OrderReceiptVO>}
	 */
	static async generateReceipt(order_id){
		const data = await fetch(`/api/v1/orders/${order_id}/receipt`)
			.then(r => r.json());

		return data.receipt ? OrderReceiptVO.from(data.receipt) : null;
	}

}