import React, { useState } from 'react';
//import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import {fetchData} from "./api";
import Antibody from './components/Antibody';
import './App.css';
// import favicon from '../public/favicon.png';


function App() {
    const [result, setResult] = useState(null);
    const [parsed, setParsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [asks, setAsks] = useState(false)

    const ToggleAsked = () => {
        setAsks(prevState => !prevState);
    }

    const handleSubmit = async (input) => {
        try {
            setLoading(true);
            const data = await fetchData(input);
            setResult(data);
            setParsed(true);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResult(error)
            setParsed(false);
            setLoading(false);
        }
    };


    return (
        <div className = "App">
            <div className = "Heading" style={{textAlign: 'center', margin: "0 auto" }}>
                <img
                    src={`${process.env.PUBLIC_URL}/logo192.png`}
                    style={{ width: '50px', height: '50px', verticalAlign: 'center', marginRight: '10px' }}
                />
                <h1 type="Logo" style={{display:'inline-block', verticalAlign: 'center', padding:'0px', marginBottom:'0px'}}>"in-virto" enzyme analysis</h1>
            </div>
            <p type="logo" style={{marginTop:'0px'}}>a virtual drug discovery tool</p>
            <h1>Random Forest Bioactivity Predictor: <space/>
                <span>
                    Interactions with ERK2
                </span>
            </h1>
            <button className="button-small" onClick={ToggleAsked} 
                style={{fontSize:16, padding:'0px 4px', borderRadius:'24px'}}>?</button>
            {asks &&
            <h3>
                In drug discovery, it's important to identify candidates with high affinity
                for the protein of interest. Here, I created a <b>RESTFul API</b> that uses a <b>random forest machine learning model</b> that takes
                a drug's chemical composition (in SMILES format) and outputs predicted activity factors from valid entries.<br/>
                <br/>
                The target of interest is <b>ERK2</b>,
                a major cell signalling protein involved in multiple forms of <a href="https://en.wikipedia.org/wiki/MAPK1">
                cancers</a>.
                <br/><br/>Here's what the activity predictors mean:
                <ul style={{fontSize:14, textAlign:'left', width:'80%', margin:'0 auto'}}>
                    <li>IC50: the dose (in nM) that causes 50% interaction with the target species (or ERK2).</li>
                    <li>pIC50: -log of IC50, which optimizes the ML model (bigger number means stronger)</li>
                    <li>(to be implemented) lipinski drug (T/F): rule of thumb calculation using molecular weight, hydrogen
                        bond donors/acceptors etc. to guess if a molecule can make a good drug
                        (has ideal absorption, excretion, etc.)
                    </li>
                </ul>
            </h3>
            }
            <InputForm onSubmit={handleSubmit} />
            {parsed && <ResultDisplay result={result}/>}
            <p style = {{textAlign: 'center'}}>{parsed ? "Data parsed successfully!" : "No data parsed yet."}</p>
            <p  type = "signal"
                style = {{textAlign: 'center'}}>
                {loading ? "Loading SMILES to ML model...": ""}</p>
            {/* {parsed && <Antibody/>} */}
            <p style={{textAlign: 'center'}}><a href="https://github.com/seamalt" style={{
                color: '#95bed9', fontWeight: 800}}>made by seamalt.</a>
            </p>
            <Footer/>

        </div>
    );
}

export default App;