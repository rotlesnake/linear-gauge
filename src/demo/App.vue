<template>
  <div>
     <LinearGauge :ranges="ranges" :width="800" :height="80" :divs="10" :subdivs="4" :value="val" :font="16" />
  </div>
</template>

<script>
import LinearGauge from '../LinearGauge.vue';

export default {
    components: {
      LinearGauge,
    },
    data: () => ({
            ranges:[ 
                {background:'#990000', min:0, max:1000}, 
                {background:'#009900', min:500, max:900},
                {background:'#999900', min:900, max:1000} 
            ],
            val:800,
    }),
    mounted() {
    },
    methods: {
    },
};
</script>

