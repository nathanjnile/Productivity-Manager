const { v4: uuidv4 } = require('uuid');
const util = require('util')



const initialState = {
    columns :     {
      [uuidv4()]: {
        name: "Todo",
        items: [
          {id: uuidv4(), content: "Go for a run"},
          {id: uuidv4(), content: "Take the bins out"}
        ]
      },
      [uuidv4()]: {
        name: "In Progress",
        items: [
            {id: uuidv4(), content: "Cook meals for the week"},
            {id: uuidv4(), content: "Complete next section of node course"}
        ]
      },
      [uuidv4()]: {
        name: "Done",
        items: []
      }
    }
}

const initialState2 = {
    columns :     [
        {
        _id: uuidv4(),
        name: "Todo",
        items: [
          {id: uuidv4(), content: "Go for a run"},
          {id: uuidv4(), content: "Take the bins out"}
        ]
      },
      {
        _id: uuidv4(),
        name: "In Progress",
        items: [
            {id: uuidv4(), content: "Cook meals for the week"},
            {id: uuidv4(), content: "Complete next section of node course"}
        ]
      },
      {
        _id: uuidv4(),
        name: "Done",
        items: []
      }
    ]
}

const taskData = [
    {_id: uuidv4(), content: "Go for a run", order: 0, column: "To do"},
    {_id: uuidv4(), content: "Take the bins out", order: 1, column: "To do"},
    {_id: uuidv4(), content: "Cook meals for the week", order: 1, column: "In progress"},
    {_id: uuidv4(), content: "Complete next section of node course", order: 0, column: "In progress"}
]

const columnData = [
    {_id: uuidv4(), content: "To do", columnOrder: 2},
    {_id: uuidv4(), content: "In progress", columnOrder: 0},
    {_id: uuidv4(), content: "Done", columnOrder: 1}
]

// Initialise empty state

const clientData = {
    columns : []
}

// Push each column on to the column array with relevant data

columnData.forEach((value, index) => {
    clientData.columns.push({
            _id: value._id,
            name : value.content,
            columnOrder: value.columnOrder,
            items :[]

        })
    })

// columnData sorted by columnOrder

clientData.columns.sort((a, b) => {
    return a.columnOrder - b.columnOrder;
    });

// console.log(clientData);

// Push 

taskData.forEach((value, index) => {
    const taskColumn = value.column;
    // console.log(taskColumn);
    for(let i = 0; i < clientData.columns.length; i++) {
        if (clientData.columns[i].name === value.column) {
            clientData.columns[i].items.push({...value});
        }
    }
})

// console.log(util.inspect(clientData, false, null, true))

// Sort the items within each column

clientData.columns.forEach((value, index) => {
    // console.log(util.inspect(value, false, null, true))
    // console.log("---------------------------------------")
    value.items.sort((a, b) => {
        return a.order - b.order;
        });
})

console.log(util.inspect(clientData, false, null, true))



