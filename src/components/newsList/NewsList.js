import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useNewsService from '../../services/NewsService';

import './newsList.scss';

const NewsList = (props) => {
    
    const [newsList, setNewsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const { loading, error, getAllNews } = useNewsService();

    useEffect(() => {
        onRequest(true);
    }, []);

    const onRequest = (initial) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(false);
        getAllNews()
            .then(onNewsListLoaded)
    }

    const onNewsListLoaded = (newNewsList) => {
        setNewsList(newsList => [...newsList, ...newNewsList]);
        setNewItemLoading(newItemLoading => false);
    }

    function renderItems(arr) {
        console.log(arr)
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
                onClick={onRequest}>
                <div className="inner">Load more</div>
            </button>
        </div>
    )
}

export default NewsList;