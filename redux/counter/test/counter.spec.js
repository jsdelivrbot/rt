const expect = require("expect");
const deepFreezee = require("deep-freeze");

// Testing counter
const counter = (state = 0, action) => {
	console.log(action);
	switch(action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		default:
			return state;
	}
}

expect(
	counter(0, {type: "INCREMENT"})
).toEqual(1);

expect(
	counter(1, {type: "INCREMENT"})
).toEqual(2);

expect(
	counter(2, {type: "DECREMENT"})
).toEqual(1);

expect(
	counter(1, {type: "DECREMENT"})
).toEqual(0);

expect(
	counter(1, {type: "SOMETHING"})
).toEqual(1);

console.log("Counter Reducer Test Passes!!");

const addCounter = (list) => {
	return [...list, 0];
	// return list;
}

const removeCounter = (list, index) => {
	// list.splice(index, 1);
	// return list.slice(0, index).concat(list.slice(index + 1));
	return [
		...list.slice(0, index),
		...list.slice(index + 1)
	];
}

const incrementCounter = (list, index) => {
	// list[index]++;
	// return list;
	// return list.slice(0, index).concat([list[index] + 1]).concat(list.slice(index + 1));
	return [
		...list.slice(0, index),
		list[index] + 1,
		...list.slice(index + 1)
	]
}

const testAddCounter = () => {
	const listBefore = [];
	const listAfter = [0];

	deepFreezee(listBefore);

	expect(
		addCounter(listBefore)
	).toEqual(listAfter);
}

const testRemoveCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 20];

	deepFreezee(listBefore);

	expect(
		removeCounter(listBefore, 1)
	).toEqual(listAfter);
}

const testIncrementCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 11, 20];

	deepFreezee(listBefore);

	expect(
		incrementCounter(listBefore, 1)
	).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
