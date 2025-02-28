import { useEffect } from "react";

export default function Pagination(props) {
    let arr = [];

    function fillArr() {
        if (props.numOfPages > 11) {
            arr.length = 10;
        } else {
            arr.length = props.numOfPages;
        }
        
       console.log(arr.length);
       arr.fill("");
}

    let subarr = [];

    function fillSubArr(page) {
        if (props.numOfPages < 11) {
            subarr = arr.slice();
        }

        if (props.numOfPages > 11) {
            if (page < 3) {
                subarr = arr.slice(0, 10);
                console.log(`arr sliced = [${arr.slice(0,10).length}]`)
            } else {
                subarr = arr.slice(page-1, page+5);
                
            }
        }
        //subarr.fill("");
        console.log(`subarr:${subarr.length} , arr:${arr.length}`);
        console.log(`props.numOfPages:${props.numOfPages}`);
    }

    
    //none of this works   
    // the issue is that when the results are higher than ten
    // we have to specfically render only within 8 spaces of the current page number
    // so if the current page was 5, the numbers must be from 1 to 10,
    // and if it was 14, the numbers must be 6 to 22
    // that would requrire us to make "arr" filled with real number values rather than empty spaces
    // requiring us to iterate over the array with costs a lot of rendering time
     

    
    
    fillArr();

    useEffect(()=>{
        //fillArr();
    //fillSubArr(parseInt(props.page));
    },[]);
    
    useEffect(()=>{
        //fillSubArr(parseInt(props.page));
    },[props.page])

    return (
        <>
        {arr.map((val,index) => 
            <span key={index} className="page-number" data-on={props.page===index}
            onClick={()=>{
                props.handlePagination(index);
            }}>
                {new String(index+1)}
            </span>
        )}
        </>
    )
}
