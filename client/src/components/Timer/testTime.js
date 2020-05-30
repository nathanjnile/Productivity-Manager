let goals = [
{_id: "5ec7f7417c67494d4c2ea4d0", content: "From the other side", date: "Jul 2020", order: 3, __v: 0},
{_id: "5ecd69a72bb9fe2bb8fe1c18", content: "New goal", date: "Feb 2022", order: 1, __v: 0},
{_id: "5ec7f4267c67494d4c2ea4cf", content: "Hello", date: "Sept 2020", order: 0, __v: 0},
{_id: "5ecd637cb1dba122445df9ea", content: "Jump", date: "Feb 2022", order: 2, __v: 0}
]

goals.sort((a, b) => {
    return a.order - b.order;
  });

console.log(goals);