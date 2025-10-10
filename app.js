const app = Vue.createApp({
    data() {
        return {
            // Boolean flags to track whether each box is selected
            boxASelected: false,
            boxBSelected: false,
            boxCSelected: false
        }
    },
    methods: {
        // Method to handle box selection - sets the corresponding box's selected flag to true based on the box parameter
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

app.mount("#styling");