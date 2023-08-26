import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsUrl, author, date,source } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageurl ? imageurl : "https://fdn.gsmarena.com/imgroot/news/23/05/iphone-15-pro-max-same-camera-display/-952x498w6/gsmarena_001.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">

            <h5 className="card-title"> {title} <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {source}
            
              </span></h5>

            <p className="card-text">{description}...</p>
            <p className='card-text' ><small className='text-muted'>By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
