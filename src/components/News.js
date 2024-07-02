import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';

export class News extends Component {
  capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    console.log("cons");
    super(props);
    this.state={
      articles:[],
      loading: false,
      page:1,
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  
  
  updateNews= async ()=>
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b28615b016cf466caf6c37e60544e0ff&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    });
  };
  async componentDidMount()
  {
    console.log("did");
    this.updateNews();
  };

  handleNext= async ()=>{
    this.setState({
      page:this.state.page+1,
    })
    this.updateNews();
   };
  handlePrev= async ()=>{
    this.setState({
      page:this.state.page-1,
    })
    this.updateNews();
  
  };
  render() {
    {console.log("render");}
    return (
      
      <div className="container my-3" >
        {this.state.loading &&  <Loading/>}
        {!this.state.loading &&  <div className="row justify-content-center">
        <h2 className="my-3" style={{textAlign:'center'}}>Top Headlines from {this.capitalizeFirstLetter(this.props.category)} Category</h2>
        {this.state.articles.map((element)=>{
          
           return <div className="col-md-4 mb-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,85):""} imgUrl={element.urlToImage?element.urlToImage: "https://s.yimg.com/ny/api/res/1.2/YIP51uhgcdTAWtqjEOUo8g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://s.yimg.com/os/creatr-uploaded-images/2024-06/737ddb30-34ce-11ef-bff9-2d00abb28d0f"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div> 
        })}
        {<div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
        <button disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>}
        </div>}
      </div>
    )
  }
}

export default News
