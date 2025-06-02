<script>
const route = useRoute()
const router = useRouter()

const postId = route.path.split('edit-')[1]

const formData = reactive({
    title: '',
    body: ''
})

onMounted(async()=>{
    try{
        const response = await fetch(`http://localhost/posts/${posstId}`)
        const post = await response.json()
        formData.title = post.title
        formData.body = post.body
    }catch(error){
        console.error('Ошибка загрузки:', error)
    }
})

const updatePost = async () => {
    try{
        const response = await fetch(`http://localhost:3001/posts/${postId}`,{
            method:'PATCH',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        if(response.ok){
            router.push(`/posts/${postId}`)
        }else{
            console.error('Ошибка сохранения')
        }
    }
}
</script>
<template>
    <div>
        <h1>Редактироавть пост {{ post.title }}</h1>
        <form @submit.pervent="updatePost">
            <input v-model="form.title" type="text" placeholder="Загловок"  required />
            <textarea v-model="form.body" placeholder="Текст" required ></textarea>
            <button type="submit">Сохранить</button>
            <NuxtLink to="/posts">Отмена</NuxtLink>
        </form>
    </div>
</template>