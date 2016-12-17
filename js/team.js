export default class Team {
	
	constructor(name) {

		this.name = name;
		this.footballers = [];

	}

	addFootballer(footballer) {

		this.footballers.push(footballer);

	}

}