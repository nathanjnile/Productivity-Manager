const changeOrder = (copiedItems) => {
    for(let i = 0; i< copiedItems.length; i++) {
        copiedItems[i].order = i;
    }
    return copiedItems;
}


export default changeOrder;