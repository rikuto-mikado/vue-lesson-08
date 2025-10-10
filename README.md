# Vue Lesson 08 - Dynamic Styling

## What I Learned

### 1. Vue Event Listeners
`@` is shorthand for `v-on:`

```html
<!-- Full syntax -->
<div v-on:click="boxSelected('A')"></div>

<!-- Shorthand (recommended) -->
<div @click="boxSelected('A')"></div>
```

---

### 2. Dynamic Inline Styles (`:style`)

#### ❌ Wrong: CSS syntax doesn't work
```html
<div :style="border-color: red;"></div>
```

#### ✅ Correct: JavaScript object syntax
```html
<div :style="{borderColor: 'red'}"></div>
<div :style="{'border-color': 'red'}"></div>  <!-- kebab-case also works -->
```

#### With conditional (ternary operator)
```html
<div :style="{borderColor: boxASelected ? 'red' : '#ccc'}"></div>
```

**Challenge:** Gets hard to read with multiple conditions

---

### 3. Dynamic CSS Classes (`:class`)

`:` is shorthand for `v-bind:`

| Syntax | Example | Pros | Cons |
|--------|---------|------|------|
| **Ternary Operator** | `:class="boxASelected ? 'demo active' : 'demo'"` | Simple for basic cases | Hard to read, repeat class names |
| **Object Syntax** ✨ | `:class="{demo: true, active: boxASelected}"` | Very readable, maintainable | None |
| **Array Syntax** | `:class="['demo', boxASelected ? 'active' : '']"` | Flexible | Can be verbose |

#### Comparison

```html
<!-- ❌ Less readable: Ternary operator -->
<div :class="boxASelected ? 'demo active' : 'demo'"></div>

<!-- ✅ More readable: Object syntax -->
<div :class="{demo: true, active: boxASelected}"></div>

<!-- ✨ Best practice: Combine static 'class' with dynamic ':class' -->
<div class="demo" :class="{active: boxASelected}"></div>
```

#### Object syntax breakdown
```javascript
{
  demo: true,        // 'demo' class is always applied
  active: boxASelected  // 'active' class applied only when boxASelected is true
}
```

#### Why use both `class` and `:class`?

When you have **static classes** (always applied) and **dynamic classes** (conditionally applied), you can use both attributes together:

```html
<!-- Static class: demo (always applied) -->
<!-- Dynamic class: active (only when boxASelected is true) -->
<div class="demo" :class="{active: boxASelected}"></div>
```

**Benefits:**
- Clearer intent: static vs dynamic classes are separated
- Cleaner code: no need to include `demo: true` in the object
- Better readability: you instantly see which classes are always there

**Comparison:**

| Approach | Code |
|----------|------|
| Only `:class` | `<div :class="{demo: true, active: boxASelected}"></div>` |
| Both `class` + `:class` ✨ | `<div class="demo" :class="{active: boxASelected}"></div>` |

---

### 4. JavaScript Expression Quoting

#### Why double quotes?
```html
<!-- ❌ Wrong: This won't work -->
<div :class="demo"></div>  <!-- Vue looks for a variable named 'demo' -->

<!-- ✅ Correct: String literal -->
<div :class="'demo'"></div>  <!-- The 'demo' string is passed -->
```

**Explanation:** `:class` expects a JavaScript expression, so you need quotes to create a string literal.

---

### 5. Toggle Boolean Values with `!` (NOT Operator)

The `!` operator inverts a boolean value:

```javascript
// If the value is true, it becomes false
// If the value is false, it becomes true
this.boxASelected = !this.boxASelected;
```

#### Use Case: Toggle Selection

```javascript
// Before: Only selecting (one-way)
boxSelected(box) {
    if (box === 'A') {
        this.boxASelected = true;  // Can only select, not deselect
    }
}

// After: Toggle (two-way)
boxSelected(box) {
    if (box === 'A') {
        this.boxASelected = !this.boxASelected;  // Can select AND deselect
    }
}
```

**Comparison:**

| Approach | Behavior | Code |
|----------|----------|------|
| Set to `true` | Click once to select, can't deselect | `this.boxASelected = true` |
| Toggle with `!` ✨ | Click to select, click again to deselect | `this.boxASelected = !this.boxASelected` |

**Example:**
```
Initial state: boxASelected = false
Click 1: boxASelected = !false → true (selected)
Click 2: boxASelected = !true → false (deselected)
Click 3: boxASelected = !false → true (selected again)
```

---

## Complete Example

```javascript
// app.js
const app = Vue.createApp({
    data() {
        return {
            boxASelected: false,
            boxBSelected: false,
            boxCSelected: false
        }
    },
    methods: {
        boxSelected(box) {
            // Toggle the selection state using ! (NOT operator)
            if (box === 'A') {
                this.boxASelected = !this.boxASelected;  // true → false, false → true
            } else if (box === 'B') {
                this.boxBSelected = !this.boxBSelected;
            } else if (box === 'C') {
                this.boxCSelected = !this.boxCSelected;
            }
        }
    }
});
```

```html
<!-- index.html -->
<div class="demo" :class="{active: boxASelected}" @click="boxSelected('A')"></div>
<div class="demo" :class="{active: boxBSelected}" @click="boxSelected('B')"></div>
<div class="demo" :class="{active: boxCSelected}" @click="boxSelected('C')"></div>
```

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Why `:style` requires JavaScript object syntax instead of CSS? | Vue evaluates the expression as JavaScript, not CSS |
| Ternary operator vs object syntax for `:class` | Use object syntax for better readability |
| When to use quotes in Vue bindings | Use quotes when you need a string literal instead of a variable |
| How to allow users to deselect a box after selecting it | Use `!` operator to toggle: `this.boxASelected = !this.boxASelected` |

---

## Key Takeaways

1. **Use shorthands:** `@` for `v-on:`, `:` for `v-bind:`
2. **Prefer object syntax for `:class`** - it's more readable and maintainable
3. **Combine `class` and `:class`** - static classes in `class`, dynamic classes in `:class`
4. **Use `!` to toggle booleans** - enables select/deselect functionality
5. **Remember:** Vue directives with `:` or `@` expect JavaScript expressions, not plain text
