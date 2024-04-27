<template>
    <div class="container">
        <div v-for="proj in projectData" :key="proj.id">
            <ProjectCard :opts="proj"></ProjectCard>
        </div>
    </div>
</template>

<script setup>
import axios from '@/service/axios';
import { onMounted, reactive,ref } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
const projectData = ref([])

onMounted(() => {
    const url = `http://127.0.0.1:8000/api/projects/`
    axios.get(url,)
        .then(response => {
            if (response.data.count >= 3) {
                for (let i = 0; i < 3; i++) {
                    const project = response.data.results[i]
                    console.log(project)
                    projectData.value.push({
                        name: project.name,
                        code: project.code,
                        initiation_date: project.completion_date_est,
                        url: project.snapshot,
                        id: project.id
                    });
                }
            }
        }
        )
        .catch(error => {
            console.log(error)
        })
});
</script>

<style scoped>
.container {
    display: flex;
    height: 80vh;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-overlay);
    border-radius: 12px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
}
</style>