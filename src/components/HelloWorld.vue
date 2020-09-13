<template>
  <div class="hello">
     <section class="row">
        <div class="small-6 columns">
            <h1 class="text-center">{{playerInformation.name}}</h1>
            <div class="healthbar">
                <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;" :style="{width:playerInformation.health+'%'}">
                      %{{playerInformation.health}}
                </div>
            </div>
        </div>
        <div class="small-6 columns">
            <h1 class="text-center">{{monsterInformation.name}}</h1>
            <div class="healthbar">
                <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;" :style="{width:monsterInformation.health +'%'}">
                      %{{monsterInformation.health}}

                </div>
            </div>
        </div>
    </section>
    <section class="row controls" v-if="newGameShow">
        <div class="small-12 columns">
            <button id="start-game" @click="newGame()">YENİ OYUN</button>
        </div>
    </section>
    <section class="row controls" v-if="!newGameShow">
        <div class="small-12 columns">
            <button id="attack" @click="attack">SALDIRI</button>
            <button id="special-attack" @click="specialAttack">ÖZEL SALDIRI</button>
            <button id="heal" @click="heal">İLK YARDIM</button>
            <button id="give-up" @click="giveup">PES ET!</button>
        </div>
    </section>
    <section class="row log" v-if="!newGameShow">
        <div class="small-12 columns">
            <ul>
                <li :class="x.type"   v-for="(x) in  attackList " v-bind:key="x">
                      {{x.text}}
                </li>
            </ul>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      playerInformation : {name:'Barış Bıyık',health:100,attack:null},
      monsterInformation : {name:'Canavar',health:100,attack:null},
      attackList : [],
      newGameShow :true,
      attackType:''
    }
  },
 methods: {
    playerNameMethod () {
      return "from method";
    },
    newGame(){
      this.newGameShow = false
      this.playerInformation.health = 100;
      this.monsterInformation.health = 100;
      this.attackList = []
    },
    attack()
    {
       this.playerInformation.attack = Math.floor(Math.random()*10); //multiply to generate random number between 0, 100
       this.monsterInformation.attack = Math.floor(Math.random()*10);

       this.monsterInformation.health -= this.playerInformation.attack
       this.playerInformation.health -= this.monsterInformation.attack

      this.attackList.push({type:"player-turn",text:"Canavarın Canını Azalttın " + this.playerInformation.attack })

      this.attackList.push({type:"monster-turn",text:"Canavar Saldırısı "+this.monsterInformation.attack})

      this.checkResult();

    },
    heal()
    {
      
       this.monsterInformation.attack = Math.floor(Math.random()*20);

        var addedHealth = Math.floor(Math.random()*15)
        this.playerInformation.health += addedHealth;
        this.playerInformation.health-=this.monsterInformation.attack;

        this.attackList.push({type:"player-turn",text:"İlkyardım aldın " + addedHealth })
        this.attackList.push({type:"monster-turn",text:"Canavar Saldırısı "+this.monsterInformation.attack})



    },
    specialAttack(){
      this.playerInformation.attack = Math.floor(Math.random()*20); //multiply to generate random number between 0, 100
       this.monsterInformation.attack = Math.floor(Math.random()*10);

       this.monsterInformation.health -= this.playerInformation.attack
       this.playerInformation.health -= this.monsterInformation.attack

        this.attackList.push({type:"player-turn",text:"Özel Saldırı " + this.playerInformation.attack })

      this.attackList.push({type:"monster-turn",text:"Canavar Saldırısı "+this.monsterInformation.attack})

      this.checkResult();
    },
    addhealth()
    {
       this.playerInformation.health += 15;

       this.attack();
    },
    giveup(){
        alert("kaybettin");
        this.newGame();
    },
    checkResult()
    {
     if(this.playerInformation.health < 0 && this.monsterInformation.health > this.playerInformation.health)
       {
         alert("Oyunu monster kazandı");
         this.playerInformation.health = 0

         if(this.monsterInformation.health <0)
         {
           this.monsterInformation.health = 0;
         }

         this.newGameShow = true;

       }

       if(this.monsterInformation.health <0 && this.playerInformation.health>  this.monsterInformation.health)
       {
         alert("Oyunu player kazandı");
         this.monsterInformation.health = 0

         if(this.playerInformation.health < 0 )
         {
           this.playerInformation.health = 0
         }

         this.newGameShow = true;
       }
    }
  }

}
</script>