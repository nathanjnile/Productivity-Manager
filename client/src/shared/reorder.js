const changeOrderGoals = (copiedItems) => {
    for(let i = 0; i< copiedItems.length; i++) {
        copiedItems[i].order = i;
    }
    return copiedItems;
}

const changeOrderOwnColumn = (copiedTasks) => {
    for(let i = 0; i< copiedTasks.length; i++) {
        copiedTasks[i].order = i;
    }
    return copiedTasks;
}

const changeOrderOfColumns = (items) => {
    const {columns} = items;
    for(let i = 0; i< columns.length; i++) {
        columns[i][1].columnOrder = i;
    }
    return columns;
}

const changeOrder = (items, type) => {
    switch(type) {
    case "goal": return changeOrderGoals(items)
    case "tasks": return changeOrderOwnColumn(items);
    case "moveColumn": return changeOrderOfColumns(items);
        default: return null
    }
}


export default changeOrder;