<template>
    <div>
        <user-header></user-header>

        <div  class=" stats">
            <h1 class="h3_heading">STATISTICS</h1>
            <div class="center">
                 <div class="container">
                        <div class="container-items"><p class="block">{{facultyProfileOne.fvisits}} </p> <p class="block"> Faculty Visits</p> </div>
                        <div class="container-items"><p class="block">{{facultyProfileOne.tcount}} </p><p class="block"> Other Visits</p></div>
                        <div class="container-items"><p class="block">{{facultyProfileOne.fvisits+facultyProfileOne.tcount}} </p><p class="block"> Total Visits</p> </div>
                </div>            
                <div class="tcard">
                   <div class="outer_container">
            
                    <div class="centergraph">
                        <h3 class="h3_heading">Profile View Count Ratio </h3>
                        <apexchart width="380" type="donut" :options="dchartOptions" :series="dseries"></apexchart>
                    </div>
                   </div>


                </div>
            </div>
            <div class="center">
                <div class="card">
                    <div class="Week" v-if="week">
                        <h2 class="card_heading">Week-Wise Statistics</h2>
                        <div class="tab">
                            <button  type="button" name="facultyViewCount" @click="WeeklyTab()">Faculty View Counts</button>
                            <button type="button" name="otherViewCount" @click="WeeklyTab()">Other View Counts</button>
                        </div>

                        <div v-if="!facultyWeekly">
                            <h3 class="h3_heading">Profile view counts(Weekly)</h3>
                            <apexchart width="800" height="500" type="bar" :options="chartOptions" :series="series"></apexchart>
                        </div>
                        <div v-if="facultyWeekly">
                            <h3 class="h3_heading">Profile view counts of other faculties(Weekly)</h3>
                            <apexchart  width="800" height="500" type="bar" :options="fchartOptions" :series="fseries"></apexchart>
                        </div>
                        <div class="tab">
                            <button  type="button" name="weekly" @click="ChangeTo()">Weekly</button>
                            <button type="button" name="monthly" @click="ChangeTo()">Monthly</button>
                        </div>
                    </div>
                    <div  v-if="!week" class="Month">
                        <h2 class="card_heading">Month-Wise Statistics</h2>
                        <div class="tab">
                            <button  type="button" @click="MonthTab()">Faculty View Counts</button>
                            <button type="button" @click="MonthTab()">Other View Counts</button>
                        </div>
                        <div v-if="!facultyMonth">
                            <h3 class="h3_heading">Profile view counts(Monthly)</h3>
                            <apexchart  width="800" height="500" type="bar" :options="mchartOptions" :series="mseries"></apexchart>
                        </div>
                        <div  v-if="facultyMonth">
                            <h3 class="h3_heading">Profile view counts of other faculties(Monthly)</h3>
                            <apexchart  width="800" height="500" type="bar" :options="fmchartOptions" :series="fmseries"></apexchart>
                        </div>     
                        <div class="tab">
                            <button  type="button" @click="ChangeTo()">Weekly</button>
                            <button type="button" @click="ChangeTo()">Monthly</button>
                        </div>                 
                    </div>


                </div>
          </div>
            <div class="center">
                 <div class="container">
                        <div class="container-items"><p class="block">{{facultyProfileOne.fpublicationCount}} </p> <p class="block"> Faculty Publication Visits</p> </div>
                        <div class="container-items"><p class="block">{{facultyProfileOne.npublicationCount}} </p><p class="block"> Other Publication Visits</p></div>
                        <div class="container-items"><p class="block">{{facultyProfileOne.fpublicationCount+facultyProfileOne.npublicationCount}} </p><p class="block"> Total Publication Visits</p> </div>
                </div>            
                <div class="pcard">
                   <div class="outer_container">
            
                    <div class="centergraph">
                        <h3 class="h3_heading">Publication View Count Ratio </h3>
                        <apexchart width="380" type="donut" :options="publicationchartOptions" :series="publicationseries"></apexchart>
                    </div>
                   </div>


                </div>
            </div>          
            
        </div>
       
    </div>

</template>
<script>

