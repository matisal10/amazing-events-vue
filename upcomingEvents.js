const { createApp } = Vue

const app = createApp({
    data() {
        return {
            data: [],
            events: [],
            arrayE: [],
            categ: [],
            arrayUpcoming:[],
            input: '',
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            fetch("https://mindhub-xj03.onrender.com/api/amazing")
                .then(response => response.json())
                .then(d => {
                    this.data = d
                    this.upcomingEvenstArray()
                    
                })
                .catch(error => {
                    console.error(error);
                });
        },

        upcomingEvenstArray() {
            const date = this.data.currentDate
            this.data.events.forEach(e => {
                if (e.date > date) {
                    this.arrayE.push(e)
                }
                
            })
            this.arrayUpcoming = this.arrayE
            this.events = this.arrayE
            this.categories()
        },

        categories() {
            category = []
            this.events.forEach(e => {
                category.push(e.category)
            })
            this.categ = [...new Set(category)];
        },

        route(id) {
            window.location.assign(`/details.html?id=${id}`);
            console.log(id)
        },
        
        search(events) {
            if (this.input.length != 0) {
                this.arrayE = events.filter(e => {
                    return e.name.toLowerCase().indexOf(this.input) > -1;
                })
            }
            else {
                this.arrayE = this.events
            }
        },

        filterCategory() {
            let arrayC = []
            let checkboxs = document.querySelectorAll("input[type='checkbox']")
            let arraycheck = Array.from(checkboxs)
            let checkChecked = arraycheck.filter(check => check.checked)
            if (checkChecked.length == 0) {
                this.arrayE = this.arrayUpcoming
                this.events = this.arrayUpcoming
            }
            else {
                let arrayCheckeds = checkChecked.map(c => c.value)
                arrayC = this.events.filter(e => {
                    return arrayCheckeds.includes(e.category)
                })
                this.arrayE = arrayC
                this.events = this.arrayE
            }
        },

    }
}).mount('#app')