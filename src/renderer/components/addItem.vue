<template>
    <div class="container pendding">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Date</label>
                    <div class="control">
                        <input type="text" class="input" v-model="item_date">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input type="text" class="input" v-model="item_title">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Content</label>
                    <div class="control">
                        <input type="text" class="input" v-model="item_content">
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <button class="button" @click='InsertItem'>Commit</button>
                    <button class="button" @click='Cancel'>Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const {ipcRenderer} = require('electron')
    export default{
        data(){
            return{
                item_date: '',
                item_title: '',
                item_content: ''
            }
        },
        methods:{
            InsertItem(){
                let _self = this 
                _self.$db.insert({
                    date: _self.item_date,
                    title: _self.item_title,
                    content: _self.item_content
                },(err,docs)=>{
                    if (err) {
                        console.log(err)
                        ipcRenderer.sendSync('close-insertWindow','')
                    }
                    ipcRenderer.sendSync('close-insertWindow','')
                })
            },
            Cancel(){
                ipcRenderer.sendSync('close-insertWindow','close')
                console.log('clicked')
            }
        }
    }
</script>
<style>
    @import "~bulma/css/bulma.css";
    .container{
        padding: 5px
    }
</style>