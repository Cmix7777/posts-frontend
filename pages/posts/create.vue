<script setup>
import {ref} from 'vue'

const title = ref('')
const body = ref('')
const error = ref('')

const createPost = async() => {try{
    const newPost = await $fetch('http://loacalhost:3001/posts',{
    method:'POST',
    body:{
        'Content-Type': 'application/json'},
        body:{
            title: title.value,
            body: body.value,
            createdAt: new Date().toISOString()
        }
})
    console.log('Создан новый пост: ', newPost)
    await navigateTo(`/posts/${newPost.id}`)
    } catch(err){
        error.value = `Ошибка:  $(err.message)`
        console.error('Ошибка при создани поста: ', err)
    }
}
</script>

<template>
    <div>
        <h1>Создать пост</h1>
        <form @submit.pervent="createPost">
            <input type="text" v-model="title" placeholder="Загаловок">
            <textarea v-model="body" placeholder="текст поста"></textarea>
            <button type="submit">Создать пост</button>
        </form>
    </div>
</template>

<style>

</style>