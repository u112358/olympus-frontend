<template>
  <div class="card p-fluid">
    <div class="formgrid grid ">
      <div class="field col-4">
        <h5>My Profile</h5>
        <label for="name2">Email</label>
        <InputText id="name2" type="text" v-model="userInfo.email" />
        <label for="email2">Expertise</label>
        <InputText id="email2" type="text" v-model="userInfo.expertise" />
        <h5>Avatar</h5>
        <Toast />
        <FileUpload name="demo[]" @uploader="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000"
          customUpload />
        <h5></h5>
        <Button label="Submit" @click="updateProfile()"></Button>
      </div>
      <div class="field col-6 col-offset-2">
        <UserCard :name="userInfo.name" :card_bg_url="userInfo.cardBgUrl" :expertise="userInfo.expertise"
          :email="userInfo.email" :title="userInfo.title">
        </UserCard>
      </div>
    </div>
  </div>
</template>



<script setup>
import { reactive, onMounted } from 'vue';
import UserCard from "@/components/UserCard.vue";
import axios from "@/service/axios";
import { useToast } from 'primevue/usetoast'
const userInfo = reactive({});
const toast = useToast();

onMounted(() => {
  const storedUserInfo = localStorage.getItem('user_info');
  if (storedUserInfo) {
    const parsedUserInfo = JSON.parse(storedUserInfo);
    console.log(storedUserInfo)
    console.log(parsedUserInfo)
    Object.assign(userInfo, parsedUserInfo);  // 赋值操作
    userInfo.cardBgUrl = `${import.meta.env.VITE_SERVER_BASE_URL}${userInfo.avatar}`;  // 更新属性
  }
});

const updateProfile = () => {
  const url = `http://127.0.0.1:8000/api/employees/${userInfo.id}/`;
  axios.patch(url, {
    "email": userInfo.email,
    "expertise": userInfo.expertise,
  })
    .then(response => {
      console.log('Employee updated successfully:', response.data);
      axios.get(`http://127.0.0.1:8000/api/employees/${userInfo.id}/basicInfo/`)
        .then(response => {
          const newUserInfo = response.data
          localStorage.setItem('user_info', JSON.stringify(newUserInfo))
          window.location.reload()
          toast.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated', life: 3000 });
        }).catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      console.error('Error updating employee:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Update Failed', life: 3000 });
    });
};

const onUpload = (event) => {
  const formData = new FormData();
  if (event.files && event.files.length > 0) {
    const file = event.files[0];
    formData.append('avatar', file);
    console.log(userInfo.id)
    axios.post(`http://127.0.0.1:8000/api/employees/${userInfo.id}/avatar/`, formData)
      .then(response => {
        axios.get(`http://127.0.0.1:8000/api/employees/${userInfo.id}/basicInfo/`)
          .then(response => {
            const newUserInfo = response.data
            localStorage.setItem('user_info', JSON.stringify(newUserInfo))
            window.location.reload()

          }).catch(error => {
            console.log(error);
          })
        toast.add({ severity: 'success', summary: 'Success', detail: 'Avatar Updated', life: 3000 })
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Avatar Update Failed', life: 3000 })
      });
  } else {
    toast.add({ severity: 'info', summary: 'Info', detail: 'No files to upload.', life: 3000 })
  }
};


</script>



<style>
.user-profile-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
