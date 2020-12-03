export const formatter = {
    statusFormatter: (status) => {
        switch(status){
            case "active": return ( <p className="green-text text-darken-4">Active</p> ) ;
            case "banned": return ( <p className="red-text text-darken-4">Banned</p> );
            case "notConfirmed": return ( <p className="yellow-text text-darken-4">Not Confirmed</p> );
        }
    }
}