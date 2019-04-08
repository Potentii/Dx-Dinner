/**
 * @abstract
 */
export default class Promo{

	/**
	 * @constructor
	 * @param {String} _id
	 * @param {String} name
	 * @param {String} [description]
	 */
	constructor(_id, name, description){
		this._id = _id;
		this.name = name;
		this.description = description;
	}


	static from(obj){
		return new Promo(
			obj._id,
			obj.name,
			obj.description
		);
	}


	get id(){
		return '' + this._id;
	}

}