import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import { useState, useEffect } from 'react';
import * as d3 from 'd3'


//color pallete is
//Lemon Meringue: #f1e8b8
//Yellow Crayola: #f9e784
//Eerie Black: #191919
//Flame: #dd6031
//Space Cadet: #1f2041



class Page extends React.Component{


	constructor(props) {    
	  super(props);    
	}

	//getting initial data
	componentDidMount() {
		fetch('/bakes')
					.then(response => response.json())
					.then(data => this.setState(data))
					.then(ans => console.log(this.state));
	}

	callbackFunction = (updatedData) => {this.setState(updatedData)};
	

	render(){

			const mapTitlesToState = {      
					"Amount of Flour (grams)": "gramsFlour",
					"Amount of Water (grams)": "gramsWater",
					"Amount of Sourdough Starter (grams)": "gramsStarter",
					"Number of Stretch and Folds": "numStretchFold",
					"Autolyse Time (minutes)": "autolyseTime",
					"Bulk Fermentation Time (minutes)": "bulkFermentTime",
					"Bake Time (minutes)": "bakeTime",
					"Overall Quality": "overallQuality",
					"Rise": "rise",
					"Crumb": "crumb",
					"Crust": "crust", 
					"Flavor":"flavor"    
	  };
		return(

		
			<div className="App"> 
				<OpenForm />
				{this.state && 
				<Graph data={this.state} mapTitlesToState = {mapTitlesToState}/>
			}
				<Form parentCallback = {this.callbackFunction} mapTitlesToState = {mapTitlesToState}/>
				
			</div> 
		)
	}
}

class OpenForm extends React.Component{

	showForm(){
		document.getElementById("form").style.display = "block";
	}
	render(){
	return(
		<div className = "openForm" onClick = {() => this.showForm()}>
			 <div className = "plus"> + </div> 
			 <div className = "buttonName"> I Made Bread </div>
		</div>
	)
	}	
}

class Graph extends React.Component{

	constructor(props) {    
	  super(props);    

	  this.state = this.props.data;

	  console.log("in graph constructor")
	  console.log(this.state);
	}

	componentDidMount() {
		this.drawChart(this.state['bakes'])
	}

	getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}

	//d3 creating the actual chart
	drawChart(data){

		//these two values should be changed by user selecting from dropdown
		const xAxisVal = 'autolyseTime'
		const yAxisVal = 'overallQuality'
		const xAxisTitle = this.getKeyByValue(this.props.mapTitlesToState, xAxisVal)
		const yAxisTitle = this.getKeyByValue(this.props.mapTitlesToState, yAxisVal)

		var margin = {top: 10, right: 30, bottom: 30, left: 60},
		width = 460 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;


		//setting up canvas
		var svg = d3.select(this.refs.canvas)
					  .append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					  .append("g")
						.attr("transform",
							  "translate(" + margin.left + "," + margin.top + ")")

		// Add X axis
		var x = d3.scaleLinear()
					.domain([0, 100])
					.range([ 0, width ]);
				  svg.append("g")
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x));

		  // Add Y axis
		var y = d3.scaleLinear()
					.domain([0, 100])
					.range([ height, 0]);
				  svg.append("g")
					.call(d3.axisLeft(y));



		// Add X axis label:
  svg.append("text")
	  .attr("text-anchor", "end")
	  .attr("x", width/2 + margin.left)
	  .attr("y", height + margin.top + 20)
	  .text(xAxisTitle);

  // Y axis label:
  svg.append("text")
	  .attr("text-anchor", "end")
	  .attr("transform", "rotate(-90)")
	  .attr("y", -margin.left + 20)
	  .attr("x", -margin.top - height/2 + 20)
	  .text(yAxisTitle)

		  // Add dots
		  svg.append('g')
			.selectAll("dot")
			.data(data)
			.enter()
			.append("circle")
			  .attr("cx", function (d) { return x(d[xAxisVal]); } )
			  .attr("cy", function (d) { return y(d[yAxisVal]); } )
			  .attr("r", 4)
			  .style("fill", "#1f2041");

		




	}

	render(){

		return <div ref="canvas"></div>
	}
}

