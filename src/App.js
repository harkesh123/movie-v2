import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Search from "./search.js"
import './App.css';



class App extends Component {
  constructor(){
    super();
    this.state={
      nt:{}
    }
     fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=b257b1d411526ff70ffd8d66bbfdfe8a")
    .then(res=>{ return res.json()})
    .then(da=>{ console.log(da.results);
      this.setState({nt:da.results})})
  }

  
  render() {
    return (
    
    <div> 
    <div className="logo ph5-l ">
    <img alt="phots"  src="./logo.png" width="125px" height="125px" />
    <header className="bg-black-90  App-header ph7-l ">
    <nav className="f6 fw6 ttu nag">
    <a className="link grow orange dib mr3 ph4-l" href="/">Home</a>
    <a className="link grow orange dib mr3 ph4-l" href="/under">About</a>
    <a className="link grow orange dib mr4 ph4-l "href="/under" >Store</a>
    <a className="link grow orange dib  ph4-l" href="/under">Contact</a>
  </nav>
       </header>
       </div>
       <div className="" >
       <div class="banner article" >
  <div class=" mw8 center pa3 br2-ns orange " > 
      <div class="cf">
        <Search  />
      </div>
  </div>
</div>
</div>
<Router>
       <div className="article" >
       <div className="ba " >
       <Route exact path="/" render={(routerProps) => { return(
          <List nlist={this.state.nt}   />);
          }}/>
       <Route exact path="/under" render={(routerProps) => { return(
          <h1>UNDER CONSTRUCTION</h1>);
          }}/>   
        <Route path="/m=:Name" component={search}  />
       </div>
       </div>
      </Router>
      </div>
    );
  }
}

const List=(nlist)=>{
   if(nlist.nlist.length>1){
    var ntt=[];
    var ntt1=[];
    for(let i=0;i<10;i++){
    ntt.push(nlist.nlist[i])
   }
   for(let i=10;i<20;i++){
    ntt1.push(nlist.nlist[i])
   }
     return(
     <article>
  <div class="cf pa2">
    {ntt.map((d,i)=> {return <div className="fl w-40 w-20-m w-20-l pa1" key={ntt.id} >
      <a  class="db link grow tc" href={"/m="+ntt[i].id} onClick={event=>{console.log(ntt[i].title)}} >
        <img src={"https://image.tmdb.org/t/p/original"+ntt[i].poster_path} alt="Poster" class="w-110 db outline black-10"/>
        </a>
        <dl class="mt2 f6 lh-copy tc">
          <dt class="clip">Title</dt>
          <dd class="ml1 black truncate w-100">{ntt[i].title}</dd>
          <dt class="clip">Rating</dt>
          <dd class="ml1 gray truncate w-100">{ntt[i].vote_average}/10</dd>
        </dl>
    </div>})}
    </div>
    <div class="cf pa2">
    {ntt1.map((d,i)=> {return <div className="fl w-40 w-20-m w-20-l pa1" key={ntt1.id} >
      <a  class="db link grow tc" href={"/m="+ntt1[i].id} onClick={event=>{console.log(ntt1[i].title)}} >
        <img src={"https://image.tmdb.org/t/p/original"+ntt1[i].poster_path} alt="Frank Ocean Blonde Album Cover" class="w-110 db outline black-10"/>
        </a>
        <dl class="mt2 f6 lh-copy tc">
          <dt class="clip">Title</dt>
          <dd class="ml1 black truncate w-100">{ntt1[i].title}</dd>
          <dt class="clip">Rating</dt>
          <dd class="ml1 gray truncate w-100">{ntt1[i].vote_average}/10</dd>
        </dl>
    </div>})}
    </div>
    </article>
    );
   }
   else{
    return(
      <p>loading.....</p>);
   }

}
  

class search extends Component{
  constructor(props){
    super(props);

    this.state = {
      movie: '',
      suggestions: []
    };    
  }
  componentDidMount=()=>{
     
   
  fetch("https://api.themoviedb.org/3/movie/"+this.props.match.params.Name+"?api_key=b257b1d411526ff70ffd8d66bbfdfe8a&append_to_response=videos")
  .then(res=>{return res.json()})
  .then(data=>{
    this.setState({movie:data})
    })
}
  

  render(){
    
    if(this.state.movie){
  const img='url(https://image.tmdb.org/t/p/original/'+this.state.movie.backdrop_path+')'
  console.log(this.state.movie)
  
    return(
      <div className="black " >
    <article class="cf  ph5-ns pv5 ph4-l" id="banner"  >
  <header class="fn fl-ns w-50-ns pr4-ns">

   <img src={"https://image.tmdb.org/t/p/original/"+this.state.movie.poster_path} width="400px" height="700px" alt="poster"/>
  </header>
  <h1 class="mb3 mt3 lh-title">{this.state.movie.title}</h1>
  <div class="fn fl-ns w-50-ns  " id="nop" style={{}} >
    <p class="lh-copy measure mt6 mt0-ns " style={{fontSize:"30px"}}>
      {this.state.movie.overview}
    </p>
    <p class="lh-copy measure">
    <a style={{paddingLeft:"25px"}} style={{fontSize:"25px"}} >Ratings:{this.state.movie.vote_average}</a>
    </p>
  </div>
</article>
</div>
  );}
  else{
    return(<a>loading....</a>);
  }
}
}


export default App;
