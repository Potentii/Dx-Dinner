import ITEMS         from '../../../../api/order/item/e-items';
import Order         from '../../../../api/order/order';
import OrderItemRoot from '../../../../api/order/item/order-item-root';
import OrderRoot     from '../../../../api/order/order-root';
const expect = require('chai').expect;



describe('Receipt', async function(){

	it(`Should calc the price of custom orders`, async function(){
		const items = [
			await OrderItemRoot.getById(ITEMS.HAMBURGER),
			await OrderItemRoot.getById(ITEMS.HAMBURGER),
			await OrderItemRoot.getById(ITEMS.CHEESE),
			await OrderItemRoot.getById(ITEMS.BACON),
		];

		const order = new Order('1');

		for(let item of items)
			await order.addItem(item);

		const receipt = await order.generateReceipt();

		const expected_total = items.reduce((tot, item) => tot + item.price, 0);

		expect(receipt.price.total).to.equals(expected_total);
	});


	it(`Should calc the price of pre-picked orders`, async function(){
		const pre_picked_orders = await OrderRoot.getAllPrePicked();

		for(let order of pre_picked_orders){
			const receipt = await order.generateReceipt();

			const expected_total = order.items.reduce((tot, item) => tot + item.price, 0);

			expect(receipt.price.total).to.equals(expected_total);
		}

	});


	require('./promo/promo');

});