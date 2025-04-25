// import { Skeleton } from "@mui/material"

export default function Loading() {
    console.log("Loading component rendered");
    // You can add any loading animation or skeleton here
    // For example, a simple spinner or skeleton
    // return <Skeleton variant="rectangular" width={210} height={118} />
    return (<div className="loading-spinner">
        <div className="spinner">Loading...</div>
    </div>)
}