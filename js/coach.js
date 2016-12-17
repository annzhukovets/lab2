import Human from './human.js';

export default class Coach extends Human {
	
	constructor(firstName, lastName, age) {

		super(firstName, lastName);
		this.age = age;

	}

}