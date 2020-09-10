import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import { useState, useEffect } from 'react';


//color pallete is
//Lemon Meringue: #f1e8b8
//Yellow Crayola: #f9e784
//Eerie Black: #191919
//Flame: #dd6031
//Space Cadet: #1f2041



class Page extends React.Component{

	render(){
		return(
			<div className="App"> 
				<OpenForm />
				<Graph />
				<Form />
				
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
	  this.state = {      
		bakes: null    
	  };  
	}

	render(){

		fetch('/bakes')
					.then(response => response.json())
					.then(data => this.setState(data));

		const myData = this.state['bakes']

		//need this if else if the fetch fails for some reason
		if(myData){
			return(
					<div className="graph">
				  <p>
					Graph of Your Data Here and Data from flask: {myData[0]['autolyseTime']}
				  </p>
				  
				</div>
				);
		}
		else{
			return (
					<div className="graph">
				  <p>
					Graph of Your Data Here and Data from flask:
				  </p>
				  
				</div>
				);
		}
		
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
	  }

		const processFormEntries = processFormEntryTitles.map( x =>
		{
			return <ProcessFormEntry title = {x} key = {x} name ={mapTitlesToState[x]} onChange = {this.myChangeHandler}/>; 
		});

		const resultsFormEntries = resultsFormEntryTitles.map( x =>
		{
			return <ResultsFormEntry title = {x} key = {x} name = {mapTitlesToState[x]} onChange = {this.myChangeHandler}/>; 
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
