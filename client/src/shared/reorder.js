const changeOrderGoals = (copiedItems) => {
    for(let i = 0; i< copiedItems.length; i++) {
        copiedItems[i].order = i;
    }
    return copiedItems;
}

const changeOrderOwnColumn = (items) => {
    const {taskColumns, columnIndex} = items;
    const copiedColumns = [...taskColumns];
    for(let i = 0; i < copiedColumns[columnIndex].tasks.length; i++) {
        copiedColumns[columnIndex].tasks[i].order = i;
    }
    return copiedColumns;
}

const changeOrderDiffColumn = (items) => {
    const {taskColumns, columnSourceIndex, columnDestIndex} = items;
    const copiedColumns = [...taskColumns];
    for(let i = 0; i < copiedColumns[columnSourceIndex].tasks.length; i++) {
        copiedColumns[columnSourceIndex].tasks[i].order = i;
    }
    for(let i = 0; i < copiedColumns[columnDestIndex].tasks.length; i++) {
        copiedColumns[columnDestIndex].tasks[i].order = i;
    }
    return copiedColumns;
}

const changeOrderOfColumns = (items) => {
    const {columns} = items;
    for(let i = 0; i< columns.length; i++) {
        columns[i].columnOrder = i;
    }
    return columns;
}

const changeOrder = (items, type) => {
    switch(type) {
    case "goal": return changeOrderGoals(items)
    case "taskOwnColumn": return changeOrderOwnColumn(items);
    case "taskDiffColumn": return changeOrderDiffColumn(items);
    case "moveColumn": return changeOrderOfColumns(items);
        default: return null
    }
}


export default changeOrder;