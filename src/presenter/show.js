const Show={  //vue component
    props: ["hash"], 

    data(){return {hashState : window.location.hash}},
    methods:{hashStateACB(){this.hashState=window.location.hash}},

    created(){window.addEventListener("hashchange", this.hashStateACB.bind(this))},

    unmounted(){window.removeEventListener("hashchange", this.hashStateACB.bind(this))},

    render(){
        

    return (<div class={(this.hashState !== this.hash)?"hidden":""} >
    {this.$slots.default()} </div>);
    },
};
export default Show; //show used in app for components such as sideMenu