export const formatter = {
    statusFormatter: (status) => {
        switch(status){
            case "active": return ( <span className="green-text text-darken-4">Active</span> ) ;
            case "banned": return ( <span className="red-text text-darken-4">Banned</span> );
            case "notConfirmed": return ( <span className="yellow-text text-darken-4">Not Confirmed</span> );
        }
    }
}