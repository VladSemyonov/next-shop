import {useState} from 'react'
import ProductCard from "./ProductCard";
import ToolBar from "./ToolBar";

export default function Products({items}) {

    const [columnsSize, setColumnsSize] = useState('normal')

    return (

        <>
            <ToolBar util={setColumnsSize}/>
            {items && items.length > 0
                ? items.map((i, index) => <ProductCard item={i} size={columnsSize} key={index}/>)
                : 'Ничего не найдено'}
        </>

    )
}