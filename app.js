const app = Vue.createApp({
    data() {
        return {
            // Boolean flags to track whether each box is selected
            BoxASelected: false,
            BoxBSelected: false,
            BoxCSelected: false
        }
    },
    methods: {
        // Method to handle box selection - sets the corresponding box's selected flag to true based on the box parameter
        boxSelected(box) {
            if (box === 'A') {
                this.BoxASelected = true;
            } else if (box === 'B') {
                this.BoxBSelected = true;
            } else if (box === 'C') {
                this.BoxCSelected = true;
            }
        }
    }

});

app.mount("#styling");