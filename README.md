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
```

#### Object syntax breakdown
```javascript
{
  demo: true,        // 'demo' class is always applied
  active: boxASelected  // 'active' class applied only when boxASelected is true
}
```

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
            if (box === 'A') {
                this.boxASelected = true;
            } else if (box === 'B') {
                this.boxBSelected = true;
            } else if (box === 'C') {
                this.boxCSelected = true;
            }
        }
    }
});
```

```html
<!-- index.html -->
<div :class="{demo: true, active: boxASelected}" @click="boxSelected('A')"></div>
<div :class="{demo: true, active: boxBSelected}" @click="boxSelected('B')"></div>
<div :class="{demo: true, active: boxCSelected}" @click="boxSelected('C')"></div>
```

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Why `:style` requires JavaScript object syntax instead of CSS? | Vue evaluates the expression as JavaScript, not CSS |
| Ternary operator vs object syntax for `:class` | Use object syntax for better readability |
| When to use quotes in Vue bindings | Use quotes when you need a string literal instead of a variable |

---

## Key Takeaways

1. **Use shorthands:** `@` for `v-on:`, `:` for `v-bind:`
2. **Prefer object syntax for `:class`** - it's more readable and maintainable
3. **Remember:** Vue directives with `:` or `@` expect JavaScript expressions, not plain text
