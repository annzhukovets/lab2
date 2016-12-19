import Footballer from './footballer.js';
import Coach from './coach.js';
import Team from './team.js';
import $ from 'jquery';

$().ready(function() {

	let currentTeam = new Team();
	let teams = [];

	function addFootballersToHtml(team, footballers, tag) {

		tag.empty();

		footballers.forEach((footballer) => {

			tag.append(createFootballerTag(team, footballer));
		});

	}

	function createFootballerTag(team, footballer) {

		let footballerTag = $('<div class="footballer"></div>');
		let text = $('<span></span>').text(footballer.fullName + ": " + footballer.position);
		footballerTag.append(text);
		let deleteTag = $('<button type="button" class="btn btn-danger btn-sm" />')
			.append($('<span class="glyphicon glyphicon-remove">')).click((handler) => {
			team.footballers.splice(team.footballers.indexOf(footballer), 1);
			addFootballersToHtml(team, team.footballers, footballerTag.parent());
		});
		footballerTag.append(deleteTag);
		let editBlock = $('<div class="form-group"></div>').css('display', 'none');
		let editFirstName = $('<input type="text" />');
		editBlock.append(editFirstName);
		let editLastName = $('<input type="text" />');
		editBlock.append(editLastName);
		let editPosition = $('<input type="text" />');
		editBlock.append(editPosition);
		let applyButton = $('<button type="button" class="btn btn-success btn-sm" />')
			.append($('<span class="glyphicon glyphicon-ok">')).click((handler) => {
			footballer.firstName = editFirstName.val();
			footballer.lastName = editLastName.val();
			footballer.position = editPosition.val();
			addFootballersToHtml(team, team.footballers, footballerTag.parent());
		});
		editBlock.append(applyButton);
		let editTag = $('<button type="button" class="btn btn-warning btn-sm" />')
			.append($('<span class="glyphicon glyphicon-pencil">')).click((handler) => {
			editBlock.css('display', 'block');
			editFirstName.val(footballer.firstName);
			editLastName.val(footballer.lastName);
			editPosition.val(footballer.position);
			text.css('display', 'none');
			editTag.css('display', 'none');
			deleteTag.css('display', 'none');
		});
		footballerTag.append(editTag);
		footballerTag.append(editBlock);
		return footballerTag;
	}

	function createCoachTag(coach) {

		let coachTag = $('<div class="coach"></div>');
		let text = $('<span></span>').text(coach.fullName + ": " + coach.age);
		coachTag.append(text);
		let editBlock = $('<div></div>').css('display', 'none');
		let editFirstName = $('<input type="text" />');
		editBlock.append(editFirstName);
		let editLastName = $('<input type="text" />');
		editBlock.append(editLastName);
		let editAge = $('<input type="number" />');
		editBlock.append(editAge);
		let applyButton = $('<button type="button" class="btn btn-success btn-sm" />')
			.append($('<span class="glyphicon glyphicon-ok">')).click((handler) => {
			coach.firstName = editFirstName.val();
			coach.lastName = editLastName.val();
			coach.age = editAge.val();
			coachTag.parent().html(createCoachTag(coach));
		});
		editBlock.append(applyButton);
		let editTag = $('<button type="button" class="btn btn-warning btn-sm" />')
			.append($('<span class="glyphicon glyphicon-pencil">')).click((handler) => {
			editBlock.css('display', 'block');
			editFirstName.val(coach.firstName);
			editLastName.val(coach.lastName);
			editAge.val(coach.age);
			text.css('display', 'none');
			editTag.css('display', 'none');
		});
		coachTag.append(editTag);
		coachTag.append(editBlock);
		return coachTag;
	}

	function createTeamNameTag(team) {

		let teamNameTag = $('<h4 class="teamName"></h4>')
			.append($('<span></span>').text(team.name))
			.append($('<button type="button" class="btn btn-danger btn-sm" />')
			.append($('<span class="glyphicon glyphicon-remove">')).click((handler) => {
				teams.splice(teams.indexOf(team), 1);
				teamNameTag.parent().remove();
			}));
		return teamNameTag;
	}

	$('#add_footballer').click((handler) => {

		let footballer = new Footballer($('#footballer_first_name').val(), $('#footballer_second_name').val(), $('#footballer_position').val());
		$('#footballer_first_name').val("");
		$('#footballer_second_name').val("");
		$('#footballer_position').val("");
		currentTeam.addFootballer(footballer);
		$('#current_footballers').append(createFootballerTag(currentTeam, footballer));

	});

	$('#add_coach').click((handler) => {

		let coach = new Coach($('#coach_first_name').val(), $('#coach_second_name').val(), $('#coach_age').val());
		$('#coach_first_name').val("");
		$('#coach_second_name').val("");
		$('#coach_age').val("");
		$('#inputs_coach').css('display', 'none');
		currentTeam.coach = coach;
		$('#current_coach').html(createCoachTag(coach));

	});

	$('#add_team').click((handler) => {
		currentTeam.name = $('#team_name').val();
		$('#team_name').val("");
		$('#current_footballers').empty();
		$('#current_coach').empty();
		$('#inputs_coach').css('display', 'block');
		addTeamToHtml(currentTeam);
		currentTeam = new Team();
	});

	function addTeamToHtml(team) {
		let teamNameTag = createTeamNameTag(team);
		let coachNameTag = $('<div class="coach-wrapper"></div>').html(createCoachTag(team.coach));
		let footballers =  $('<div class="footballers"></div>');
		team.footballers.forEach((footballer) => {
			let footballerTag = createFootballerTag(team, footballer);
			footballers.append(footballerTag);
		});
		let teamTag = $('<div class="team">')
			.append(teamNameTag)
			.append(coachNameTag)
			.append(footballers);
		$('#teams_list')
			.append(teamTag);
			
	}

	$.ajax({
		type: "GET",
		url: "../data/team.json",
		success: (data) => {
			let team = new Team(data.team.name);
			team.coach = new Coach(data.team.coach.firstName, data.team.coach.lastName, data.team.coach.age);
			data.team.footballers.forEach((footballer) => {

				let footb = new Footballer(footballer.firstName, footballer.lastName, footballer.position);
				team.addFootballer(footb);
			});
			addTeamToHtml(team, teams.length);
			teams.push(team);
		},
		error: (err) => {console.log(err)}
	});
});