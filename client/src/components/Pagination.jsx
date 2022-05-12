import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPage } from "../redux/action";

export default function Pagination({amount}) {
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);
    const gamesPerPag = useSelector(state => state.gamesPerPag);
    const maxPages = Math.ceil(amount / gamesPerPag);

    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };
    
    const nextPage = () => {
        scrollToTop()
        if(pagination + 1 > maxPages) return 
        dispatch(currentPage(pagination + 1));
    };

    const prevPage = () => {
        scrollToTop()
        if(pagination - 1 < 1) return
        dispatch(currentPage(pagination - 1));
    };

    const hidePrev = pagination === 1 ? {visibility: 'hidden'} : null
    const hideNext = pagination === maxPages ? {visibility: 'hidden'} : null


    return (
        <div>
            <button style={hidePrev} onClick={prevPage}>Anterior</button>
            <button style={hideNext} onClick={nextPage}>Siguiente</button>
            <span>{" "}{pagination} de {maxPages}{" "}</span>
        </div>
    )
}