class Form extends React.Component{

	constructor(props) {    
	  super(props);    
	  this.state = {      
					"gramsFlour": null,
					"gramsWater": null,
					"gramsStarter": null,
					"numStretchFold": null,
					"autolyseTime": null,
					"bulkFermentTime": null,
					"bakeTime": null,
					"overallQuality": null, 
					"rise": null,
					"crumb": null,
					"crust": null, 
					"flavor": null    
	  };  
	}

	submitForm(){
		console.log("submitting form")
		this.sendData()
		this.hideForm()

		//passing the state data up to the Page
		this.props.parentCallback(this.state)
	
	}

	cancelForm(){
		this.setState({      
					"gramsFlour": null,
					"gramsWater": null,
					"gramsStarter": null,
					"numStretchFold": null,
					"autolyseTime": null,
					"bulkFermentTime": null,
					"bakeTime": null,
					"overallQuality": null, 
					"rise": null,
					"crumb": null,
					"crust": null, 
					"flavor": null    
		});
		this.hideForm();

	}

	sendData(){
		console.log("in send data")
		const data = this.state
		fetch("/bakes", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify(data)
			})
	}

	hideForm(){
		document.getElementById("form").reset();
		document.getElementById("form").style.display = "none";
		
	}

	 myChangeHandler = (event) => {
	 let nam =  event.target.name;
	 let val = event.target.value;
	 this.setState({[nam]: val});
  }

	render(){
		const processFormEntryTitles = ["Amount of Flour (grams)", "Amount of Water (grams)", "Amount of Sourdough Starter (grams)",
								 "Number of Stretch and Folds", "Autolyse Time (minutes)", "Bulk Fermentation Time (minutes)", "Bake Time (minutes)",
								 ]
		const resultsFormEntryTitles = ["Overall Quality", "Rise", "Crumb", "Crust", "Flavor"]

		// const mapTitlesToState = {      
		// 			"Amount of Flour (grams)": "gramsFlour",
		// 			"Amount of Water (grams)": "gramsWater",
		// 			"Amount of Sourdough Starter (grams)": "gramsStarter",
		// 			"Number of Stretch and Folds": "numStretchFold",
		// 			"Autolyse Time (minutes)": "autolyseTime",
		// 			"Bulk Fermentation Time (minutes)": "bulkFermentTime",
		// 			"Bake Time (minutes)": "bakeTime",
		// 			"Overall Quality": "overallQuality",
		// 			"Rise": "rise",
		// 			"Crumb": "crumb",
		// 			"Crust": "crust", 
		// 			"Flavor":"flavor"    
	 //  }

		const processFormEntries = processFormEntryTitles.map( x =>
		{
			return <ProcessFormEntry title = {x} key = {x} name ={this.props.mapTitlesToState[x]} onChange = {this.myChangeHandler}/>; 
		});

		const resultsFormEntries = resultsFormEntryTitles.map( x =>
		{
			return <ResultsFormEntry title = {x} key = {x} name = {this.props.mapTitlesToState[x]} onChange = {this.myChangeHandler}/>; 
		});

		return(
			<form id = "form">
				<div className = "formHeader"> Tell Us About Your Process... </div>
				{processFormEntries}
				<div className = "formHeader"> And Your Results </div>
				{resultsFormEntries}

				<div>
					<button onClick = {() => this.submitForm()}> Submit </button>
					<button onClick = {() => this.hideForm()}> Cancel </button>
				</div>
 
			</form> 
		)
	}
}

class ProcessFormEntry extends React.Component{
	render(){
		return(
			<div className = "entry">
				<div> {this.props.title} </div>
				<input type="text" name = {this.props.name} onChange = {(x) => this.props.onChange(x)}></input> 
			</div>
		)
	}
}

class ResultsFormEntry extends React.Component{
	render(){
		return(
			<div className = "entry">
				<div> {this.props.title} </div>
				<input type="range" name = {this.props.name} onChange = {(x) => this.props.onChange(x)}></input>
			</div>
		)
	}
}


ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
