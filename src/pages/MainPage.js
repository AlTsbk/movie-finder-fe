import React from "react"
import { MainSlider } from "../components/MainPage/MainSlider"
import { TopRatedSection } from "../components/MainPage/TopRatedSection"
export const MainPage = () => {
    return (
        <div>
            <MainSlider />
            <TopRatedSection />
        </div>
    )
}