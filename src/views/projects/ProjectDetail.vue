<template>
    <Card>
        <template #header>
            <img alt="project-snapshot" :src=project.snapshot_url width="120px" />
        </template>

        <template #title>{{ project.name }}-{{ project.code }}</template>
        <template #content>
            <div class="card overflow-x-auto">
                <OrganizationChart :value="data" collapsible>
                    <template #person="slotProps">
                        <div class="flex flex-column">
                            <div class="flex flex-column align-items-center">
                                <!-- <Avatar :alt="slotProps.node.data.name" :image="slotProps.node.data.image" shape="circle"
                                    class="mb-3 w-3rem h-3rem" /> -->
                                <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
                                <span>{{ slotProps.node.data.title }}</span>
                            </div>
                        </div>
                    </template>
                    <template #default="slotProps">
                        <span>{{ slotProps.node.label }}</span>
                    </template>
                </OrganizationChart>
            </div>
        </template>

    </Card>

</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from '@/service/axios'
const props = defineProps(['id'])
const id = ref(props.id);
const project = reactive({})
const data = ref({})


onMounted(() => {
    const url = `http://127.0.0.1:8000/api/projects/${id.value}/detail/`
    axios.get(url).then(response => {
        Object.assign(project, response.data)
        project.snapshot_url = `${import.meta.env.VITE_SERVER_BASE_URL}${project.snapshot}`
        data.value = project.team
    }).catch(error => {
        console.error(error)
    })
})





</script>