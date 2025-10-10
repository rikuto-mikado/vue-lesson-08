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
        // Method to handle box selection - toggles the corresponding box's selected state
        // Using ! (NOT operator) to toggle: if true becomes false, if false becomes true
        // This allows clicking the same box again to deselect it
        boxSelected(box) {
            if (box === 'A') {
                this.boxASelected = !this.boxASelected;
            } else if (box === 'B') {
                this.boxBSelected = !this.boxBSelected;
            } else if (box === 'C') {
                this.boxCSelected = !this.boxCSelected;
            }
        }
    }

});

app.mount("#styling");