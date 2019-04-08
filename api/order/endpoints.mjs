import OrderRoot     from './order-root';
import OrderItemRoot from './item/order-item-root';
import Order         from './order';



async function getById(req, res, next){
	const order = await OrderRoot.getById(req.params.order_id);

	res.status(200)
		.json({ order: order });
}



async function getAllPrePicked(req, res, next){
	const orders = await OrderRoot.getAllPrePicked();

	res.status(200)
		.json({ orders: orders });
}



async function create(req, res, next){
	const order = Order.from(req.body.order);

	await OrderRoot.add(order);

	res.status(201)
		.json({ order: order });
}



async function update(req, res, next){
	const order = await OrderRoot.getById(req.params.order_id);
	const new_order = Order.from(req.body.order);

	order.name = new_order.name;
	order.items = new_order.items;

	res.status(201)
		.json({ order: order });
}



async function addItem(req, res, next){
	const item = await OrderItemRoot.getById(req.params.item_id);
	const order = await OrderRoot.getById(req.params.order_id);

	await order.addItem(item);

	res.status(201)
		.json({ order: order });
}



async function removeItem(req, res, next){
	const item = await OrderItemRoot.getById(req.params.item_id);
	const order = await OrderRoot.getById(req.params.order_id);

	await order.removeItem(item);

	res.status(200)
		.json({ order: order });
}



export default function(router){
	router.post('/api/v1/orders', create);
	router.put('/api/v1/orders/:order_id', update);
	router.post('/api/v1/orders/:order_id/items/:item_id', addItem);
	router.delete('/api/v1/orders/:order_id/items/:item_id', removeItem);
	router.get('/api/v1/orders/prepicked', getAllPrePicked);
}
