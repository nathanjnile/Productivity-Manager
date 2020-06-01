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
 const data =
[
  [
      {
          "_id": "5ed279c182aeb240ec8df78b",
          "content": "Test task",
          "order": 0,
          "column": "5ed287ceb52d3155ecdb3a24",
          "__v": 0
      },
      {
          "_id": "5ed29337d71cd54fb059d659",
          "content": "Test task with it inside",
          "order": 0,
          "column": "5ed39925c8dd2819b419ab03",
          "__v": 0
      },
      {
          "_id": "5ed294f1d71cd54fb059d65b",
          "content": "Test task 2 with it inside",
          "order": 0,
          "column": "5ed287ceb52d3155ecdb3a24",
          "__v": 0
      },
      {
          "_id": "5ed29a65d71cd54fb059d65d",
          "content": "Test task 3 with it inside",
          "order": 1,
          "column": "5ed39925c8dd2819b419ab03",
          "__v": 0
      }
  ],
  [
      {
          "_id": "5ed287ceb52d3155ecdb3a24",
          "name": "Test Column",
          "columnOrder": 1,
          "__v": 0
      },
      {
          "_id": "5ed39925c8dd2819b419ab03",
          "name": "To do",
          "columnOrder": 0,
          "__v": 0
      }
  ]
];

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

// console.log(util.inspect(clientData, false, null, true))

// console.log(data[0]);



const columns = [...data[1]];

columns.forEach(col => {
  col["tasks"] = []
})

console.log(columns);

data[0].forEach(task => {
  for(let i = 0; i < columns.length; i++) {
    if (task.column === columns[i]._id) {
      columns[i].tasks.push(task);
    }
  }
})


console.log(util.inspect(columns, false, null, true));
