<template>

<svg :width="width" :height="height" :style="{'background':background}">
    <!-- sections -->
    <template v-for="(item,i) in ranges">
        <rect :key="i" :x="calcX(item.min)" :y="fnt_size+top_margin" :width="calcW(item)" :height="height-fnt_size*2-bottom_margin" :fill="item.background" />
    </template>
    <!-- divisions -->
    <template v-for="(item,i) in divisions">
        <line :key="i+1000" :x1="calcX(item.pos)" :y1="fnt_size+top_margin" :x2="calcX(item.pos)" :y2="fnt_size*2+4" stroke-width="2" stroke="rgb(0,0,0)"/>
        <text :key="i+2000" :x="calcX(item.pos)" :y="fnt_size" :style="{'fill':'#000000', 'stroke':'none', 'font-size':fnt_size+'px'}" text-anchor="middle">{{item.pos}}</text>
    </template>
    <!-- subdivisions -->
    <template v-for="(item,i) in subdivisions">
        <line :key="i+3000" :x1="calcX(item.pos)" :y1="fnt_size+top_margin" :x2="calcX(item.pos)" :y2="fnt_size*2" stroke-width="1" stroke="rgb(0,0,0)"/>
    </template>


    <!-- left min -->
    <text :x="calcX(rangeMinMax()[0])" :y="fnt_size" :style="{'fill':'#000000', 'stroke':'none', 'font-size':fnt_size+'px'}" text-anchor="middle">{{rangeMinMax()[0]}}</text>
    <line :x1="left_margin" :y1="fnt_size+2" :x2="left_margin" :y2="height-fnt_size" stroke-width="1" stroke="rgb(0,0,0)"/>

    <!-- right max -->
    <text :x="calcX(rangeMinMax()[1])" :y="fnt_size" :style="{'fill':'#000000', 'stroke':'none', 'font-size':fnt_size+'px'}" text-anchor="middle">{{rangeMinMax()[1]}}</text>
    <line :x1="calcX(rangeMinMax()[1])" :y1="fnt_size+2" :x2="calcX(rangeMinMax()[1])" :y2="height-fnt_size" stroke-width="1" stroke="rgb(0,0,0)"/>

    <!-- value -->
    <line :x1="calcX(value)" :y1="height-arrow_height" :x2="calcX(value)+5"  :y2="height-fnt_size-2" stroke-width="3" stroke="rgb(0,0,0)"/>
    <line :x1="calcX(value)" :y1="height-arrow_height" :x2="calcX(value)+2"  :y2="height-fnt_size-2" stroke-width="3" stroke="rgb(0,0,0)"/>
    <line :x1="calcX(value)" :y1="height-arrow_height-3" :x2="calcX(value)"  :y2="height-fnt_size-2" stroke-width="2" stroke="rgb(0,0,0)"/>
    <line :x1="calcX(value)" :y1="height-arrow_height" :x2="calcX(value)-2"  :y2="height-fnt_size-2" stroke-width="3" stroke="rgb(0,0,0)"/>
    <line :x1="calcX(value)" :y1="height-arrow_height" :x2="calcX(value)-5"  :y2="height-fnt_size-2" stroke-width="3" stroke="rgb(0,0,0)"/>
    <text :x="calcX(value)" :y="height-1" :style="{'fill':'#000000', 'stroke':'none', 'font-size':(fnt_size+2)+'px'}" text-anchor="middle">{{value}}</text>

</svg>

</template>

<script>
export default {
    props:{
        background: {type:String, default: 'none'},
        width: {type:Number, default: 800},
        height: {type:Number, default: 100},
        ranges: {type:Array, default:()=>[ {background:'#990000', min:5000, max:10000}, {background:'#009900', min:9000, max:9500} ]},
        value: {type:Number, default: 0},
        sections: {type:Array, default:()=>[] },
        divs: {type:Number, default: 5},
        subdivs: {type:Number, default: 3},
        font: {type:Number, default: 16},
    },
    watch:{
        "value"(){
            this.refresh();
        },
        "ranges"(){
            this.refresh();
        }
    },    

    data() {
        return {
            fnt_size:16,
            arrow_height:32,
            top_margin:6,
            bottom_margin:14,
            left_margin:10,
            right_margin:60,
            divisions:[],
            subdivisions:[],
        }
    },

    methods: {
        refresh(){
            let min_max = this.rangeMinMax();
            let spread = min_max[1] - min_max[0];
            this.left_margin = String(min_max[0]).length * (this.fnt_size/4);
            this.right_margin = String(min_max[1]).length * (this.fnt_size/2);
            this.fnt_size = this.font;
            this.arrow_height = 38;
            if (this.height<85) this.arrow_height = 34;
            if (this.height<65) this.arrow_height = 28;
            if (this.height<55) this.arrow_height = 20;

            this.divisions = [];
            this.subdivisions = [];
            let val = min_max[0];
            let step = Math.round(spread/this.divs);
            for (let i=1; i<this.divs; i++) {
                let subval = val;
                for (let n=1; n<this.subdivs; n++) {
                    subval += Math.round(step / this.subdivs);
                    this.subdivisions.push({ pos:subval });
                }
                val += step;
                this.divisions.push({ pos:val });
            }
                let subval = val;
                for (let n=1; n<this.subdivs; n++) {
                    subval += Math.round(step / this.subdivs);
                    this.subdivisions.push({ pos:subval });
                }
        },

        rangeMinMax(){
            let min_max=[this.ranges[0].min, this.ranges[0].max];
            for (let item of this.ranges) {
                if (min_max[0] > item.min) min_max[0]=item.min;
                if (min_max[1] < item.max) min_max[1]=item.max;
            }
            return min_max;
        },
        calcX(x){
            let min_max = this.rangeMinMax();
            let spread = min_max[1] - min_max[0];
            let factor = spread / (this.width-this.right_margin);
            return ((x-min_max[0]) / factor) +this.left_margin;
        },
        calcW(item){
            let min_max = this.rangeMinMax();
            let spread = min_max[1] - min_max[0];
            let factor = spread / (this.width-this.right_margin);
            return (item.max-item.min) / factor;
        },
    },

    computed: {
    },

    mounted(){
        this.refresh();
    }
}
</script>

<style scoped>

</style>