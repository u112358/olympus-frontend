<template>
    <div ref="tilt" class="card-container">
        <Card style="width: 20rem; overflow: hidden" class="project-card">
            <template #header>
                <img alt="card-bg" :src=opts.url />
            </template>
            <template #title>{{ opts.name }}</template>
            <template #subtitle>{{ opts.code }}</template>
            <template #content>
                <p class="m-0">
                    {{ opts.initiation_date }}
                </p>
            </template>
            <template #footer>
                <div class="flex gap-3 mt-1">
                    <AvatarGroup>
                        <Avatar label="P" size="large" shape="circle" style="background-color: #F3F011; color: #2a1261"/>
                        <Avatar label="H" size="large" shape="circle" style="background-color: #ece9fc; color: #2a1261" />
                        <Avatar icon="pi pi-user" class="mr-2" size="large" shape="circle" />
                        <Avatar label="+2" shape="circle" size="large" />
                    </AvatarGroup>
                    <Button label="详情" class="w-full" @click="onClick(opts.id)" />
                </div>
            </template>

        </Card>
    </div>
</template>

<style>
.card-container {
    width: max-content;
    /* border-radius: 10px; */
    /* box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3); */
    /* background-color: rgba(255, 255, 255, 0); */
}

.project-card {
    margin: 20px;
}

.project-card img {
    max-width: 20rem;
}

.project-card p {
    white-space: pre-wrap;
    /* CSS 保留空白符，并允许自动换行 */
    word-wrap: break-word;
    /* 如果单词过长，允许在单词内部进行断行 */
}
</style>

<script>
import axios from '@/service/axios';
import Card from 'primevue/card';
import VanillaTilt from 'vanilla-tilt';
import router from '@/router';
export default {
    components: {
        Card,
    },

    data(){
        return{
            
        }
    },

    props: {
        opts: Object,
    },
    mounted() {
        VanillaTilt.init(this.$refs.tilt, {
            max: 3,
            speed: 1,
            glare: true,
            "max-glare": 0.12,
            transition: true,
            scale: 1.02,
        });
    },
    methods: {
        onClick(pk) {
            router.push({name:'projectDetail', params:{id:pk}})
        }
    }

}
</script>