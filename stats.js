const { createApp } = Vue

const app = createApp({
    data() {
        return {
            data: [],
            categoriesGlob: [],
            events: [],
            eventsStat: [],
            capacity: [],
            upcomingEventsStats: [],
            pastEventsStats: [],
            contUp: [],
            contPs: []
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
                    this.events = d.events
                    this.categories()
                    this.eventsStats()
                    this.pushArrays()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        pushArrays() {
            const date = this.data.currentDate
            upcomingEvents = []
            pastEvents = []
            this.data.events.forEach(e => {
                if (e.date > date) {
                    upcomingEvents.push(e)
                }
                else if (e.date < date) {
                    pastEvents.push(e)
                }
            })
            this.dataUpcomingEvents(upcomingEvents)
            this.dataPastEvents(pastEvents)
        },

        categories() {
            categories = []
            this.events.forEach(e => {
                categories.push(e.category)
            })
            categ = [...new Set(categories)];
            this.categoriesGlob = categ
        },
        eventsStats() {
            let percentageLower = 1000
            let percentageHighest = 0
            let maxi
            let min
            let perc = 0
            var max = Math.max.apply(Math, this.events.map(function (o) { return o.capacity; }));
            const largeCapacity = {
                ...this.events.find((value) => Number(value.capacity) === max)
            };
            this.events.map(e => {
                if (this.data.currentDate > e.date) {
                    perc = (e.assistance * 100) / e.capacity;
                    if (percentageHighest < perc) {
                        percentageHighest = perc
                        maxi = e
                    }
                    else if (percentageLower > perc) {
                        percentageLower = perc
                        min = e
                    }
                }
            })
            this.eventsStat.push([maxi.name, percentageHighest.toFixed(2)])
            this.eventsStat.push([min.name, percentageLower.toFixed(2)])
            this.capacity = [largeCapacity.name, max]

        },
        dataUpcomingEvents(upcomingEvents) {
            this.categoriesGlob.map(c => {
                let cont = 0;
                let percen = 0;
                cap = 0;
                esti = 0;
                upcomingEvents.forEach(e => {
                    if (c == e.category) {
                        cont = +e.price * e.estimate;
                        cap = +e.capacity;
                        esti = +e.estimate;
                    }
                });
                percen = (esti * 100) / cap;
                this.upcomingEventsStats.push(percen.toFixed(2))
                this.contUp.push(cont)
            });
        },
        dataPastEvents(pastEvents) {
            this.categoriesGlob.map(c => {
                let cont = 0;
                let percen = 0;
                cap = 0;
                assis = 0;
                pastEvents.forEach(e => {
                    if (c == e.category) {
                        cont = +e.price * e.assistance;
                        cap = +e.capacity;
                        assis = +e.assistance;
                    }
                });
                percen = (assis * 100) / cap;
                this.pastEventsStats.push(percen.toFixed(2))
                this.contPs.push(cont)
            });
        }
    },
}).mount('#app')