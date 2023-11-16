class CaloriTracker {
    constructor(){
        this._calorielimit = Storage.getCalorieLimit() ;
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

    removeMeal(id){
        const index = this._meals.findIndex((meal)=> meal.id === id );

        if(index !== -1){
            const meal = this._meals[index];
            this._totalCalories -= meal.calorie;
            this._meals.splice(index,1);
            this._render();
        }
    }

    removeWorkout(id){
        const index = this._workouts.findIndex((w)=> w.id === id );

        if(index !== -1){
            const workout = this._workouts[index];
            this._totalCalories += workout.calorie;
            this._workouts.splice(index,1);
            this._render();
        }
    }

    resetDay(){
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._render();
    }

    setLimit(limit){
        
        this._calorielimit = limit;
        Storage.setCalorieLimit(limit);
        this._displayCaloriesLimit();
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
        const div = document.createElement('div');
        div.classList.add('card','my-2','meal');
        div.setAttribute('data-id',meal.id);
        div.innerHTML =` 
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
        </div>`;
        mealDiv.appendChild(div);
    }

    _displayNewWorkout(workout){
        const workoutDiv = document.getElementById('workout-items');
        const div = document.createElement('div');
        div.classList.add('card','my-2','workout');
        div.setAttribute('data-id',workout.id);
        div.innerHTML = ` 
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
        </div>`;
        workoutDiv.appendChild(div);
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

class Storage {
    static getCalorieLimit (defaultLimit = 2000){
        let calorieLimit;
        if(localStorage.getItem('calorieLimit')===null){
            calorieLimit = defaultLimit;
        }else{
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit ( calorieLimit){
        localStorage.setItem('calorieLimit',calorieLimit); 
    }
}

class App {
    constructor() {
        this._tracker = new CaloriTracker();
        document.getElementById('meal-form').addEventListener('submit',this._newMeal.bind(this));
        document.getElementById('workout-form').addEventListener('submit',this._newWorkout.bind(this));
        document.getElementById('meal-items').addEventListener('click',this._removeItem.bind(this,'meal'))
        document.getElementById('workout-items').addEventListener('click',this._removeItem.bind(this,'workout'))
        document.getElementById('filter-meals').addEventListener('input',this._filterItem.bind(this,'meal'));
        document.getElementById('filter-workouts').addEventListener('input',this._filterItem.bind(this,'workout'));
        document.getElementById('reset').addEventListener('click',this._reset.bind(this));
        document.getElementById('limit-form').addEventListener('submit',this._setLimit.bind(this));
    }


    _setLimit(e){
        e.preventDefault();
        const limit = document.getElementById('limit').value;
        this._tracker.setLimit(+limit);
    }


    _filterItem(type,e){
        const filterItem =document.getElementById(`filter-${type}s`).value;
        const data = document.querySelectorAll(`.${type}`);
        data.forEach((d)=>{
            const mealItem= d.firstElementChild.firstElementChild.firstElementChild.textContent.toLowerCase();
            if(mealItem.includes(filterItem)){
                d.style.display = 'block';
            }else{
                d.style.display= 'none';
            }
        })

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

    _removeItem(type,e){
        if(e.target.classList.contains('fa-xmark') || e.target.classList.contains('delete')){
            if(confirm('Are you sure?')){
                const id = e.target.closest('.card').getAttribute('data-id');
                console.log(id);

                type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id);

                const item = e.target.closest('.card');
                item.remove();

            }
        }
    }

    _reset(e){
       this._tracker.resetDay();
       document.querySelectorAll('.meal').forEach((d)=>{
        
        d.remove();
       }) 
       document.querySelectorAll('.workout').forEach(d=>{
        d.remove();
       })
    }

}



const app = new App();