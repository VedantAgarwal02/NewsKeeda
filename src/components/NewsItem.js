import React from 'react'
// import PropTypes from 'prop-types'

const NewsItem=(props)=>{
    
       let {title, description, imageUrl,publishedAt,author, newsUrl, source} = props;
       let d = new Date(publishedAt);
    return (
      <div className='container my-3'>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{zIndex:'1',left:'90%'}}>
          {source.name}
        </span>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">
              {title} 
              
            </h5>
            <p className="card-text">{description}</p>
            <p className='text-muted'> <small>Author: <i>{author?author:"Unknown"}</i> </small> </p>
            <p className='text-muted'> <small>Time: <i>{d.toGMTString()}</i></small> </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }


export default NewsItem
