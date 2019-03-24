# Redux

## Actions
https://redux.js.org/basics/actions

Data sent from your application to your store, ***(they are the only source of information for the store)***
The structure of an action is a plain JS object with a `type`, the remaining structure is up to you

[Design Info](https://github.com/redux-utilities/flux-standard-action#design-goals)
> It's a good idea to pass as little data in each action as possible. For example, it's better to pass index than the whole todo object. 
Design goals
Human-friendly. FSA actions should be easy to read and write by humans.
Useful. FSA actions should enable the creation of useful tools and abstractions.
Simple. FSA should be simple, straightforward, and flexible in its design.

### Examples
```javascript
const exampleActions = [
    {
      // type is required
      type: "addTodo",
      
      // remaining structure is up to you
      text: 'Build my first Redux app' // 5 | {} | function(p){return p} {},
    },
    
    // A basic Flux Standard Action
    {
      type: 'ADD_TODO',
      payload: {
        text: 'Do something.'  
      }
    },
    // An FSA that represents an error, analogous to a rejected Promise
    {
      type: 'ADD_TODO',
      payload: new Error(),
      error: true
    }    
]
```


## Reducers

Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.



