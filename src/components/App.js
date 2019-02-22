import React from 'react';
import * as d3 from 'd3';
import Select from 'react-select';
import { Container, Row, Col } from 'react-bootstrap';
import Profile from './Profile';
import Intro from './Intro';
import MatchType from './MatchType';
import Graph from './Graph';
import Hightlights from './Highlights';
import Conclusion from './Conclusion';
import '../stylesheets/App.css';
import '../stylesheets/animate.css';

const opposition =  [
		{ value: 'All', label: 'All' },
		{ value: 'Australia', label: 'Australia' },
		{ value: 'Bangladesh', label: 'Bangaldesh' },
		{ value: 'Bermuda', label: 'Bermuda' },
		{ value: 'England', label: 'England' },
		{ value: 'Ireland', label: 'Ireland' },
		{ value: 'Kenya', label: 'Kenya' },
		{ value: 'Namibia', label: 'Namibia' },
		{ value: 'Netherlands', label: 'Netherlands' },
		{ value: 'New Zealand', label: 'New Zealand' },
		{ value: 'Pakistan', label: 'Pakistan' },
		{ value: 'South Africa', label: 'South Africa' },
		{ value: 'Sri Lanka', label: 'Sri Lanka' },
		{ value: 'U.A.E', label: 'U.A.E' },
		{ value: 'West Indies', label: 'West Indies' },
		{ value: 'Zimbabwe', 'label': 'Zimbabwe' }
	];

const	match_style = [
		{ value: 'bat', label: 'Batting' },
		{	value: 'bowl', label: 'Bowling' }
	];

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			filtered_data: [],
			selected_match: 'bat',
			team_name: 'All'
		};
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		let data = await d3.csv(`${process.env.PUBLIC_URL}/sachin.csv`);
		// data = data.slice(0, 200)
		this.setState({ data }, _ => this.displayGraph());
	}

	displayGraph() {
		let dataset = this.state.data;

		if(this.state.team_name !== 'All')
			dataset = dataset.filter(data => data['opposition'].slice(2) === this.state.team_name);

		this.setState({ filtered_data: dataset });

		// dataset = dataset.map(data => {
		// 		data['batting_score'] = (parseInt(data['batting_score'])) || NaN
		// 		data['wickets'] = (parseInt(data['wickets'])) || NaN
		// 		return data;
		// 	});

		const padding = 50;
		const width = 780;
		const	height = 400;

		const xScale = d3.scaleLinear()
			.domain([0, dataset.length])
			.range([padding, width - padding]);

		const yScale = d3.scaleLinear()
			.domain([0, d3.max(dataset, d => this.state.selected_match == 'bat'
				? ((parseInt(d['batting_score'])) || NaN)
				: ((parseInt(d['wickets'])) || NaN))])
			.range([height - padding, padding]);

		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);

		d3.select('svg').remove();
		d3.select('section').remove();

		const svg = d3.select('#graph')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		svg.selectAll('rect')
			.data(dataset)
			.enter()
			.append('rect')
			.attr('width', (width - 2 * padding) / dataset.length - 1)
			.attr('height', (d, i) => height - yScale(this.state.selected_match == 'bat'
				? ((parseInt(d['batting_score'])) || NaN)
				: ((parseInt(d['wickets'])) || NaN)) - padding)
			.attr('x', (d, i) => xScale(i))
			.attr('y', (d, i) => yScale(this.state.selected_match == 'bat'
				? ((parseInt(d['batting_score'])) || NaN)
				: ((parseInt(d['wickets'])) || NaN)))
			.attr('fill', d => {
				if(d['match_result'] == 'won') return '#538fd5';
				else if(d['match_result'] == 'lost') return '#1f487c';
				else return '#fab46b';
			})
			.attr('class', 'animated fadeInUp');

		svg.append('g')
			.attr('transform', `translate(0, ${height - padding})`)
			.call(xAxis);

		svg.append('text')
			.attr('transform', `translate(${width / 2}, ${height - 10})`)
			.style('text-anchor', 'middle')
			.text('Innings ->');

		svg.append('g')
			.attr('transform', `translate(${padding}, 0)`)
			.call(yAxis);

		svg.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 0)
			.attr('x', 0 - height / 2)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.text('Runs ->');

		const colors = [
				{ label: 'Won', color: '#538fd5' },
				{ label: 'Lost', color: '#1f487c' },
				{ label: 'N/R', color: '#fab46b' }
			];

		d3.select('#graph')
			.append('section')
			.selectAll('div')
			.data(colors)
			.enter()
			.append('div')
			// .style('width', '3em')
			.style('background-color', d => d.color)
			// .style('color', 'white')
			.attr('class', 'color-label')
			.text(d => d.label);

	}

	onSelect = event => {
		this.setState({
			team_name: event.value
		}, _ => this.displayGraph());
	}

	onChange = event => {
		this.setState({
			selected_match: event.target.value
		}, _ => this.displayGraph());
	}

  render() {
		const { data, filtered_data, selected_match, team_name } = this.state;
    return (
			<div>
				<Profile />
				<Intro />
				<Container>
					<Row className="justify-content-md-center">
						<Col xs md={5} xl={7}>
							<h2>Career</h2>
							<Select
								value={team_name}
								onChange={this.onSelect}
								options={opposition}
								isClearable={true}
								isSearchable={false}
								placeholder={team_name}
							/>
						</Col>
					</Row>
					<Row className="justify-content-md-center">
						<Col xs md={5} xl={7}>
							<MatchType
								match_style={match_style}
								selected_match={selected_match}
								onChange={this.onChange} />
						</Col>
					</Row>
				</Container>
				<Graph />
				<Hightlights dataset={filtered_data.length ? filtered_data: data} />
				<Conclusion />
			</div>
    );
  }
}

export default App;
