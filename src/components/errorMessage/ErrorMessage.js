import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img}
            alt='error 404'
            style={{
                display: 'block',
                width: '250px',
                height: '250px',
                objectfit: 'contain',
                margin: '0 auto',
            }} />
    )
}

export default ErrorMessage;