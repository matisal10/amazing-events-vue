const { createApp } = Vue

const app = createApp({
    data() {
        return {
            data: [],
            e: [],
            id: null
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
                    data = d
                    this.obtainId()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        obtainId() {
            const variable = window.location.search
            const urlParams = new URLSearchParams(variable);
            this.id = urlParams.get('id');
            this.addData()
        },
        addData(){
            this.e = data.events.find(e=> e._id == this.id)
        }
        
    },
    computed:{

        
    }
}).mount('#app')