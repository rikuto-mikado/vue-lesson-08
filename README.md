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

#### Wrong: CSS syntax doesn't work
```html
<div :style="border-color: red;"></div>
```

#### Correct: JavaScript object syntax
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
| **Object Syntax** (recommended) | `:class="{demo: true, active: boxASelected}"` | Very readable, maintainable | None |
| **Array Syntax** | `:class="['demo', boxASelected ? 'active' : '']"` | Flexible, can mix multiple expressions | Can be verbose |

#### Comparison: Ternary vs Object

```html
<!-- Less readable: Ternary operator -->
<div :class="boxASelected ? 'demo active' : 'demo'"></div>

<!-- More readable: Object syntax -->
<div :class="{demo: true, active: boxASelected}"></div>

<!-- Best practice: Combine static 'class' with dynamic ':class' -->
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
| Both `class` + `:class` (recommended) | `<div class="demo" :class="{active: boxASelected}"></div>` |

#### Array Syntax Deep Dive

The **array syntax** allows you to combine multiple class expressions in a single `:class` binding.

**Syntax:**
```javascript
:class="[expression1, expression2, expression3, ...]"
```

**Use Cases:**

| Pattern | Example | When to Use |
|---------|---------|-------------|
| **Array with objects** | `:class="[{active: isActive}]"` | Wrapping object syntax in array (works but unnecessary) |
| **Array with static strings** | `:class="['demo', 'box']"` | Multiple static classes (but `class="demo box"` is cleaner) |
| **Array with ternary** | `:class="['demo', isActive ? 'active' : '']"` | Mix static and conditional classes |
| **Array mixing everything** | `:class="['demo', {active: isActive}, computedClass]"` | Complex scenarios with static, object, and computed |

**Practical Examples:**

```html
<!-- Example 1: Object wrapped in array (works but not recommended) -->
<div class="demo" :class="[{active: boxBSelected}]"></div>

<!-- Example 2: Better - just use object syntax directly -->
<div class="demo" :class="{active: boxBSelected}"></div>

<!-- Example 3: Array with ternary -->
<div :class="['demo', boxBSelected ? 'active' : '']"></div>

<!-- Example 4: Array mixing static, object, and ternary -->
<div :class="['demo', {active: boxBSelected}, isSpecial ? 'special' : '']"></div>

<!-- Example 5: Array with multiple objects -->
<div :class="[{active: isActive}, {disabled: isDisabled}, {loading: isLoading}]"></div>
```

**When to Use Array Syntax:**

```
Do you need to:
├─ Apply only static classes?
│  └─ Use: class="demo box" (simple HTML attribute)
│
├─ Apply conditional classes with simple logic?
│  └─ Use: :class="{active: isActive}" (object syntax)
│
├─ Mix static strings with computed properties?
│  └─ Use: :class="['base', computedClass]" (array syntax)
│
└─ Combine multiple different expression types?
   └─ Use: :class="['static', {dynamic: condition}, computed]" (array syntax)
```

**Comparison:**

```html
<!-- Object syntax (recommended for simple cases) -->
<div class="demo" :class="{active: boxBSelected}"></div>

<!-- Array with object (same result, more verbose) -->
<div class="demo" :class="[{active: boxBSelected}]"></div>

<!-- Array combining multiple things (useful for complex cases) -->
<div :class="['demo', {active: boxBSelected}, themeClass, sizeClass]"></div>
```

**Real-World Complex Example:**

```javascript
// When array syntax really shines
<div :class="[
  'button',
  `button-${size}`,
  {
    'button-active': isActive,
    'button-disabled': isDisabled
  },
  themeClass,
  customClass
]"></div>
```

**Bottom Line:**
- **Simple cases:** Use object syntax `:class="{active: condition}"`
- **Complex cases:** Use array syntax when mixing static strings, objects, and computed properties
- **Most cases:** Object syntax is cleaner and more readable

---

### 4. Advanced: Computed Properties for `:class`

For simple conditions, inline object syntax is perfect. But when logic becomes complex, **computed properties** keep templates clean and maintainable.

#### When to Use Each Approach

| Approach | Best For | Example |
|----------|----------|---------|
| **Inline Object Syntax** (recommended for simple cases) | Simple conditions (1-2 classes) | `:class="{active: boxASelected}"` |
| **Computed Property** (recommended for complex cases) | Complex logic, multiple conditions, reusability | `:class="boxAClasses"` |

#### Comparison Example

```html
<!-- Good: Inline for simple conditions -->
<div class="demo" :class="{active: boxASelected}"></div>

<!-- Also Good: Computed property for complex logic -->
<div class="demo" :class="boxAClasses"></div>
```

```javascript
// app.js
computed: {
    boxAClasses() {
        return {
            active: this.boxASelected,
            highlighted: this.boxASelected && this.isSpecial,
            disabled: !this.canInteract
        };
    }
}
```

#### Benefits of Computed Properties

| Benefit | Description | Example |
|---------|-------------|---------|
| **Clean Template** | Complex logic moved to JavaScript | Template stays readable even with 5+ class conditions |
| **Reusability** | Same logic can be used in multiple places | Use `boxAClasses` in multiple divs |
| **Testability** | Easier to unit test class logic | Test `boxAClasses()` directly in isolation |
| **Performance** | Vue caches computed values | Recalculates only when dependencies change |

#### Real-World Example: Simple vs Complex

```html
<!-- Simple condition: Use inline (no computed property needed) -->
<div class="demo" :class="{active: boxASelected}"></div>

<!-- Complex conditions: Use computed property -->
<div class="demo" :class="complexClasses"></div>
```

```javascript
// Simple: No computed property needed
data() {
    return {
        boxASelected: false
    };
}

// Complex: Computed property recommended
computed: {
    complexClasses() {
        return {
            active: this.boxASelected,
            'has-error': this.errors.length > 0,
            'is-loading': this.isLoading,
            'user-premium': this.user.isPremium,
            'dark-mode': this.theme === 'dark'
        };
    }
}
```

#### Decision Tree

```
Does your class logic have:
├─ Only 1-2 simple conditions?
│  └─ Use inline: :class="{active: boxASelected}"
│
└─ 3+ conditions OR complex logic?
   └─ Use computed: :class="computedClasses"
```

**Bottom Line:** Both methods work perfectly. Choose based on complexity:
- **Simple** → Inline object syntax (like boxes B and C)
- **Complex** → Computed property (when you need it)

---

### 5. JavaScript Expression Quoting

#### Why double quotes?
```html
<!-- Wrong: This won't work -->
<div :class="demo"></div>  <!-- Vue looks for a variable named 'demo' -->

<!-- Correct: String literal -->
<div :class="'demo'"></div>  <!-- The 'demo' string is passed -->
```

**Explanation:** `:class` expects a JavaScript expression, so you need quotes to create a string literal.

---

### 6. Toggle Boolean Values with `!` (NOT Operator)

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
| Toggle with `!` (recommended) | Click to select, click again to deselect | `this.boxASelected = !this.boxASelected` |

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
