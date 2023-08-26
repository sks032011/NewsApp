import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pagesize: 6,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  // articles = [{
  //   "source": {
  //     "id": "espn-cric-info",
  //     "name": "ESPN Cric Info"
  //   },
  //   "author": null,
  //   "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //   "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //   "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //   "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //   "publishedAt": "2020-04-27T11:41:47Z",
  //   "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  // }
  // ]

  constructor(props) {
    super(props);
    console.log("hello constr")
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    }
    document.title = `${this.props.category}-newsgroom`
  }

  async updatenews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7765e62a6ae463a8541e8da6f6e43b1&page=${this.state.page}&pageSize=${this.props.pagesize}`
    // this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    // async await se fn wait krta hai promise poora hone ka ...jb tak fetch nahi ho jayegi tb tk it keeps on trying/waiting 
    let parseddata = await data.json();
    this.props.setProgress(70);
    console.log(parseddata)

    this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false,
     })
    this.props.setProgress(100);
   
   
  }

  // execute 2
  // cdm runs after rendering
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7765e62a6ae463a8541e8da6f6e43b1&page=1&pageSize=${this.props.pagesize}`
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // // async await se fn wait krta hai promise poora hone ka ...jb tak fetch nahi ho jayegi tb tk it keeps on trying/waiting 
    // let parseddata = await data.json();
    // console.log(parseddata)

    // this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false })

    this.updatenews();
  }

  handleright = async () => {
    // console.log("next")
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a7765e62a6ae463a8541e8da6f6e43b1&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`
    //   let data = await fetch(url);
    //   // async await se fn wait krta hai promise poora hone ka ...jb tak fetch nahi ho jayegi tb tk it keeps on trying/waiting 

    //   this.setState({ loading: true });
    //   //  hit krne ki starting pe loading symbol 
    //   let parseddata = await data.json();
    //   console.log(parseddata)

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseddata.articles,
    //     loading: false
    //   })
    // }

    this.setState({ page: this.state.page + 1 });
    this.updatenews();
  }


  handleleft = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a7765e62a6ae463a8541e8da6f6e43b1&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // // async await se fn wait krta hai promise poora hone ka ...jb tak fetch nahi ho jayegi tb tk it keeps on trying/waiting 
    // let parseddata = await data.json();
    // console.log(parseddata)

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseddata.articles,
    //   loading: false
    // })

    this.setState({ page: this.state.page - 1 });
    this.updatenews();
  }

  fetchMoreData = async() => {
   this.setState({page:this.state.page+1})
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7765e62a6ae463a8541e8da6f6e43b1&page=${this.state.page}&pageSize=${this.props.pagesize}`
  //  this.setState({ loading: true });
   let data = await fetch(url);
   // async await se fn wait krta hai promise poora hone ka ...jb tak fetch nahi ho jayegi tb tk it keeps on trying/waiting 
   let parseddata = await data.json();
   console.log(parseddata)

   this.setState({ articles:this.state.articles.concat(parseddata.articles), totalResults: parseddata.totalResults})

  };



  // execute num 1 
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsGroom-Top Headlines @{this.props.category} </h1>
        {/* this.s.l true h tb dikhao spinner else nahi */}
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >

               <div className="container" style={{overflow:'hidden'}}>
          <div className="row">
            {this.state.articles.map((element) => {
              {/* iterating articles */ } {/* loading chl rhi hai to sb gayab  */ } {/* !this.state.loading && */ }

              {/* map use krkre ityerate kr rhe ho to hr eke eleemnt ko ek unique key deni pdti hai ...here its their url  */ }
              return <div className="col-md-4" key={element.url}>
                {/* key div ko diya as hum div return kr rhe hai na  */}
                <NewsItem title={element.title} description={element.title} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                {/* if element.ttitle is null (nahi hai naam) to "" else ... */}
              </div>

            })}
          </div>
          </div>
        </InfiniteScroll>
{/* 
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleleft}>&larr;Prvs</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleright}>Next &rarr;</button>
        </div> */}

      </div>
    )
  }
}

export default News
