var users = [
  { id: 1, name: 'ID', age: 32 },
  { id: 2, name: 'HA', age: 25 },
  { id: 3, name: 'BJ', age: 32 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
  { id: 6, name: 'JM', age: 32 },
  { id: 7, name: 'HI', age: 24 },
];

function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}

function log_length(value) {
  console.log(value.length);
  return value;
}

function bvalue(key) {
  return function (obj) {
    return obj[key];
  };
}

// console.log(log_length(
//     map(
//         filter(users,function (user) { return user.age < 30 }),
//         // function (user) { return user.age; }
//         bvalue('age')
//     )
// ));

console.log(
  log_length(
    map(
      filter(users, (u) => u.age < 30),
      (u) => u.age,
    ),
  ),
);

// console.log(log_length(
//     map(
//         filter(users, function (user) { return user.age >= 30 }),
//         // function (user) { return user.name; }
//         bvalue('name')
//     )
// ));

console.log(
  log_length(
    map(
      filter(users, (u) => u.age >= 30),
      (u) => u.name,
    ),
  ),
);

// 이것도 괜찮다
console.log('이것도 괜찮다\n');
const under_30 = (u) => u.age < 30;
const over_30 = (u) => u.age >= 30;
console.log(log_length(map(filter(users, under_30), (u) => u.age)));
console.log(log_length(map(filter(users, over_30), (u) => u.name)));

// 아니면 이것도 괜찮다
console.log('아니면 이것도 괜찮다\n');
const ages = (list) => map(list, (v) => v.age);
const names = (list) => map(list, (v) => v.name);
console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

// 마지막으로 한 번만 고쳐보자
console.log('마지막으로 한 번만 고쳐보자\n');
var bvalues = (key) => (list) => map(list, (v) => v[key]);
const ages_ = bvalues('age');
const names_ = bvalues('name');

// bvalues가 있으면 화살표 함수가 아니어도 충분히 간결해진다.
function bvalues(key) {
    return function(list) {
        return map(list, function(v) { return v[key];})
    }
}

// bvalues는이렇게도 할 수 있다.(진짜 마지막)
function _bvalues(key) {
    var value = bvalue(key);
    return function (list) { return map(list, value); }
}

const _ages = _bvalues('age');
const _names  = _bvalues('name');