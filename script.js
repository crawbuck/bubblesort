class BubbleSort {
  constructor() {
    this.state = {
      $number: 0,
      $randomArray: [],
      $sortedArray: []
    };
    this.dom = {
      $submit: document.querySelector("input[type='submit']"),
      $input: document.querySelector("input[type='number']"),
      $form: document.querySelector(".js-form"),
      $results: document.querySelector(".js-results"),
      $selectedValue: document.querySelector(".js-input"),
      $randomizedValue: document.querySelector(".js-randomized-order"),
      $sortedValue: document.querySelector(".js-sorted-order")
    };
    this.$submitHandler = this.readSubmission.bind(this);
    this.init();
  }
  display() {
    const { state, dom } = this;
    const {
      $results,
      $selectedValue,
      $randomizedValue,
      $sortedValue
    } = dom;

    $results.hidden = false;
    $selectedValue.textContent = state.$number;
    $randomizedValue.textContent = state.$randomArray;
    $sortedValue.textContent = state.$sortedArray;
  }
  readSubmission(e) {
    e.preventDefault();
    const { state, dom } = this;
    const { $input } = dom;
    state.$sortedArray = [];
    state.$number = parseInt($input.value);
    state.$randomArray = this.shuffle();
    state.$sortedArray = this.bubbleSortArray();
    this.display();
  }
  shuffle() {
    // Fisher Yates Shuffle Algorithm
    let { $number } = this.state;
    let arr = Array.from({length: $number}, (_, i) => i + 1);
    let currentIndex = arr.length;
    let temporaryValue;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    } while(0 !== currentIndex);
    return arr;
  }
  bubbleSortArray() {
    const { $randomArray } = this.state;
    const arr = [...$randomArray];
    let swapped = true;

    do {
      swapped = false;
      arr.forEach((current, i) => {
        const nextItem = arr[i + 1];
        if (current > nextItem) {
          arr[i] = nextItem;
          arr[i + 1] = current;
          swapped = true;
        }
      });
    } while(swapped);

    return arr;
  }
  init() {
    const { $form } = this.dom;
    $form.addEventListener("submit", this.$submitHandler);
  }
}


document.addEventListener("DOMContentLoaded", () => new BubbleSort);
