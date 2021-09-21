import Head from 'next/head'
import Layout from "../src/components/Layout/Layout";
import AdsField from "../src/components/AdsField"
import Benefits from "../src/components/Benefits"
import Courusel from "../src/components/Courusel"
import ScrollToTop from "../src/components/ScrollToTop"
import { createContext, useState, useEffect, useMemo } from 'react';
const AppContext = createContext();
export {AppContext};

export default function Home() { 
    
    return (
        
            <Layout>
                <Benefits/>
                <Courusel/>
                <AdsField title="Рабочая штука" query="Гидробоксы"/>
                <AdsField title="Рабочая штука" query="Для ванны"/>
                <ScrollToTop/>
            </Layout>
        
    )
}
