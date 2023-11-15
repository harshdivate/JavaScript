class CaloriTracker {
    constructor(){
        this._calorielimit = 5000 ;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
    }

    // Public Methods
    addMeals(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calorie;
        this._render();
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calorie;
        this._render();
    }

    //Private Methods 

    _displayCaloriesTotal (){
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit () {
        const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._calorielimit;
    }

    _displayCaloriesConsumed(){
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total,meal)=> total +=meal.calorie,0);
        console.log(consumed);
        caloriesConsumedEl.innerHTML = consumed;

    }

    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total,meal)=> total +=meal.calorie,0);
        caloriesBurnedEl.innerHTML = burned;
    }


    _displayCaloriesRemaining(){
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const remaining = this._calorielimit - this._totalCalories;
        caloriesRemainingEl.innerHTML = remaining;
    }
    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();

    }
}

class Meal {
    constructor(name, calorie){
        this.id = Math.random().toString(16).slice(2);
        this.name = name ;
        this.calorie = calorie;
    }
}

class Workout {
    constructor(name, calorie){
        this.id = Math.random().toString(16).slice(2);
        this.name = name ;
        this.calorie = calorie;
    }
}

const t = new CaloriTracker();

const b = new Meal('Breakfast', 1100);
t.addMeals(b);
const w = new Workout('Run',200);
t.addWorkout(w);
console.log(t._meals);
console.log(t._workouts);
console.log(t._totalCalories);