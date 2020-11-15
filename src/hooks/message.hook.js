import { useCallback } from "react"

export const useMessage = () => {
    return useCallback ( (text, classes = "rounded deep-orange accent-4") => {
        if(window.M && text){
            window.M.toast({html: text, classes: classes});
        }
    }, []);
}