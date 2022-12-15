import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
  
  const capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  
  const handleChange=async()=>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    // console.log(parsedData.articles);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  
  const handlePrev=async()=>{
    console.log('Prev');
    await setPage(page-1)
    handleChange();
  }
  const handleNext=async ()=>{
    console.log('Next');
    await setPage(page+1)
    handleChange();
  }
  
  
  useEffect(()=>{
    document.title = `${capitalize(props.category)}- NewsKeeda`;
    fetchMoreData()
  },[])

  const fetchMoreData=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    // this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.articles);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }


    return (
      <>
        <h2 className='text-center' style={{marginTop:'70px'}}>NewsKeeda - Top {capitalize(props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          hasMore={articles.length <= totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            <div className="row my-3">
              {articles.map((element)=>{
                    return <div className="col-md-4"  key={element.url} >
                    <NewsItem title={element.title} description={element.description} imageUrl={!element.urlToImage?"https://images.hindustantimes.com/img/2022/11/12/1600x900/Image_3_1664104876532_1668266485295_1668266485295.jpg":element.urlToImage} author={element.author} publishedAt={element.publishedAt} source={element.source} key={element.url} newsUrl={element.url}/>
                    </div> 
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<2} className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr; </button>
        </div> */}
      </>
    )
  
}

News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}
News.defaultProps = {
  country:'in',
  pageSize:'8',
  category:'general'
}

export default News
