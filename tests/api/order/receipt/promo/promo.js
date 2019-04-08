import OrderItemRoot from '../../../../../api/order/item/order-item-root';
import ITEMS         from '../../../../../api/order/item/e-items';
import Order         from '../../../../../api/order/order';



const expect = require('chai').expect;



describe('Promo', async function(){

	it(`Should calc the price of orders with 'Light' promo`, async function(){
		const items = [
			await OrderItemRoot.getById(ITEMS.HAMBURGER),
			await OrderItemRoot.getById(ITEMS.HAMBURGER),
			await OrderItemRoot.getById(ITEMS.CHEESE),
			await OrderItemRoot.getById(ITEMS.LETUCE),
		];

		const order = new Order('1');

		for(let item of items)
			await order.addItem(item);

		const receipt = await order.generateReceipt();

		const expected_total = items.reduce((tot, item) => tot + item.price, 0) * 0.9;

		expect(receipt.price.total).to.equals(expected_total);
	});


	it(`Should calc the price of orders with 'Muita Carne' promo`, async function(){
		const hamburger = await OrderItemRoot.getById(ITEMS.HAMBURGER);

		const items = [
			await OrderItemRoot.getById(ITEMS.CHEESE),
			await OrderItemRoot.getById(ITEMS.CHEESE),
			hamburger,
			hamburger,
			hamburger,
			hamburger,
			hamburger,
			hamburger,
			hamburger,
		];

		const order = new Order('1');

		for(let item of items)
			await order.addItem(item);

		const receipt = await order.generateReceipt();

		const expected_total = items.reduce((tot, item) => tot + item.price, 0) - (hamburger.price * 2);

		expect(receipt.price.total).to.equals(expected_total);
	});


	it(`Should calc the price of orders with 'Muito Queijo' promo`, async function(){
		const cheese = await OrderItemRoot.getById(ITEMS.CHEESE);

		const items = [
			await OrderItemRoot.getById(ITEMS.HAMBURGER),
			await OrderItemRoot.getById(ITEMS.HAMBURGER),
			cheese,
			cheese,
			cheese,
			cheese,
			cheese,
			cheese,
			cheese,
		];

		const order = new Order('1');

		for(let item of items)
			await order.addItem(item);

		const receipt = await order.generateReceipt();

		const expected_total = items.reduce((tot, item) => tot + item.price, 0) - (cheese.price * 2);

		expect(receipt.price.total).to.equals(expected_total);
	});

});