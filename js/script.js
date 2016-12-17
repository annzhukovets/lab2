import Footballer from './footballer.js';
import Coach from './coach.js';
import Team from './team.js';
import $ from 'jquery';

$().ready(function(){

	function addTeamToHtml(team) {
		let teamNameTag = $('<span class="teamName"></span>').text(team.name);
		let coachNameTag = $('<span class="coach"></span>').text(team.coach.fullName + ": " + team.coach.age);
		let footballers =  $('<ul class="footballers"></ul>');
		team.footballers.forEach((footballer) => {
			let footballerTag = $('<li class=footballer></li>').text(footballer.fullName + ": " + footballer.position);
			footballers.append(footballerTag);
		});
		console.log($('#teams_list'));
		$('#teams_list')
			.append($('<div class="team">'))
			.append(teamNameTag)
			.append(coachNameTag)
			.append(footballers);
	}

	let teams = [];

	$.ajax({
		type: "GET",
		url: "../data/team.json",
		success: (data) => {
			console.log(data);
			let team = new Team(data.team.name);
			team.coach = new Coach(data.team.coach.firstName, data.team.coach.lastName, data.team.coach.age);
			data.team.footballers.forEach((footballer) => {

				let footb = new Footballer(footballer.firstName, footballer.lastName, footballer.position);
				team.addFootballer(footb);
			});
			console.log(team);
			addTeamToHtml(team);
		},
		error: (err) => {console.log(err)}
	});

	console.log($("#d").text());
});