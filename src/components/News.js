import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      loadingMore: false, // Separate loading state for fetchMoreData
      hasMore: true // Track if more data is available
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  fetchMoreData = async () => {
    try {
      const newPage = this.state.page + 1;
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${newPage}&pageSize=${this.props.pageSize}`;
      this.setState({ loadingMore: true });

      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      let parsedData = await data.json();
      console.log('Fetched more data:', parsedData); // Debug: log API response

      if (parsedData.articles.length === 0) {
        this.setState({ hasMore: false, loadingMore: false });
        return;
      }

      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loadingMore: false,
        page: newPage
      });
    } catch (error) {
      console.error('Error fetching more data:', error);
      this.setState({ loadingMore: false });
    }
  };

  updateNews = async () => {
    try {
      this.props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });

      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      let parsedData = await data.json();
      console.log('Updated news:', parsedData); // Debug: log API response

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        page: 1,
        hasMore: parsedData.articles.length < parsedData.totalResults // Check if there are more articles to load
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error('Error updating news:', error);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  };

  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Loading />}
        >
          {(this.state.loading || this.state.loadingMore) && <Loading />}
          <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="row justify-content-center" style={{ width: '90%' }}>
              {!this.state.loading && (
                <h2 className="my-3" style={{ textAlign: 'center' }}>
                  Top Headlines from {this.capitalizeFirstLetter(this.props.category)} Category
                </h2>
              )}
              {this.state.articles.map((element) => (
                <div className="col-md-3 mb-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ''}
                    description={element.description ? element.description.slice(0, 85) : ''}
                    imgUrl={element.urlToImage ? element.urlToImage : 'https://zvelo.com/wp-content/uploads/2018/11/anatomy-of-a-full-path-url-hostname-tld-path-protocol.jpg'}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
