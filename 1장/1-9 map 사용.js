var users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "HA", age: 25 },
    { id: 3, name: "BJ", age: 32 },
    { id: 4, name: "PJ", age: 28 },
    { id: 5, name: "JE", age: 27 },
    { id: 6, name: "JM", age: 32 },
    { id: 7, name: "HI", age: 24 },
];

function filter(list, predicate) {
    var new_list = [];
    for (var i=0, len = list.length; i<len; i++) {
        if (predicate(list[i])) new_list.push(list[i]);
    }
    return new_list;
}

function map(list, iteratee) {
    var new_list = [];
    for(var i=0, len = list.length; i<len; i++) {
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

var users_under_30 = filter(users,function(user) { return user.age < 30 });
console.log(users_under_30.length); // 4

// iteratee
var ages = map(users_under_30,function(user) { return user.age; });
console.log(ages); // [25, 28, 27, 24]

var users_over_30 = filter(users, function(user) { return user.age >= 30 });
console.log(users_over_30.length); // 3

// iteratee
var names = map(users_over_30, function(user) { return user.name; });
console.log(names); // ["ID", "BJ", "JM"]