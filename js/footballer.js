import Human from './human.js';

export default class Footballer extends Human {
	
	constructor(firstName, lastName, position) {

		super(firstName, lastName);
		this.position = position;

	}

}