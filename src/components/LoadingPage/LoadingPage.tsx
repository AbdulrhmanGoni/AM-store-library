import React, { JSX } from 'react'
import ErrorThrower, { illustratorTypes } from '../ErrorThrower/ErrorThrower'
import { CircularProgress, LinearProgress } from '@mui/material'

type loadingType = {
    illustratorType: illustratorTypes,
    loadingElement: JSX.Element
}

const loadingTypes: loadingType[] = [
    {
        illustratorType: "waiting",
        loadingElement: <CircularProgress
            sx={{ position: "absolute", top: "10%" }}
            size={30}
        />
    },
    {
        illustratorType: "waiting1",
        loadingElement: <LinearProgress
            sx={{ position: "absolute", width: "100%", bottom: 0 }}
        />
    },
    {
        illustratorType: "waiting2",
        loadingElement: <LinearProgress
            sx={{ position: "absolute", width: "100%", top: 0 }}
        />
    }
]

export default function LoadingPage() {
    let randomIndex = Math.floor(Math.random() * loadingTypes.length)
    let { illustratorType, loadingElement } = loadingTypes[randomIndex];
    return (
        <ErrorThrower
            title=''
            illustratorType={illustratorType}
            fullPage
            hideAlertMsg
            style={{ p: { xs: 1, sm: 2 } }}
        >
            {loadingElement}
        </ErrorThrower>
    )
}
