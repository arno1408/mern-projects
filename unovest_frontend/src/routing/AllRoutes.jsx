import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Level_one_routes from './level1/Level_one_routes'
import AuthRoutes from'./../routing/authroutes/AuthRoutes'
import { LineWave } from 'react-loader-spinner'
const AllRoutes = () => {
    const LineWaver =() =>(
        <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        <LineWave
            visible={true}
            height="200"
            width="300"
            color="#67EAB3"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass="flex justify-center items-center max-md:ms-20"
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
            
        />
        <h1 className='w-full text-center pe-14 text-slate-200 text-lg  max-md:pe-0'>Loading Please wait...</h1>
    </div>   
    ) 
    return (
        <>
            <Suspense fallback={<LineWaver/>}>
                <BrowserRouter basename='/'>
                    <AuthRoutes/>
                    <Level_one_routes />
                </BrowserRouter>
            </Suspense>
        </>
    )
}

export default AllRoutes
