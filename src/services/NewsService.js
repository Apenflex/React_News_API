import { useHttp } from '../hooks/http.hook';

const useNewsService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://newsapi.org/v2';
    const _apiKey = 'apiKey=51f0464447e54558a33b1b2084323d53';
    const _search = 'world';
    const _basesizeNews = 15;

    const getAllNews = async (search = _search, sizeNews = _basesizeNews) => {
        console.log(`Get Service ${search}, ${sizeNews}`);
        const res = await request(`${_apiBase}/everything?q=${search}&pageSize=${sizeNews}&${_apiKey}`);
        // console.log(res.articles);
        return res.articles.map(_transformNews);
    };

    const _transformNews = (news) => {
        return {
            author: news.author,
            content: news.content,
            description: news.description,
            publishedAt: news.publishedAt,
            title: news.title,
            url: news.url,
            urlToImage: news.urlToImage,
        }
    }
    return { loading, error, clearError, getAllNews };
}

export default useNewsService;