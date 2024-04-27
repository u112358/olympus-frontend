<template>
    <div ref="tilt" class="card-container">
        <Card style="width: 18rem; overflow: hidden" class="user-card">
            <template #header>
                <img alt="card-bg" :src=card_bg_url />
            </template>
            <template #title>{{ name }}-{{ title }}</template>
            <template #subtitle>{{ email }}</template>
            <template #content>
                <p class="m-0">
                    {{ expertise }}
                </p>
            </template>
            <!-- <template #footer>
                <div class="flex gap-3 mt-1">
                    <Button label="Cancel" severity="secondary" outlined class="w-full" />
                    <Button label="Save" class="w-full" />
                </div>
            </template> -->
        </Card>
    </div>
</template>

<style scoped>
.card-container {
    width: max-content;
    border-radius: 10px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0);
    text-align: center;
}

.user-card {
    padding: 0 0 5px 0;
}

.user-card img {
    max-width: 18rem;
}

.user-card p {
    white-space: pre-wrap;
    /* CSS 保留空白符，并允许自动换行 */
    word-wrap: break-word;
    /* 如果单词过长，允许在单词内部进行断行 */
}
</style>

<script>
import Card from 'primevue/card';
import VanillaTilt from 'vanilla-tilt';
export default {
    components: {
        Card,
    },

    props: {
        card_bg_url: String,
        name: String,
        title: String,
        expertise: String,
        email: String,
    },
    mounted() {
        VanillaTilt.init(this.$refs.tilt, {
            max: 3,
            speed: 1000,
            glare: true,
            "max-glare": 0.5,
            transition: true,
            scale: 1.02,
        });
    },

}
</script>