import { useCallback } from "react"

export const useMessage = () => {
    return useCallback ( (text, type = "") => {
        let classes = "rounded";
        switch(type){
            case "error": classes = "rounded deep-orange accent-4"; break;
        }
        switch(type){
            case "accept": classes = "rounded green accent-4"; break;
        }
        switch(type){
            case "warning": classes = "rounded yellow accent-4"; break;
        }

        if(window.M && text){
            window.M.toast({html: text, classes: classes});
        }
    }, []);
}