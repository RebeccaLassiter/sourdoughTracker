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



function Page(){

	//here we will pull data from db and pass it to the Graph as props
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
	fetch('/space').then(res => res.json()).then(data => {
	  setCurrentTime(data.time);
	});
	}, []);


  
    return(
    	<div className="App"> 
    		<OpenForm />
    		<Graph time ={currentTime}/>
    		<Form />
    		
    	</div> 
    )
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
  render(){
 
	
	const currentTime = "hi"
    return (
        <div className="graph">
          <p>
            Graph of Your Data Here and Data from flask: {this.props.time}
          </p>
          
        </div>
    );
  }
}

class Form extends React.Component{

	hideForm(){
		document.getElementById("form").style.display = "none";
	}

	render(){
		const processFormEntryTitles = ["Amount of Flour (grams)", "Amount of Water (grams)", "Amount of Sourdough Starter (grams)",
							     "Number of Stretch and Folds", "Autolyse Time (minutes)", "Bulk Fermentation Time (minutes)", "Bake Time (minutes)",
							     ]
		const resultsFormEntryTitles = ["Overall Quality", "Rise", "Crumb", "Crust", "Flavor"]

		const processFormEntries = processFormEntryTitles.map( x =>
		{
			return <ProcessFormEntry title = {x} key = {x} />; 
		});

		const resultsFormEntries = resultsFormEntryTitles.map( x =>
		{
			return <ResultsFormEntry title = {x} key = {x} />; 
		});

		return(
			<div id = "form">
				<div className = "formHeader"> Tell Us About Your Process... </div>
				{processFormEntries}
				<div className = "formHeader"> And Your Results </div>
				{resultsFormEntries}

				<div>
					<button> Submit </button>
					<button onClick = {() => this.hideForm()}> Cancel </button>
				</div>
 
			</div> 
		)
	}
}

class ProcessFormEntry extends React.Component{
	render(){
		return(
			<div className = "entry">
				<div> {this.props.title} </div>
				<input type="text"></input>
			</div>
		)
	}
}

class ResultsFormEntry extends React.Component{
	render(){
		return(
			<div className = "entry">
				<div> {this.props.title} </div>
				<input type="range"></input>
			</div>
		)
	}
}


ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
