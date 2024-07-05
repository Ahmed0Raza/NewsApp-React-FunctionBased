import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false); // Separate loading state for fetchMoreData
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = async () => {
    const newPage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${newPage}&pageSize=${props.pageSize}`;
    setLoadingMore(true);

    let data = await fetch(url);
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    let parsedData = await data.json();

    if (parsedData.articles.length === 0) {
      setHasMore(false);
      setLoadingMore(false);
      return;
    }
    setArticles(prevArticles => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoadingMore(false);
    setPage(newPage);
  };

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    let parsedData = await data.json();
    console.log('Updated news:', parsedData); // Debug: log API response
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(1);
    setHasMore(parsedData.articles.length < parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  }, [props.country, props.category, props.apiKey, props.pageSize]);

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loading />}
      >
        {(loading || loadingMore) && <Loading />}
        <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="row justify-content-center" style={{ width: '90%', marginTop:'65px'}}>
            {!loading && (
              <h2 className="my-3" style={{ textAlign: 'center' }}>
                Top Headlines from {capitalizeFirstLetter(props.category)} Category
              </h2>
            )}
            {articles.map((element) => (
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
};

export default News;
