export const defineCategoryColor = (category) => {
    if(category === "men's clothing"){
        return 'orange'
    }
    else if(category === "jewelery"){
        return 'green'
    }
    else{
        return 'default'
    }
}

export const checkForLocalPrice = (product) => {
    const modifiedPrice = localStorage.getItem(`modifiedPrice${product.id}`);
    return ( modifiedPrice ? modifiedPrice : product.price )
}

export const emptyLocalStorage = () => {
    localStorage.clear()
}