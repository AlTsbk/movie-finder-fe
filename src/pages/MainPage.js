import React from "react"
import { BestMovieForYou } from "../components/MainPage/BestMovieForYou"
import { MainSlider } from "../components/MainPage/MainSlider"
import { RecomendationSection } from "../components/MainPage/RecomendationSection"
import { TopRatedSection } from "../components/MainPage/TopRatedSection"
export const MainPage = () => {
    return (
        <div>
            <MainSlider />
            <BestMovieForYou />
            <RecomendationSection />
            <TopRatedSection />
        </div>
    )
}