import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';


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
		console.log("showing form")
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
    return (
        <div className="graph">
          <p>
            Graph of Your Data Here
          </p>
          
        </div>
    );
  }
}

class Form extends React.Component{

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
				<div class = "formHeader"> Tell Us About Your Process... </div>
				{processFormEntries}
				<div class = "formHeader"> And Your Results </div>
				{resultsFormEntries}
 
			</div> 
		)
	}
}

class ProcessFormEntry extends React.Component{
	render(){
		return(
			<div class = "entry">
				<div> {this.props.title} </div>
				<input type="text"></input>
			</div>
		)
	}
}

class ResultsFormEntry extends React.Component{
	render(){
		return(
			<div class = "entry">
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
