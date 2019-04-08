import OrderItem from '../../../api/order/item/order-item';



export default class OrderItemVO extends OrderItem{

	constructor(_id, name, price){
		super(_id, name, price);
	}

	static from(obj){
		return new OrderItemVO(
			obj._id,
			obj.name,
			obj.price
		);
	}

}