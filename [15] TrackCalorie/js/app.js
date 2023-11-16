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
        this._displayCalorieProgress();
    }

    // Public Methods
    addMeals(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calorie;
        this._displayNewMeal(meal);
        this._render();
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calorie;
        this._displayNewWorkout(workout);
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
        if(remaining <= 0){
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            document.getElementById('calorie-progress').classList.remove('bg-success');
            document.getElementById('calorie-progress').classList.add('bg-danger');

        }else{
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
            document.getElementById('calorie-progress').classList.remove('bg-danger');
            document.getElementById('calorie-progress').classList.add('bg-success');
        }
    }

    _displayCalorieProgress () {
        const progressBarEl = document.getElementById('calorie-progress');
        
        const percentage = (this._totalCalories/this._calorielimit)*100;
        progressBarEl.style.width = percentage+'%';

    }

    _displayNewMeal(meal){
        const mealDiv = document.getElementById('meal-items');
        mealDiv.innerHTML =` <div class="card my-2">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${meal.name}</h4>
            <div
              class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
            >
              ${meal.calorie}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>`;
    }

    _displayNewWorkout(workout){
        const workoutDiv = document.getElementById('workout-items');
        workoutDiv.innerHTML = ` <div class="card my-2">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${workout.name}</h4>
            <div
              class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
            >
              ${workout.calorie}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>`
    }

    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCalorieProgress();

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

class App {
    constructor() {
        this._tracker = new CaloriTracker();
        document.getElementById('meal-form').addEventListener('submit',this._newMeal.bind(this));
        document.getElementById('workout-form').addEventListener('submit',this._newWorkout.bind(this));

    }

    _newMeal(e){
        e.preventDefault();
        const name = document.getElementById('meal-name').value;
        const calorie = document.getElementById('meal-calories').value;

        if(name === '' || calorie === ''){
            alert('Please Enter a Meal');
            return;
        }
        const meal = new Meal(name,+calorie);
        this._tracker.addMeals(meal);

        document.getElementById('meal-name').value = '';
        document.getElementById('meal-calories').value ='';
        const collapseMeal = document.getElementById('collapse-meal');
        const bsCollapse = new bootstrap.Collapse(collapseMeal,{
            toggle:true
        });

    }

    _newWorkout(e){
        e.preventDefault();
        const name = document.getElementById('workout-name').value;
        const calorie = document.getElementById('workout-calories').value;

        if(name === '' || calorie === ''){
            alert('Please Enter a Workout');
            return;
        }
        const w = new Workout(name,+calorie);
        this._tracker.addWorkout(w);

        document.getElementById('workout-name').value = '';
        document.getElementById('workout-calories').value ='';
        const collapseMeal = document.getElementById('collapse-workout');
        const bsCollapse = new bootstrap.Collapse(collapseMeal,{
            toggle:true
        })
    }
}

const app = new App();