import orders_endpoints from './order/endpoints'
import items_endpoints from './order/item/endpoints'
import receipt_endpoints from './order/receipt/endpoints'



export default function(router){
	orders_endpoints(router);
	items_endpoints(router);
	receipt_endpoints(router);
}
