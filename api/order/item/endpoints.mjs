import OrderItemRoot from './order-item-root';



async function getById(req, res, next){
	const item = await OrderItemRoot.getById(req.params.item_id);

	res.status(200)
		.json({ item: item });
}



async function getAll(req, res, next){
	const items = await OrderItemRoot.getAll();

	res.status(200)
		.json({ items: items });
}



export default function(router){
	router.get('/api/v1/items', getAll);
	router.get('/api/v1/items/:item_id', getById);
}
