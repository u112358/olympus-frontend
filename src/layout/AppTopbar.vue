<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const UserAvatarUrl = computed(()=>{   
        const user_info = JSON.parse(localStorage.getItem('user_info'));
        return `${import.meta.env.VITE_SERVER_BASE_URL}${user_info['avatar']}`;
    }
)
onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const goToUser= ()=>{
    console.log('1')
    router.push({name:'profile'})
}

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

// const onTopBarMenuButton = () => {
//     topbarMenuActive.value = !topbarMenuActive.value;
// };
// const topbarMenuClasses = computed(() => {
//     return {
//         'layout-topbar-menu-mobile-active': topbarMenuActive.value
//     };
// });

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>SAKAI</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>
        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button class="p-link layout-topbar-button">
                <Avatar :image=UserAvatarUrl shape="circle" size="large" @click="goToUser()" ></Avatar>
                <span>Profile</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
