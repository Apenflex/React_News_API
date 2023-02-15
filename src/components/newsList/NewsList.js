import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useNewsService from '../../services/NewsService';

import './newsList.scss';



const NewsList = (props) => {
    const { newsName } = props;

    const [newsList, setNewsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [sizeNews, setSizeNews] = useState(15);
    const { loading, error, clearError, getAllNews } = useNewsService();

    // useEffect(() => {
    //     console.log('useEffect_1')
    //     onRequest(sizeNews, true);
    // }, []);

    useEffect(() => {
        console.log('useEffect_1')
        if (newsName) {
            clearError();
            onRequest(newsName ,sizeNews, true);
        } else {
            onRequest(newsName, sizeNews, true);
        }

    }, [newsName]);

    const onRequest = (newsName, sizeNews, initial) => {
        console.log(newsName, sizeNews, initial)
        initial ? setNewItemLoading(true) : setNewItemLoading(false);
        getAllNews(newsName, sizeNews)
            .then(onNewsListLoaded)
    }

    const onNewsListLoaded = (newNewsList) => {
        console.log(newNewsList);
        setNewsList(newsList => [...newsList, ...newNewsList]);
        setSizeNews(sizeNews => sizeNews + 15);
        setNewItemLoading(newItemLoading => false);
    }

    function renderItems(arr) {
        
        const items = arr.map((item, i) => {

            return (
                <li className="news__item" key={i}>
                    <img src={item.urlToImage} alt={item.name} />
                    <div className="news__name">{item.title}</div>
                </li>
            )
        });

        return (
            <ul className="news__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(newsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="news__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(newsName ,sizeNews, false)}>
                <div className="inner">Load more</div>
            </button>
        </div>
    )
}

export default NewsList;

// import { useState, useEffect } from 'react';

// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';

// import useNewsService from '../../services/NewsService';

// import './newsList.scss';

// const NewsList = (props) => {
//     const { newsName } = props;

//     const [newsList, setNewsList] = useState([]);
//     const [newItemLoading, setNewItemLoading] = useState(false);
//     const [sizeNews, setSizeNews] = useState(15);
//     const { loading, error, clearError, getAllNews } = useNewsService();

//     useEffect(() => {
//         console.log('useEffect_1')
//         clearError();
//         updateNewsList(newsName, sizeNews);
//     }, [newsName]);

//     const updateNewsList = (newsName, sizeNews) => {
//         setNewsList([]);
//         setSizeNews(15);
//         setNewItemLoading(true);
//         getAllNews(newsName, sizeNews)
//             .then((newNewsList) => {
//                 setNewsList(newNewsList);
//                 setSizeNews(sizeNews + 15);
//                 setNewItemLoading(false);
//             });
//     }

//     const onLoadMoreClick = () => {
//         updateNewsList(newsName, sizeNews);
//     }

//     function renderItems(arr) {
//         const items = arr.map((item, i) => {
//             return (
//                 <li className="news__item" key={i}>
//                     <img src={item.urlToImage} alt={item.name} />
//                     <div className="news__name">{item.title}</div>
//                 </li>
//             )
//         });

//         return (
//             <ul className="news__grid">
//                 {items}
//             </ul>
//         )
//     }

//     const items = renderItems(newsList);

//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loading && !newItemLoading ? <Spinner /> : null;

//     return (
//         <div className="news__list">
//             {errorMessage}
//             {spinner}
//             {items}
//             <button
//                 className="button button__main button__long"
//                 disabled={newItemLoading}
//                 onClick={onLoadMoreClick}>
//                 <div className="inner">Load more</div>
//             </button>
//         </div>
//     )
// }

// export default NewsList;
