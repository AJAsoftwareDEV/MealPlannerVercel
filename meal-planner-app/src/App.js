import React, { useState, useEffect } from 'react';
import { User, Calendar, ChefHat, ShoppingCart, Settings, Plus, Edit, Trash2, Check, X, Save, LogOut, Home } from 'lucide-react';

const MealPlannerApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [users, setUsers] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Sample recipe database
  const recipeDatabase = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      cuisine: "Mediterranean",
      dietaryTags: ["keto", "low-carb", "paleo"],
      prepTime: 20,
      ingredients: ["chicken breast", "mixed greens", "olive oil", "lemon", "feta cheese"],
      nutrition: { calories: 350, protein: 35, carbs: 8, fat: 20 },
      mealTypes: ["lunch", "dinner"]
    },
    {
      id: 2,
      name: "Vegetarian Buddha Bowl",
      cuisine: "Asian",
      dietaryTags: ["vegetarian", "vegan"],
      prepTime: 25,
      ingredients: ["quinoa", "chickpeas", "broccoli", "carrots", "tahini"],
      nutrition: { calories: 420, protein: 15, carbs: 55, fat: 18 },
      mealTypes: ["lunch", "dinner"]
    },
    {
      id: 3,
      name: "Keto Scrambled Eggs",
      cuisine: "American",
      dietaryTags: ["keto", "low-carb"],
      prepTime: 10,
      ingredients: ["eggs", "butter", "cheese", "spinach", "bacon"],
      nutrition: { calories: 380, protein: 25, carbs: 3, fat: 32 },
      mealTypes: ["breakfast"]
    },
    {
      id: 4,
      name: "Paleo Salmon Bowl",
      cuisine: "Mediterranean",
      dietaryTags: ["paleo", "low-carb"],
      prepTime: 30,
      ingredients: ["salmon fillet", "sweet potato", "asparagus", "olive oil", "herbs"],
      nutrition: { calories: 450, protein: 35, carbs: 25, fat: 25 },
      mealTypes: ["dinner"]
    },
    {
      id: 5,
      name: "Vegan Smoothie Bowl",
      cuisine: "American",
      dietaryTags: ["vegan", "vegetarian"],
      prepTime: 5,
      ingredients: ["banana", "berries", "almond milk", "chia seeds", "granola"],
      nutrition: { calories: 280, protein: 8, carbs: 45, fat: 12 },
      mealTypes: ["breakfast"]
    },
    {
      id: 6,
      name: "Low-Carb Zucchini Noodles",
      cuisine: "Italian",
      dietaryTags: ["keto", "low-carb", "vegetarian"],
      prepTime: 15,
      ingredients: ["zucchini", "marinara sauce", "parmesan", "basil", "garlic"],
      nutrition: { calories: 180, protein: 8, carbs: 12, fat: 14 },
      mealTypes: ["lunch", "dinner"]
    }
  ];

  // Login Component
  const LoginScreen = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignup) {
        const newUser = {
          id: users.length + 1,
          name,
          email,
          profile: {
            familySize: 1,
            dietaryPreferences: [],
            cuisineLikes: [],
            dislikedIngredients: [],
            mealTypes: ['breakfast', 'lunch', 'dinner'],
            prepTime: 30
          }
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        setCurrentView('profile');
      } else {
        const user = users.find(u => u.email === email);
        if (user) {
          setCurrentUser(user);
          setCurrentView('home');
        } else {
          alert('User not found. Please sign up first.');
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <ChefHat className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Meal Planner</h1>
            <p className="text-gray-600">Plan your perfect meals</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-green-600 hover:text-green-700 text-sm"
            >
              {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Profile Setup Component
  const ProfileScreen = () => {
    const [profile, setProfile] = useState(currentUser?.profile || {
      familySize: 1,
      dietaryPreferences: [],
      cuisineLikes: [],
      dislikedIngredients: [],
      mealTypes: ['breakfast', 'lunch', 'dinner'],
      prepTime: 30
    });

    const dietaryOptions = ['keto', 'vegetarian', 'vegan', 'paleo', 'low-carb', 'low-sugar'];
    const cuisineOptions = ['Mediterranean', 'Asian', 'American', 'Italian', 'Mexican', 'Indian'];
    const commonIngredients = ['nuts', 'dairy', 'gluten', 'seafood', 'eggs', 'soy'];
    const mealTypeOptions = ['breakfast', 'lunch', 'dinner', 'snacks'];

    const handleSave = () => {
      const updatedUser = { ...currentUser, profile };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setCurrentView('home');
    };

    const toggleArrayItem = (array, item, setter) => {
      if (array.includes(item)) {
        setter(array.filter(i => i !== item));
      } else {
        setter([...array, item]);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Your Profile</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Size</label>
                <select
                  value={profile.familySize}
                  onChange={(e) => setProfile({...profile, familySize: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                    <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences (max 2)</label>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.dietaryPreferences.includes(option)}
                        onChange={() => {
                          if (profile.dietaryPreferences.length < 2 || profile.dietaryPreferences.includes(option)) {
                            toggleArrayItem(profile.dietaryPreferences, option, (newPrefs) => 
                              setProfile({...profile, dietaryPreferences: newPrefs})
                            );
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Preferences</label>
                <div className="grid grid-cols-2 gap-2">
                  {cuisineOptions.map(cuisine => (
                    <label key={cuisine} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.cuisineLikes.includes(cuisine)}
                        onChange={() => toggleArrayItem(profile.cuisineLikes, cuisine, (newCuisines) => 
                          setProfile({...profile, cuisineLikes: newCuisines})
                        )}
                        className="mr-2"
                      />
                      <span>{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients to Avoid</label>
                <div className="grid grid-cols-2 gap-2">
                  {commonIngredients.map(ingredient => (
                    <label key={ingredient} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.dislikedIngredients.includes(ingredient)}
                        onChange={() => toggleArrayItem(profile.dislikedIngredients, ingredient, (newIngredients) => 
                          setProfile({...profile, dislikedIngredients: newIngredients})
                        )}
                        className="mr-2"
                      />
                      <span className="capitalize">{ingredient}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Types to Include</label>
                <div className="grid grid-cols-2 gap-2">
                  {mealTypeOptions.map(mealType => (
                    <label key={mealType} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.mealTypes.includes(mealType)}
                        onChange={() => toggleArrayItem(profile.mealTypes, mealType, (newMealTypes) => 
                          setProfile({...profile, mealTypes: newMealTypes})
                        )}
                        className="mr-2"
                      />
                      <span className="capitalize">{mealType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Prep Time (minutes)</label>
                <select
                  value={profile.prepTime}
                  onChange={(e) => setProfile({...profile, prepTime: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Profile
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Meal Plan Creation Component
  const CreateMealPlan = () => {
    const [planDetails, setPlanDetails] = useState({
      startDate: new Date().toISOString().split('T')[0],
      duration: 7,
      name: `Meal Plan ${new Date().toLocaleDateString()}`
    });
    const [generatedPlan, setGeneratedPlan] = useState(null);

    const generateMealPlan = () => {
      const userProfile = currentUser.profile;
      const filteredRecipes = recipeDatabase.filter(recipe => {
        // Filter by dietary preferences
        const matchesDietary = userProfile.dietaryPreferences.length === 0 || 
          userProfile.dietaryPreferences.some(pref => recipe.dietaryTags.includes(pref));
        
        // Filter by cuisine preferences
        const matchesCuisine = userProfile.cuisineLikes.length === 0 || 
          userProfile.cuisineLikes.includes(recipe.cuisine);
        
        // Filter by prep time
        const matchesPrepTime = recipe.prepTime <= userProfile.prepTime;
        
        // Filter by disliked ingredients
        const hasDislikedIngredient = recipe.ingredients.some(ingredient => 
          userProfile.dislikedIngredients.some(disliked => 
            ingredient.toLowerCase().includes(disliked.toLowerCase())
          )
        );

        return matchesDietary && matchesCuisine && matchesPrepTime && !hasDislikedIngredient;
      });

      const plan = [];
      for (let day = 0; day < planDetails.duration; day++) {
        const dayDate = new Date(planDetails.startDate);
        dayDate.setDate(dayDate.getDate() + day);
        
        const dayPlan = {
          date: dayDate.toDateString(),
          meals: {}
        };

        userProfile.mealTypes.forEach(mealType => {
          const mealRecipes = filteredRecipes.filter(recipe => 
            recipe.mealTypes.includes(mealType)
          );
          if (mealRecipes.length > 0) {
            dayPlan.meals[mealType] = mealRecipes[Math.floor(Math.random() * mealRecipes.length)];
          }
        });

        plan.push(dayPlan);
      }

      setGeneratedPlan({
        ...planDetails,
        id: Date.now(),
        plan,
        createdAt: new Date()
      });
    };

    const saveMealPlan = () => {
      setMealPlans([...mealPlans, generatedPlan]);
      setCurrentView('home');
    };

    const generateGroceryList = () => {
      const allIngredients = [];
      generatedPlan.plan.forEach(day => {
        Object.values(day.meals).forEach(meal => {
          meal.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient);
          });
        });
      });
      
      const groupedIngredients = allIngredients.reduce((acc, ingredient) => {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
        return acc;
      }, {});

      const groceryList = Object.entries(groupedIngredients).map(([ingredient, count]) => ({
        ingredient,
        quantity: count,
        checked: false
      }));

      return groceryList;
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Meal Plan</h2>

            {!generatedPlan ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                    <input
                      type="text"
                      value={planDetails.name}
                      onChange={(e) => setPlanDetails({...planDetails, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={planDetails.startDate}
                      onChange={(e) => setPlanDetails({...planDetails, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                    <select
                      value={planDetails.duration}
                      onChange={(e) => setPlanDetails({...planDetails, duration: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value={3}>3 days</option>
                      <option value={7}>1 week</option>
                      <option value={14}>2 weeks</option>
                      <option value={30}>1 month</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateMealPlan}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ChefHat size={20} />
                  Generate Meal Plan
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{generatedPlan.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={saveMealPlan}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save Plan
                    </button>
                    <button
                      onClick={() => setCurrentView('grocery-list')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Grocery List
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {generatedPlan.plan.map((day, dayIndex) => (
                    <div key={dayIndex} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-3">{day.date}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(day.meals).map(([mealType, meal]) => (
                          <div key={mealType} className="bg-gray-50 rounded-lg p-3">
                            <h5 className="font-medium capitalize text-gray-800 mb-2">{mealType}</h5>
                            <p className="font-semibold text-sm">{meal.name}</p>
                            <p className="text-xs text-gray-600">{meal.cuisine} • {meal.prepTime} min</p>
                            <div className="mt-2 text-xs">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                {meal.nutrition.calories} cal
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Generate New Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Home Dashboard Component
  const HomeDashboard = () => {
    const upcomingPlans = mealPlans.filter(plan => new Date(plan.startDate) >= new Date());
    const pastPlans = mealPlans.filter(plan => new Date(plan.startDate) < new Date());

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ChefHat className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">Meal Planner</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
                <button
                  onClick={() => setCurrentView('profile')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Settings size={20} />
                </button>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    setCurrentView('login');
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setCurrentView('create-plan')}
              className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-3 text-lg font-medium"
            >
              <Plus size={24} />
              Create New Meal Plan
            </button>
            
            <button
              onClick={() => setCurrentView('saved-recipes')}
              className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 text-lg font-medium"
            >
              <ChefHat size={24} />
              Saved Recipes
            </button>
            
            <button
              onClick={() => setCurrentView('profile')}
              className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-3 text-lg font-medium"
            >
              <User size={24} />
              Update Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={24} />
                Upcoming Meal Plans
              </h2>
              {upcomingPlans.length > 0 ? (
                <div className="space-y-3">
                  {upcomingPlans.map(plan => (
                    <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{plan.name}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(plan.startDate).toLocaleDateString()} • {plan.duration} days
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => setMealPlans(mealPlans.filter(p => p.id !== plan.id))}
                            className="p-1 hover:bg-gray-100 rounded text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming meal plans. Create your first one!</p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat size={24} />
                Past Meal Plans
              </h2>
              {pastPlans.length > 0 ? (
                <div className="space-y-3">
                  {pastPlans.slice(-5).map(plan => (
                    <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(plan.startDate).toLocaleDateString()} • {plan.duration} days
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No past meal plans yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Navigation wrapper for authenticated views
  const AuthenticatedLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-3 text-green-600 hover:text-green-700"
            >
              <ChefHat className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Meal Planner</h1>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
              <button
                onClick={() => setCurrentView('profile')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('login');
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );

  // Saved Recipes Component
  const SavedRecipesScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const filteredRecipes = recipeDatabase.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.dietaryTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const saveRecipe = (recipe) => {
      if (!savedRecipes.find(r => r.id === recipe.id)) {
        setSavedRecipes([...savedRecipes, recipe]);
      }
    };

    const removeRecipe = (recipeId) => {
      setSavedRecipes(savedRecipes.filter(r => r.id !== recipeId));
    };

    return (
      <AuthenticatedLayout>
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe Library</h2>
            
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{recipe.cuisine} • {recipe.prepTime} min</p>
                  
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {recipe.dietaryTags.map(tag => (
                        <span key={tag} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3 text-sm">
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <span>Calories: {recipe.nutrition.calories}</span>
                      <span>Protein: {recipe.nutrition.protein}g</span>
                      <span>Carbs: {recipe.nutrition.carbs}g</span>
                      <span>Fat: {recipe.nutrition.fat}g</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                    {savedRecipes.find(r => r.id === recipe.id) ? (
                      <button
                        onClick={() => removeRecipe(recipe.id)}
                        className="bg-red-100 text-red-600 py-2 px-3 rounded text-sm hover:bg-red-200 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => saveRecipe(recipe)}
                        className="bg-green-100 text-green-600 py-2 px-3 rounded text-sm hover:bg-green-200 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Recipe Detail Modal */}
            {selectedRecipe && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{selectedRecipe.name}</h3>
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold">Cuisine:</p>
                      <p>{selectedRecipe.cuisine}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Prep Time:</p>
                      <p>{selectedRecipe.prepTime} minutes</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold mb-2">Dietary Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.dietaryTags.map(tag => (
                        <span key={tag} className="bg-green-100 text-green-800 px-3 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold mb-2">Nutrition (per serving):</p>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                      <div>Calories: {selectedRecipe.nutrition.calories}</div>
                      <div>Protein: {selectedRecipe.nutrition.protein}g</div>
                      <div>Carbs: {selectedRecipe.nutrition.carbs}g</div>
                      <div>Fat: {selectedRecipe.nutrition.fat}g</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold mb-2">Ingredients:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="capitalize">{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    {savedRecipes.find(r => r.id === selectedRecipe.id) ? (
                      <button
                        onClick={() => {
                          removeRecipe(selectedRecipe.id);
                          setSelectedRecipe(null);
                        }}
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                      >
                        Remove from Saved
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          saveRecipe(selectedRecipe);
                          setSelectedRecipe(null);
                        }}
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                      >
                        Save Recipe
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AuthenticatedLayout>
    );
  };

  // Grocery List Component
  const GroceryListScreen = () => {
    const [groceryList, setGroceryList] = useState([]);
    const [customItem, setCustomItem] = useState('');

    useEffect(() => {
      // Generate grocery list from current meal plans
      const allIngredients = [];
      mealPlans.forEach(plan => {
        plan.plan?.forEach(day => {
          Object.values(day.meals).forEach(meal => {
            meal.ingredients.forEach(ingredient => {
              allIngredients.push(ingredient);
            });
          });
        });
      });
      
      const groupedIngredients = allIngredients.reduce((acc, ingredient) => {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
        return acc;
      }, {});

      const list = Object.entries(groupedIngredients).map(([ingredient, count]) => ({
        id: Math.random(),
        ingredient,
        quantity: count,
        checked: false,
        category: categorizeIngredient(ingredient)
      }));

      setGroceryList(list);
    }, [mealPlans]);

    const categorizeIngredient = (ingredient) => {
      const categories = {
        'Produce': ['lettuce', 'spinach', 'broccoli', 'carrots', 'tomato', 'onion', 'garlic', 'herbs', 'berries', 'banana', 'lemon'],
        'Protein': ['chicken', 'beef', 'pork', 'fish', 'salmon', 'eggs', 'tofu', 'beans', 'chickpeas'],
        'Dairy': ['milk', 'cheese', 'butter', 'yogurt', 'cream'],
        'Pantry': ['rice', 'quinoa', 'pasta', 'flour', 'oil', 'vinegar', 'spices'],
        'Other': []
      };

      for (const [category, items] of Object.entries(categories)) {
        if (items.some(item => ingredient.toLowerCase().includes(item))) {
          return category;
        }
      }
      return 'Other';
    };

    const toggleItem = (id) => {
      setGroceryList(groceryList.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    };

    const addCustomItem = () => {
      if (customItem.trim()) {
        setGroceryList([...groceryList, {
          id: Math.random(),
          ingredient: customItem.trim(),
          quantity: 1,
          checked: false,
          category: 'Other'
        }]);
        setCustomItem('');
      }
    };

    const removeItem = (id) => {
      setGroceryList(groceryList.filter(item => item.id !== id));
    };

    const groupedList = groceryList.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    return (
      <AuthenticatedLayout>
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingCart size={24} />
              Grocery List
            </h2>

            <div className="mb-6 flex gap-2">
              <input
                type="text"
                placeholder="Add custom item..."
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={addCustomItem}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            {Object.entries(groupedList).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{category}</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                      item.checked ? 'bg-gray-50 opacity-60' : 'bg-white'
                    }`}>
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          item.checked ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}
                      >
                        {item.checked && <Check size={12} className="text-white" />}
                      </button>
                      <span className={`flex-1 capitalize ${item.checked ? 'line-through' : ''}`}>
                        {item.ingredient} {item.quantity > 1 && `(${item.quantity})`}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {groceryList.length === 0 && (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No items in your grocery list yet.</p>
                <p className="text-gray-400 text-sm">Create a meal plan to automatically generate your shopping list!</p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total items: {groceryList.length}</span>
                <span>Checked off: {groceryList.filter(item => item.checked).length}</span>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  };

  // Main App Render Logic
  const renderCurrentView = () => {
    if (!currentUser) {
      return <LoginScreen />;
    }

    switch (currentView) {
      case 'home':
        return <HomeDashboard />;
      case 'profile':
        return <ProfileScreen />;
      case 'create-plan':
        return <CreateMealPlan />;
      case 'saved-recipes':
        return <SavedRecipesScreen />;
      case 'grocery-list':
        return <GroceryListScreen />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
};

export default MealPlannerApp;