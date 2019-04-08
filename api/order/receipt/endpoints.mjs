import OrderRoot from '../order-root';



async function generateForOrder(req, res, next){
	const order = await OrderRoot.getById(req.params.order_id);

	const receipt = await order.generateReceipt();

	res.status(200)
		.json({ receipt: receipt });
}



export default function(router){
	router.get('/api/v1/orders/:order_id/receipt', generateForOrder);
}
