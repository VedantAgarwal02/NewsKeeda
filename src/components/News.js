import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  static defaultProps = {
    country:'in',
    pageSize:'8',
    category:'general'
  }
  capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state= {
      articles:[],
      page:1,
      loading:false,
      totalResults:0
    }
    document.title = `${this.capitalize(this.props.category)}- NewsKeeda`;
  }

  async handleChange(){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&sortBy=publishedAt&category=${this.props.category}&apiKey=12fd09e72c8d42579916c976c95a6f3f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults ,
      loading:true
    });
    this.props.setProgress(100);
  }

  handlePrev=async()=>{
    console.log('Prev');
    await this.setState({page: this.state.page - 1});
    this.handleChange();
  }
  handleNext=async ()=>{
    console.log('Next');
    await this.setState({page: this.state.page + 1});
    this.handleChange();
  }
  
  async componentDidMount() {
    await this.handleChange();
    // this.fetchMoreData();
  }

  fetchMoreData= async()=>{
    this.setState({page:this.state.page+1}) 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&sortBy=publishedAt&category=${this.props.category}&apiKey=12fd09e72c8d42579916c976c95a6f3f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.articles);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults 
      // loading:false
    });
  }

  render() {
    return (
      <>
        <h2 className='text-center my-3'>NewsKeeda - Top {this.capitalize(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            <div className="row my-3">
              {this.state.articles.map((element)=>{
                    return <div className="col-md-4"  key={element.url} >
                    <NewsItem title={element.title} description={element.description} imageUrl={!element.urlToImage?"https://images.hindustantimes.com/img/2022/11/12/1600x900/Image_3_1664104876532_1668266485295_1668266485295.jpg":element.urlToImage} author={element.author} publishedAt={element.publishedAt} source={element.source} newsUrl={element.url}/>
                    </div> 
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<2} className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr; </button>
        </div> */}
      </>
    )
  }
}

export default News