export default {

    data() {
        return {
            facultyId: "",
            loaded:false,
            facultyWeekly:true,
            facultyMonth:true,
            facultyProfileOne:{},
            week:true,
            chartOptions: {
                chart: { id: "vuechart-example",fontFamily: 'Montserrat, sans-serif'},
                dataLabels: {
                             style: {
                                colors: ['#0d0d0d',] }
                        },
                yaxis:{title:{text:"No of Profile Visits"}},                
                xaxis: {
                     title:{text:'Days'},
                    categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    },
                },
            series: [
                {
                     name: "Views",
                     data: [this.ViewsEachDay('sunday'), this.ViewsEachDay('monday'), this.ViewsEachDay('tuesday'), this.ViewsEachDay('wednesday'), this.ViewsEachDay('thursday'), this.ViewsEachDay('friday'), this.ViewsEachDay('saturday')],
                },
            ],
            fchartOptions: {
                chart: { fontFamily: 'Montserrat, sans-serif'},
                dataLabels: {
                             style: {
                                colors: ['#0d0d0d',] }
                        },  
                yaxis:{title:{text:"No of Profile Visits"}},              
                xaxis: {
                    title:{text:'Days'},
                    categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    },
                },
            fseries: [
                {
                     name: "Views",
                     data: [this.ViewsEachDay('fsunday'), this.ViewsEachDay('fmonday'), this.ViewsEachDay('ftuesday'), this.ViewsEachDay('fwednesday'), this.ViewsEachDay('fthursday'), this.ViewsEachDay('ffriday'), this.ViewsEachDay('fsaturday')],
                },
            ], 
            mchartOptions: {
                chart: { fontFamily: 'Montserrat, sans-serif'},
                dataLabels: {
                             style: {
                                colors: ['#0d0d0d',] }
                        }, 
                yaxis:{title:{text:"No of Profile Visits"}},               
                xaxis: {
                    title:{text:'Months'},
                    categories: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                    },
                },
            mseries: [
                {
                     name: "Views",
                     data: [this.ViewsEachMonth('January'), this.ViewsEachMonth('February'), this.ViewsEachMonth('March'), this.ViewsEachMonth('April'), this.ViewsEachMonth('May'), this.ViewsEachMonth('June'), this.ViewsEachMonth('July'),this.ViewsEachMonth('August'),this.ViewsEachMonth('September'),this.ViewsEachMonth('October'),this.ViewsEachMonth('November'),this.ViewsEachMonth('December')],
                },
            ],
            fmchartOptions: {
                chart: { fontFamily: 'Montserrat, sans-serif'},
                dataLabels: {
                             style: {
                                colors: ['#0d0d0d',] }
                        },
                yaxis:{title:{text:"No of Profile Visits"}},
                xaxis: {
                    title:{text:'Months'},
                    categories: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                    },
                },
            fmseries: [
                {
                     name: "Views",
                     data: [this.ViewsEachMonth('fJanuary'), this.ViewsEachMonth('fFebruary'), this.ViewsEachMonth('fMarch'), this.ViewsEachMonth('fApril'), this.ViewsEachMonth('fMay'), this.ViewsEachMonth('fJune'), this.ViewsEachMonth('fJuly'),this.ViewsEachMonth('fAugust'),this.ViewsEachMonth('fSeptember'),this.ViewsEachMonth('fOctober'),this.ViewsEachMonth('fNovember'),this.ViewsEachMonth('fDecember')],
                },
            ],  
            dchartOptions: {
                       chart: {fontFamily: 'Montserrat, sans-serif'},
                       colors:['#e76f51', '#e9c46a'],
                       dataLabels: {
                             style: {
                                colors: ['#e6e6e6',] }
                        },
                       labels:['Faculty Visits','Others']
                        },
            dseries: [this.views('fvisits'), this.ViewsEachMonth('tcount')],   
            publicationchartOptions: {
                       chart: {fontFamily: 'Montserrat, sans-serif'},
                       colors:['#e76f51', '#e9c46a'],
                       dataLabels: {
                             style: {
                                colors: ['#e6e6e6',] }
                        },
                       labels:['Faculty Visits','Others']
                        },
            publicationseries: [this.views('npublicationCount'), this.ViewsEachMonth('fpublicationCount')],                 
        };
  },

    created() {
        this.facultyId = this.$route.params.id;
         this.loadfacultyprofile();
         this.facultyProfileOne=this.$store.getters["facultyprofile"];
    },

    methods:{
        WeeklyTab(){
            this.facultyWeekly=!this.facultyWeekly;
        
        },
        MonthTab(){
            this.facultyMonth=!this.facultyMonth;
        },    
        ChangeTo(){
            this.week=!this.week;
        }, 
        views(person){
            var facultyProf=this.$store.getters["facultyprofile"];  
            if(facultyProf[person]==null){
                return 0;
            }
            return facultyProf[person];
        },
         ViewsEachDay(day){
            var facultyProf=this.$store.getters["facultyprofile"]; 
            if(facultyProf[day]==null){
                return 0;
            }
            return facultyProf[day];
        },
         ViewsEachMonth(month){
           
            var facultyProf=this.$store.getters["facultyprofile"]; 
            if(facultyProf[month]==null){
                return 0;
            }
            return facultyProf[month];
        },        

        async loadfacultyprofile() 
            {

                await this.$store.dispatch("loadthefacultyprofile",{id:this.facultyId});
                console.log("finished");
                this.loaded=true
            },

        }
    }
</script>

<style scoped>
.centergraph{
    display: flex;
    justify-content: center;
    align-items: center;
}
.block{
    display: inline-block;
    padding-left:2px;
    font-family: 'Montserrat', sans-serif;     
    font-weight:600;   
}
.outer_container{
    width: 100%;
}
.container{
   
    background-color: #d1cccc;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.container-items{
    display: flex;
    width:100%;

    border: 2px solid rgb(105, 102, 102);
 
    justify-content: center;
    align-items: center;
}
.h3_heading{
        font-family: 'Quicksand', sans-serif;
        text-align: center;
}
.card_heading{
    font-family: 'Quicksand', sans-serif;
    text-align: center;
}
.stats{
    position: absolute;
    margin: 0;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -38%);
    
}
.Month{
    height: 800px;
    width: 800px;
}
.Week{
    height: 800px;
    width: 800px;
}
.card {
  position: relative;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  background-color: #f6f6f6;
  width: 60rem;
  display: flex;
  justify-content: center;
}
.tcard {
  position: relative;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0 auto;
  background-color: #f6f6f6;
  width: 60rem;
  display: flex;
  justify-content: center;
}
.pcard {
  position: relative;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin-bottom: 20px;
  background-color: #f6f6f6;
  width: 60rem;
  display: flex;
  justify-content: center;
}
.tab {
  overflow: hidden;
    border-radius: 100px;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
}
.tab button {
  font-family: 'Montserrat', sans-serif;     
  font-weight:600;     
  border-radius: 100px;
  background-color: inherit;
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}
.tab button:hover {
  background-color: #ddd;
}
.tab button.active {
  background-color: #ccc;
}
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}


</style>