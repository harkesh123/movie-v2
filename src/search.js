import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import "./search.css"
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
var list;
var id;

function getinput(value){
fetch("https://api.themoviedb.org/3/search/movie?api_key=b257b1d411526ff70ffd8d66bbfdfe8a&query="+value)
.then(res=>{return res.json()})
.then(data=>{ list=data.results})
}

function getSuggestions(value) {
  
  if(list.length>1){
  const list1=[list[0],list[1],list[2],list[3],list[4]]
  return list1.filter(person => {return getSuggestionValue(person)});
}
  else{
    
    return [];
  }
}

function getSuggestionValue(suggestion) {
  id=suggestion.id  
  return `${suggestion.title} `;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.title} `;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);
  const img='url(https://image.tmdb.org/t/p/original'+suggestion.poster_path+')' ;

  return (
    
    <span className='suggestion-content ' id="Search" style={{backgroundImage:img, backgroundSize:"35px"}} >
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
              
            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    
    </span>

  );

}

class Search extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    if(newValue){
    getinput(newValue)
  }
    this.setState({
      value: newValue
    });
  };
   
   change=()=>{
    if(id){
    window.location.replace("/m="+id);
   }
   }
  onSuggestionsFetchRequested = ({ value }) => {
    if(list){
    this.setState({
      suggestions: getSuggestions(value)
    });

  }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
    this.change();
    console.log(this.state.value,id)
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Movie Name",
      value,
      onChange: this.onChange
    };
    
    return (
      <div style={{display:"inline-flex"}} >
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
       <a class="f6 link grow ph4 pv3 mb2 dib black bg-orange" onClick={this.change}  >Search</a>
      </div>
    );
  }
}

export default Search;