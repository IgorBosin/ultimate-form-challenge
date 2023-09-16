import "./App.css";
import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Header} from "./components/Header";
import {Step1} from "./Step1";
import {Step2} from "./Step2";
import {Step3} from "./Step3";
import Result from "./Result";


function App() {
    return (
        <>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Step1/>}/>
                    <Route path="/step2" element={<Step2/>}/>
                    <Route path="/step3" element={<Step3/>}/>
                    <Route path="/result" element={<Result/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
