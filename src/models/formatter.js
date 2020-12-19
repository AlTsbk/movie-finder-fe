 const formatter = {
    statusFormatter: (status) => {
        switch(status){
            case "active": return ( <span className="green-text text-darken-4">Active</span> ) ;
            case "banned": return ( <span className="red-text text-darken-4">Banned</span> );
            case "notConfirmed": return ( <span className="yellow-text text-darken-4">Not Confirmed</span> );
        }
    },

    ratingFormatter: (rating) => {
        if(rating < 0){
            return (<p className="movie-rating red-text text-darken-4">{rating}</p>)
        }

        if(rating > 0){
            return (<p className="movie-rating green-text text-darken-2">+{rating}</p>)
        }

        return (<p className="movie-rating grey-text text-darken-3">{rating}</p>)
    },

    ratingInCardFormatter: (rating) => {
        if(rating < 0){
            return (<a className={`btn-floating halfway-fab movie-card-note red darken-4}`}>{rating}</a>)
        }

        if(rating > 0){
            return (<a className={`btn-floating halfway-fab movie-card-note green darken-2}`}>{rating}</a>)
        }

        return (<a className={`btn-floating halfway-fab movie-card-note grey darken-4}`}>{rating}</a>)
    }
}

export default formatter;