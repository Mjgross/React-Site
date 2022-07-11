import ItemsList from "./ItemsList"
import { useState } from "react";
import { Pagination, Input } from "react-daisyui";

const searchBarStyle = {
    color: "black"
}
export default function Products() {
    const [page, setPage] = useState(0);
    const [searchTerms, setSearchTerms] = useState("");
    
    return (
        <>
        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
            <Input 
            style={searchBarStyle} 
            className="w-full max-w-xs" 
            placeholder="Search..." 
            bordered="true"
            value={searchTerms}
            onChange= {({ target }) => setSearchTerms(target.value)} />
        </div>
        <ItemsList page={page} searchTerms={searchTerms}></ItemsList>
        </>
    )
}