async function  GetSortedPrducts(value, category, nestedCategory, searchParams) {
    var sortCategory;
    var sortOrder
    if(value === '1'){
        sortCategory = "price"
        sortOrder = "desc"
    }
    else if(value === '2'){
        sortCategory = "price"
        sortOrder = "asc"
    }
    if(category.lenght){
        if(nestedCategory.lenght){

        }
    }
}
export default GetSortedPrducts;